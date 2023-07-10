import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Environment, EnvironmentState } from './types';

const useEnvironmentStore = create<EnvironmentState>()(
  devtools((set) => ({
    active: 'none',
    environments: [],
    setActive: (value: string) => set(() => ({ active: value })),
    setEnvironments: (environments: Environment[]) =>
      set(() => ({ environments: environments }))
  }))
);

export { useEnvironmentStore };