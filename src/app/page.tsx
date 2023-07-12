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

  const { setActiveEnv } = useEnvironmentStore(
    (state) => ({
      setActiveEnv: state.setActive
    }),
    shallow
  );
  const setToc = useTocStore((state) => state.setToc);

  useEffect(() => {
    closeSidebar(false);
    setActiveEnv('none');
    setToc([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="mb-4 text-2xl font-bold md:text-4xl">
        dokuNEXT Simple API Documentation Viewer
      </h3>
      <p className="text-lg leading-relaxed md:text-2xl">
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
