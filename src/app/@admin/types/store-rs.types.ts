import { FolderResponse } from './folder.types';
import { ImageResponse } from './image.types';

export interface StoreRsTreeResponse {
  data: StoreRsResponse;
  children?: StoreRsTreeResponse[];
}

export interface StoreRsResponse extends FolderResponse, ImageResponse {
  rsId?: string;
  entityType?: number; // 1folder 2image
  entityId?: number;
  rsPath?: string;
  rsNo?: string;
  rsParentNo?: string;
  rsCreateAt?: Date;
  rsStatus?: number; // 0删除 1存在
}

export interface StoreRsParams {
  rsId?: string;
  entityType?: number; // 1folder 2image
  entityId?: number;
  rsPath?: string;
  rsNo?: string;
  rsParentNo?: string;
  rsCreateAt?: Date;
  rsStatus?: number; // 0删除 1存在
}
