export type MimeMediaType = "image" | "audio" | "video";

export function getMediaTypeFromMime(mimeType: string): MimeMediaType {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";
  return "image";
}

export function isVideoMime(mimeType: string): boolean {
  return mimeType.startsWith("video/");
}

export function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function isAudioMime(mimeType: string): boolean {
  return mimeType.startsWith("audio/");
}
