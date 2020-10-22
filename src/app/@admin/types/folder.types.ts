export interface FolderResponse {
  folderId?: number;
  folderName?: string;
  folderType?: number; // 1image 2other
  folderCreateAt?: Date;
  folderUpdateAt?: Date;
}
