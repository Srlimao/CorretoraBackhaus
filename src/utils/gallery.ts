import type { ImageMetadata } from 'astro';

// Glob all images inside src/content/empreendimentos
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/empreendimentos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

export interface GalleryItem {
  image: ImageMetadata;
  src: string;
  filename: string;
  title: string;
  isThumbnail?: boolean;
}

/**
 * Format filename into clean Portuguese caption title
 * e.g. "01-fachada-frontal.jpg" -> "Fachada Frontal"
 */
export function formatImageCaption(filename: string): string {
  const withoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = withoutExt.replace(/^\d+[-_]*/, '').replace(/[-_]/g, ' ');
  return cleanName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ') || 'Ambiente';
}

/**
 * Get the thumbnail image for a given property slug
 */
export function getPropertyThumbnail(slug: string): ImageMetadata | null {
  // Try finding thumbnail.* in the property folder
  for (const [path, mod] of Object.entries(images)) {
    if (
      path.includes(`/src/content/empreendimentos/${slug}/`) &&
      /thumbnail\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/i.test(path)
    ) {
      return mod.default;
    }
  }

  // Fallback: try first image in gallery if thumbnail isn't found
  for (const [path, mod] of Object.entries(images)) {
    if (path.includes(`/src/content/empreendimentos/${slug}/`)) {
      return mod.default;
    }
  }

  return null;
}

/**
 * Get all gallery images for a given property slug, sorted alphabetically
 */
export function getPropertyGallery(slug: string): GalleryItem[] {
  const galleryItems: GalleryItem[] = [];

  for (const [path, mod] of Object.entries(images)) {
    if (
      path.includes(`/src/content/empreendimentos/${slug}/gallery/`) ||
      (path.includes(`/src/content/empreendimentos/${slug}/`) && !/thumbnail\./i.test(path))
    ) {
      const filename = path.split('/').pop() || '';
      galleryItems.push({
        image: mod.default,
        src: mod.default.src,
        filename,
        title: formatImageCaption(filename),
      });
    }
  }

  // Sort gallery items by filename (e.g. 01-fachada, 02-living, etc.)
  return galleryItems.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
}
