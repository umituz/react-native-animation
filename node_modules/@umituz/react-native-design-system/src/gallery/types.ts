export interface SaveMediaResult {
  success: boolean;
  fileUri?: string;
  error?: string;
}

export interface DownloadMediaResult {
  success: boolean;
  localUri?: string;
  error?: string;
}
