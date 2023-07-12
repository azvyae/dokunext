'use client';

import { useEnvironmentStore, useSidebarStore } from '@/store/store';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import { BiLogoGithub } from 'react-icons/bi';
import { FiSidebar as SidebarIcon } from 'react-icons/fi';
import { shallow } from 'zustand/shallow';
function Navbar() {
  const { activeEnv, environments, setActiveEnv } = useEnvironmentStore(
    (state) => ({
      activeEnv: state.active,
      environments: state.environments,
      setActiveEnv: state.setActive
    }),
    shallow
  );
  function handleEnvChange(e: ChangeEvent<HTMLSelectElement>) {
    const currentValue = e.currentTarget.value;
    setActiveEnv(currentValue);
  }
  const envOptions = environments.map((item, index) => (
    <option key={item.id} value={index + 1}>
      {item.name}
    </option>
  ));
  const toggleSidebar = useSidebarStore((state) => {
    if (typeof document !== 'undefined') {
      const bodyClasses = document.body.classList;
      if (state.open) {
        bodyClasses.add('overflow-hidden');
      } else {
        bodyClasses.remove('overflow-hidden');
      }
    }
    return state.toggleSidebar;
  });
  return (
    <nav className="fixed z-40 flex justify-between w-full px-4 py-4 md:px-16 bg-slate-800">
      <Link href="/">
        <h1 className="hidden text-2xl font-semibold text-slate-50 md:inline-block">
          dokuNEXT
        </h1>
        <h1 className="inline-block text-2xl font-semibold text-slate-50 md:hidden">
          dN
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <select
          name="environment"
          id="environment-selector"
          className="px-1 py-1 pr-4 rounded-md md:px-4 text-slate-900"
          value={activeEnv}
          onChange={handleEnvChange}
        >
          <option value="none">No Environment</option>
          {envOptions}
        </select>
        <a
          href="https://github.com/azvyae/dokunext"
          target="_blank"
          className="hover:text-slate-400 text-slate-50 hover:underline"
        >
          <BiLogoGithub size={36} />
        </a>
        <button
          className="flex items-center justify-center md:hidden"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="text-slate-50" size={32} />
        </button>
      </div>
    </nav>
  );
}

export { Navbar };
