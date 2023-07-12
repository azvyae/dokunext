interface ApiRequest {
  method: string;
  header: TableItem[];
  url: Url;
  body?: any;
  description?: string;
  auth?: TableItem[];
}

interface ApiResponse {
  name: string;
  originalRequest: ApiRequest;
  status: string;
  code: number;
  header?: TableItem[];
  cookie: any[];
  body: string;
}

interface Url {
  raw: string;
  protocol?: string;
  host?: string[];
  path?: string[];
  query?: TableItem[];
  variable?: TableItem[];
}

interface TableItem {
  key: string;
  value?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
}

interface Item {
  name: string;
  item?: Item[];
  event?: Event[];
  request?: ApiRequest;
  response?: ApiResponse[];
  description?: string;
  auth?: TableItem[];
}

export type { Item, ApiRequest, ApiResponse, Url, TableItem };
