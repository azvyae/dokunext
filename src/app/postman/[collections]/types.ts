import { HTTP_METHOD } from 'next/dist/server/web/http';

interface EssentialPostmanAPIResponse {
  info: string;
  item: string;
  auth?: any;
  globals: any[];
  variable: any[];
}

interface PostmanItemsApi {
  name: string;
  item?: PostmanItemsApi[];
  request?: {
    method: HTTP_METHOD;
  };
}


export type { EssentialPostmanAPIResponse, PostmanItemsApi };