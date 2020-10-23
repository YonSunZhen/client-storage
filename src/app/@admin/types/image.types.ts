import { NzUploadFile } from 'ng-zorro-antd/upload';
export interface ImageResponse {
  imgId?: number;
  imgType?: string;
  imgOriginName?: string;
  imgThumName?: string;
  imgIntactName?: string;
  imgCreateAt?: Date;
  imgUpdateAt?: Date;
}

export interface ImagePostParams {
  rsParentNo?: string;
  imgType?: string;
  imgOriginName?: string;
  imgData?: NzUploadFile;
}
