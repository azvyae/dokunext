interface RequestBody {
  method: string;
  header: TableItem[];
  url: Url;
  body?: any;
  description?: string;
  auth?: TableItem[];
}

interface ResponseBody {
  name: string;
  originalRequest: RequestBody;
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
}

interface Item {
  name: string;
  item?: Item[];
  event?: Event[];
  request?: RequestBody;
  response?: ResponseBody[];
  description?: string;
  auth?: TableItem[];
}

export type { Item, RequestBody, ResponseBody, Url };
