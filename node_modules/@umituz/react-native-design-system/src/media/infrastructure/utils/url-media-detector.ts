export type UrlMediaType = "image" | "video" | "audio" | "unknown";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".m4v"];
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"];

function getExtensionFromUrl(url: string): string | null {
  if (!url) return null;
  const urlWithoutParams = url.toLowerCase().split("?")[0];
  const lastDotIndex = urlWithoutParams.lastIndexOf(".");
  if (lastDotIndex === -1) return null;
  return urlWithoutParams.substring(lastDotIndex);
}

export function getMediaTypeFromUrl(url: string): UrlMediaType {
  const extension = getExtensionFromUrl(url);
  if (!extension) return "unknown";
  if (VIDEO_EXTENSIONS.includes(extension)) return "video";
  if (IMAGE_EXTENSIONS.includes(extension)) return "image";
  if (AUDIO_EXTENSIONS.includes(extension)) return "audio";
  return "unknown";
}

export function isVideoUrl(url: string): boolean {
  return getMediaTypeFromUrl(url) === "video";
}

export function isImageUrl(url: string): boolean {
  return getMediaTypeFromUrl(url) === "image";
}

export function isAudioUrl(url: string): boolean {
  return getMediaTypeFromUrl(url) === "audio";
}
