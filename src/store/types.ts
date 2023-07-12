import { HTTP_METHOD } from 'next/dist/server/web/http';

interface Environment {
  id: string;
  name: string;
  values: {
    key: string;
    value: string;
    type: 'default' | 'secret';
  }[];
}

interface EnvironmentState {
  active: Environment['id'];
  environments: Environment[];
  setActive: (value: string) => void;
  setEnvironments: (environments: Environment[]) => void;
}

interface SidebarState {
  open: boolean;
  toggleSidebar: () => void;
  setSidebarState: (state: boolean) => void;
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

interface TocDropdownState {
  folders: {
    [x: string]: {
      verbose: boolean;
    };
  };
  toggleVerbose: (id: string) => void;
  setFolders: (id: string) => void;
}

export type {
  Environment,
  EnvironmentState,
  SidebarState,
  TocState,
  TocDropdownState,
  Toc
};
