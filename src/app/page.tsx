'use client';

import {
  useEnvironmentStore,
  useSidebarStore,
  useTocStore
} from '@/store/store';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { styles } from './page.styles';
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
  }, [closeSidebar, setActiveEnv, setToc]);

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>dokuNEXT Simple API Documentation Viewer</h1>
      <p className="text-lg leading-relaxed md:text-xl">
        Start navigating by pick collections that will you use. Currently only
        support Postman v2.1 collection and environment files. Feel free if you
        want to contribute for this open source project, you can check our
        GitHub{' '}
        <a href="https://github.com/azvyae/dokunext" className={styles.a}>
          https://github.com/azvyae/dokunext
        </a>
      </p>
    </div>
  );
}
