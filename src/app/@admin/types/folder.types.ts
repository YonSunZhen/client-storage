export interface FolderResponse {
  folderId?: number;
  folderName?: string;
  folderType?: number; // 1image 2other
  folderCreateAt?: Date;
  folderUpdateAt?: Date;
}

export interface FolderPostParams {
  rsParentNo: string;
  folderName?: string;
  folderType?: number; // 1image 2other
  folderCreateAt?: Date;
  folderUpdateAt?: Date;
}

export interface FolderGetParams {
  folderId?: number;
  folderName?: string;
  folderType?: number; // 1image 2other
}
