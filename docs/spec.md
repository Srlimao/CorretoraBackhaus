# Especificação Técnica: Site Estático Corretora Backhaus (GitHub Pages)

## 1\. Arquitetura e Stack Tecnológica

-   **Framework Recomendado:** **Astro** (ou **Vite + React / Vanilla**) gerando build 100% estático (`SSG - Static Site Generation`).
    
    -   _Por que Astro?_ Carrega zero JavaScript por padrão, possui suporte nativo a _Content Collections_ com validação de schemas (Zod), otimiza imagens automaticamente em tempo de compilação e publica HTML puro direto para o GitHub Pages.
-   **Hospedagem:** GitHub Pages (`[https://srlimao.github.io/CorretoraBackhaus/](https://srlimao.github.io/CorretoraBackhaus/)`).
-   **CI/CD:** GitHub Actions (Build, validação de mídia/schema e Deploy automatizado a cada `push` na branch `main`).

## 2\. Estrutura de Pastas do Repositório

Ao criar um novo empreendimento, basta criar uma pasta em `src/content/empreendimentos/[slug]/`:

Plaintext

```
Srlimao/CorretoraBackhaus/
├── .github/
│   └── workflows/
│       ├── test.yml          # Testes automatizados e checagem de integridade
│       └── deploy.yml        # Build e Deploy no GitHub Pages
├── public/                   # Favicon, robots.txt, assets globais
├── src/
│   ├── components/           # Navbar, Footer, Card, Gallery, VideoHero, StickyCTA
│   ├── layouts/              # Layout base com meta tags e OpenGraph
│   ├── pages/
│   │   ├── index.astro       # Home com catálogo e filtros
│   │   └── [slug].astro      # Página dinâmica por empreendimento
│   └── content/
│       ├── config.ts         # Schema Zod para validação rigorosa dos metadados
│       └── empreendimentos/  # ONDE OS EMPREENDIMENTOS SÃO ADICIONADOS
│           ├── residencial-alpha/
│           │   ├── index.md        # Dados e especificações do imóvel
│           │   ├── video.mp4       # Vídeo de destaque
│           │   ├── thumbnail.jpg   # Imagem de capa / card
│           │   └── gallery/        # Fotos e plantas humanizadas
│           │       ├── 01-fachada.jpg
│           │       └── 02-living.jpg
│           └── solar-dos-ventos/
│               ├── index.md
│               ├── video.mp4
│               ├── thumbnail.jpg
│               └── gallery/
│                   └── ...
├── astro.config.mjs          # Configuração com site/base URL do GitHub Pages
└── package.json
```

## 3\. Fluxo de Automação e Pipeline Git

Code snippet

```
graph TD
    A[Nova Pasta / Edição no Repo] --> B[git commit & push main]
    B --> C[GitHub Actions: Workflow de Testes]
    C -->|Passo 1| D[Lint & TypeScript Check]
    C -->|Passo 2| E[Validação de Schema dos .md]
    C -->|Passo 3| F[Checagem de Mídias Obrigatórias: index.md, video.mp4, thumbnail.jpg]
    C -->|Passo 4| G[Build Estático de Teste]
    
    G -->|Sucesso| H[GitHub Actions: Deploy Pages]
    H --> I[Publicação em srlimao.github.io/CorretoraBackhaus]
    
    G -->|Falha| J[Alerta de Erro no Pull Request / Commit]
```

## 4\. Validação Automática de Conteúdo (`src/content/config.ts`)

O build falhará automaticamente nos testes se algum arquivo obrigatório faltar ou se o schema estiver incorreto, prevenindo erros em produção:

TypeScript

```
import { defineCollection, z } from 'astro:content';

const empreendimentosCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum(['Lancamento', 'Em Obras', 'Pronto para Morar', '100% Vendido']),
    category: z.enum(['Residencial', 'Comercial', 'Loteamento']),
    priceFrom: z.number().optional(),
    location: z.object({
      neighborhood: z.string(),
      city: z.string(),
      state: z.string().default('SC'),
      address: z.string().optional(),
    }),
    specs: z.object({
      areaMin: z.number(),
      areaMax: z.number().optional(),
      bedrooms: z.array(z.number()),
      suites: z.array(z.number()).optional(),
      parkingSpots: z.array(z.number()).optional(),
    }),
    highlights: z.array(z.string()),
    whatsappNumber: z.string().default('5547999999999'), // Config padrão da corretora
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = {
  empreendimentos: empreendimentosCollection,
};
```

## 5\. Workflows do GitHub Actions

### 5.1 Pipeline de Teste e Validação (`.github/workflows/test.yml`)

Disparado em qualquer branch ou Pull Request:

YAML

```
name: Automated Tests & Validation

on:
  push:
    branches-ignore: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Código
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar Dependências
        run: npm ci

      - name: Validar Estrutura de Pastas e Mídias
        run: |
          node -e '
          const fs = require("fs");
          const path = require("path");
          const baseDir = "./src/content/empreendimentos";
          if (fs.existsSync(baseDir)) {
            const dirs = fs.readdirSync(baseDir, { withFileTypes: true }).filter(d => d.isDirectory());
            dirs.forEach(d => {
              const fullPath = path.join(baseDir, d.name);
              const hasIndex = fs.existsSync(path.join(fullPath, "index.md"));
              const hasThumb = fs.existsSync(path.join(fullPath, "thumbnail.jpg"));
              if (!hasIndex || !hasThumb) {
                console.error(`Erro: Pasta ${d.name} está faltando index.md ou thumbnail.jpg`);
                process.exit(1);
              }
            });
            console.log("Todas as pastas de empreendimentos possuem os arquivos essenciais.");
          }
          '

      - name: Validar Tipos e Schemas
        run: npm run astro check

      - name: Executar Build de Teste
        run: npm run build
```

### 5.2 Pipeline de Deploy no GitHub Pages (`.github/workflows/deploy.yml`)

Disparado no `push` direto para `main`:

YAML

```
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build site
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 6\. Regras de Configuração para o GitHub Pages

1.  **Configuração da URL Base:** No arquivo `astro.config.mjs`, definir:
    
    JavaScript
    
    ```
    export default defineConfig({
      site: 'https://srlimao.github.io',
      base: '/CorretoraBackhaus',
    });
    ```
    
2.  **Ativação no Repositório:**
    
    -   No GitHub: `Settings` > `Pages` > `Build and deployment` > `Source: GitHub Actions`.
3.  **Limites de Vídeo no Git:**
    
    -   Para manter o repositório leve e o build rápido no GitHub Pages, recomenda-se comprimir os vídeos `.mp4` (ex: 720p/1080p com bitrate controlado, máximo ~15-25 MB por vídeo) para evitar atingir os limites de storage padrão do GitHub sem necessidade de LFS.