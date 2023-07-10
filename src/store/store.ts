import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Environment, EnvironmentState, SidebarState } from './types';

const useEnvironmentStore = create<EnvironmentState>()(
  devtools((set) => ({
    active: 'none',
    environments: [],
    setActive(value: string) {
      set(() => ({ active: value }));
    },
    setEnvironments(environments: Environment[]) {
      set(() => ({ environments: environments }));
    }
  }))
);

const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  toggleSidebar() {
    set((state) => ({ open: !state.open }));
  }
}));

export { useEnvironmentStore, useSidebarStore };
