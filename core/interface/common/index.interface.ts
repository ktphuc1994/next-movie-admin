export type Order = 'asc' | 'desc';

export interface AxiosErrorData {
  statusCode?: number;
  message: string | string[];
  error: string;
}

export interface UploadImageRes {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: 464704;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename?: string;
}

//     "asset_id": "48d6ead1d0abd367dedcd92cac4dc59b",
//     "public_id": "movie-admin/Blue_Archive_02",
//     "version": 1680945808,
//     "version_id": "88eb8d801b331125b8af413c7c1e3423",
//     "signature": "1d91e3ce412ad7ffdb22f4901dfc72865ac66ab1",
//     "width": 1900,
//     "height": 855,
//     "format": "jpg",
//     "resource_type": "image",
//     "created_at": "2023-04-08T09:23:28Z",
//     "tags": [],
//     "bytes": 464704,
//     "type": "upload",
//     "etag": "6ec57bb890ad5b7f22160aa09c2abb2b",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/dzqnth86y/image/upload/v1680945808/movie-admin/Blue_Archive_02.jpg",
//     "secure_url": "https://res.cloudinary.com/dzqnth86y/image/upload/v1680945808/movie-admin/Blue_Archive_02.jpg",
//     "folder": "movie-admin",
//     "access_mode": "public",
//     "existing": false,
//     "original_filename": "Blue_Archive_02"
