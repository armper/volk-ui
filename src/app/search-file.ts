export interface SearchFile {
  id: string | null;
  size: number;
  createdDateTime: string;
  lastModified: string;
  fileName: string;
  path: string;
  extension: string;
  server: string;
  share: string | null;
}
