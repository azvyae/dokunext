'use client';

import { useEnvironmentStore, useSidebarStore } from '@/store/store';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import { FiSidebar as SidebarIcon } from 'react-icons/fi';
function Navbar() {
  const environment = useEnvironmentStore();
  function handleEnvChange(e: ChangeEvent<HTMLSelectElement>) {
    const currentValue = e.currentTarget.value;
    environment.setActive(currentValue);
  }
  const envOptions = environment.environments.map((item) => (
    <option key={item.value} value={item.value}>
      {item.name}
    </option>
  ));
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
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
      <div className="flex items-center gap-4">
        <select
          name="environment"
          id="environment-selector"
          className="px-2 py-2 pr-4 rounded-md md:px-4 text-slate-900"
          value={environment.active}
          onChange={handleEnvChange}
        >
          <option value="none">No Environment</option>
          {envOptions}
        </select>
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
