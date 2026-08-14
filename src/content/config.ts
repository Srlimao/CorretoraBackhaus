import { defineCollection, z } from 'astro:content';

const empreendimentosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    status: z.enum([
      'Lancamento',
      'Em Obras',
      'Pronto para Morar',
      '100% Vendido',
      'Futuro Lancamento'
    ]),
    category: z.enum([
      'Residencial',
      'Comercial',
      'Loteamento',
      'Cobertura',
      'Casa em Condominio',
      'Alto Padrao'
    ]).default('Residencial'),
    priceFrom: z.number().optional(),
    location: z.object({
      neighborhood: z.string(),
      city: z.string(),
      state: z.string().default('RS'),
      address: z.string().optional(),
      distanceToBeach: z.string().optional(),
    }),
    specs: z.object({
      areaMin: z.number(),
      areaMax: z.number().optional(),
      bedrooms: z.array(z.number()),
      suites: z.array(z.number()).optional().default([]),
      parkingSpots: z.array(z.number()).optional().default([]),
      bathrooms: z.array(z.number()).optional().default([]),
    }),
    highlights: z.array(z.string()),
    // Supports full YouTube URL, short URL, embed URL, or raw ID
    youtubeUrl: z.string().optional().default(''),
    videoUrl: z.string().optional(), // alias
    youtubeId: z.string().optional(), // alias
    whatsappNumber: z.string().default('5551993835822'),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    deliveryDate: z.string().optional(),
    developer: z.string().optional(),
    investmentHighlights: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  empreendimentos: empreendimentosCollection,
};
