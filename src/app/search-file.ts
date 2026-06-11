export interface SearchFile {
  id: string | null;
  userId: string | null;
  size: number | null;
  createdDateTime: string;
  lastModified: string;
  fileName: string;
  path: string;
  extension: string;
  server: string;
  share: string | null;
  title: string | null;
  author: string | null;
  keywords: string | null;
  comments: string | null;
  contentType: string | null;
  fileOwner?: string | null;
  fileGroup?: string | null;
  posixPermissions?: string | null;
  accessControlSource?: string | null;
  indexerUser?: string | null;
  ownerReadable?: boolean;
  groupReadable?: boolean;
  othersReadable?: boolean;
  indexerReadable?: boolean;
  allowedPrincipals?: string[];
  deniedPrincipals?: string[];
}
