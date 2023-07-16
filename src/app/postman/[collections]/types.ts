import { HTTP_METHOD } from 'next/dist/server/web/http';

export interface EssentialPostmanAPIResponse {
  info: string;
  item: string;
  auth?: any;
  globals: any[];
  variable: any[];
}

export interface PostmanItemsApi {
  name: string;
  item?: PostmanItemsApi[];
  request?: {
    method: HTTP_METHOD;
  };
}