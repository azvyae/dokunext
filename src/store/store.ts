import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EnvironmentState, SidebarState, TocState } from './types';

const useEnvironmentStore = create<EnvironmentState>()(
  devtools((set) => ({
    active: 'none',
    environments: [],
    setActive(value) {
      set(() => ({ active: value }));
    },
    setEnvironments(environments) {
      set(() => ({ environments }));
    }
  }))
);

const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  toggleSidebar() {
    set((state) => ({ open: !state.open }));
  },
  setSidebarState(state) {
    set(() => ({ open: state }));
  }
}));

const useTocStore = create<TocState>((set) => ({
  toc: [],
  folders: {},
  setToc(toc) {
    set(() => ({ toc }));
  },
  setFolders(id) {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          opened: false
        }
      }
    }));
  },
  toggleDropdown(id) {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          opened: !state.folders[id].opened
        }
      }
    }));
  }
}));

export { useEnvironmentStore, useSidebarStore, useTocStore };
