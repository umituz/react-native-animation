export interface MediaUrlResult {
  readonly url: string;
  readonly isVideo: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function findStringValue(obj: Record<string, unknown>, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return undefined;
}

const VIDEO_URL_KEYS = ["videoUrl", "video_url", "videoURL"] as const;
const IMAGE_URL_KEYS = ["imageUrl", "image_url", "imageURL", "uri", "url"] as const;

export function extractMediaUrl(result: unknown): MediaUrlResult | null {
  if (!isRecord(result)) return null;

  const output = isRecord(result.output) ? result.output : undefined;
  const sources = output ? [output, result] : [result];

  for (const source of sources) {
    const videoUrl = findStringValue(source, VIDEO_URL_KEYS);
    if (videoUrl) return { url: videoUrl, isVideo: true };
  }

  for (const source of sources) {
    const imageUrl = findStringValue(source, IMAGE_URL_KEYS);
    if (imageUrl) return { url: imageUrl, isVideo: false };
  }

  return null;
}

export function extractVideoUrl(result: unknown): string | null {
  const media = extractMediaUrl(result);
  if (media?.isVideo) return media.url;
  return null;
}

export function extractImageUrl(result: unknown): string | null {
  const media = extractMediaUrl(result);
  if (media && !media.isVideo) return media.url;
  return null;
}
