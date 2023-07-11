import { HTTP_METHOD } from 'next/dist/server/web/http';

interface Environment {
  name: string;
  value: string;
}

interface EnvironmentState {
  active: Environment['value'];
  environments: Environment[];
  setActive: (value: string) => void;
  setEnvironments: (environments: Environment[]) => void;
}

interface SidebarState {
  open: boolean;
  toggleSidebar: () => void;
}

interface Toc {
  name: string;
  url: string;
  method?: HTTP_METHOD;
  items?: Toc[];
}

interface TocState {
  toc: Toc[];
  setToc: (toc: Toc[]) => void;
}

export type { Environment, EnvironmentState, SidebarState, TocState, Toc };
