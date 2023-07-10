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

export type { Environment, EnvironmentState, SidebarState };
