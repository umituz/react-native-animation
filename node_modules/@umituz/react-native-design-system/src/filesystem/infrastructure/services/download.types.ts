import type { FileOperationResult, DownloadProgress } from "../../domain/entities/File";

export type DownloadProgressCallback = (progress: DownloadProgress) => void;

export interface DownloadWithProgressResult extends FileOperationResult {
  fromCache?: boolean;
}
