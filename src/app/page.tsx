'use client';

import {
  useEnvironmentStore,
  useSidebarStore,
  useTocStore
} from '@/store/store';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

export default function Home() {
  const closeSidebar = useSidebarStore((state) => state.setSidebarState);

  const { setActiveEnv, setEnviroments } = useEnvironmentStore(
    (state) => ({
      setActiveEnv: state.setActive,
      setEnviroments: state.setEnvironments
    }),
    shallow
  );
  const setToc = useTocStore((state) => state.setToc);

  useEffect(() => {
    closeSidebar(false);
    setActiveEnv('none');
    setEnviroments([]);
    setToc([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="mb-4 text-4xl font-bold">
        dokuNEXT Simple API Documentation Viewer
      </h3>
      <p className="text-2xl leading-relaxed">
        Start navigating by pick collections that will you use. Currently only
        support Postman v2.1 collection and environment files. Feel free if you
        want to contribute for this open source project, you can find out{' '}
        <a
          href="https://github.com/azvyae/dokunext"
          target="_blank"
          className="hover:text-sky-700 hover:underline text-sky-500"
        >
          here
        </a>
      </p>
    </>
  );
}
