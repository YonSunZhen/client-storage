import { FolderResponse } from './folder.types';
import { ImageResponse } from './image.types';

export interface StoreRsTreeResponse {
  data?: StoreRsResponse;
  children?: StoreRsTreeResponse[];
}

export interface StoreRsResponse extends FolderResponse, ImageResponse {
  rsId?: string;
  entityType?: number; // 1folder 2image
  entityId?: number;
  rsPathName?: string;
  rsPath?: string;
  rsNo?: string;
  rsParentNo?: string;
  rsCreateAt?: Date;
  rsStatus?: number; // 0删除 1存在
  isEdit?: boolean; // false非编辑状态 true编辑状态
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

export interface StoreRsDetailParams {
  fileName?: string;
  rsParentNo?: string;
}
