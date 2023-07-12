import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  EnvironmentState,
  SidebarState,
  TocDropdownState,
  TocState
} from './types';
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
  setToc(toc) {
    set(() => ({ toc }));
  }
}));

const useTocDropdownStore = create<TocDropdownState>((set) => ({
  folders: {},
  toggleVerbose(id) {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          verbose: !state.folders[id].verbose
        }
      }
    }));
  },
  setFolders(id) {
    set((state) => ({
      folders: {
        ...state.folders,
        [id]: {
          verbose: false
        }
      }
    }));
  }
}));

export {
  useEnvironmentStore,
  useSidebarStore,
  useTocStore,
  useTocDropdownStore
};
