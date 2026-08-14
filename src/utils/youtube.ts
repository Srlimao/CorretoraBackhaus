/**
 * Utility to extract YouTube Video ID and generate embed / thumbnail URLs
 * Supports full URLs, short URLs, embeds, shorts, or raw IDs.
 */
export interface YouTubeVideoInfo {
  videoId: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  hdThumbnailUrl: string | null;
}

export function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // Already a raw ID (standard 11 alphanumeric characters with - and _)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regular expressions for various YouTube URL patterns
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v=([^&]+)/,
    /^https?:\/\/youtu\.be\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function getYouTubeInfo(urlOrId?: string): YouTubeVideoInfo {
  const videoId = extractYouTubeId(urlOrId);

  if (!videoId) {
    return {
      videoId: null,
      embedUrl: null,
      thumbnailUrl: null,
      hdThumbnailUrl: null,
    };
  }

  return {
    videoId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&playsinline=1`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    hdThumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}
