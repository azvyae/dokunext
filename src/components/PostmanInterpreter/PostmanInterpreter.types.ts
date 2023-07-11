interface RequestBody {
  method: string;
  header: Header[];
  url: Url;
  body?: any;
  description?: string;
  auth?: any;
}

interface ResponseBody {
  name: string;
  originalRequest: RequestBody;
  status: string;
  code: number;
  _postman_previewlanguage?: string | null;
  header?: Header[] | null;
  cookie: any[];
  body: string;
}

interface Header {
  key: string;
  value: string;
  name?: string;
  description?: string | { content: string; type: string };
}

interface Url {
  raw: string;
  protocol?: string;
  host?: string[];
  path?: string[];
  query?: QueryParameter[];
}

interface QueryParameter {
  key: string;
  value: string;
}

interface Item {
  name: string;
  item?: Item[];
  event?: Event[];
  request?: RequestBody;
  response?: ResponseBody[];
  description?: string;
  auth?: any;
}

export type { Header, Item, QueryParameter, RequestBody, ResponseBody, Url };
