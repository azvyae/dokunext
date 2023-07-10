'use client';

import { useEnvironmentStore } from '@/store/store';
import Link from 'next/link';
import { ChangeEvent } from 'react';

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
  return (
    <nav className="flex justify-between px-16 py-4 bg-slate-800">
      <Link href="/">
        <h1 className="text-2xl font-semibold text-slate-50">Dokunext</h1>
      </Link>
      <div className="flex items-center">
        <select
          name="environment"
          id="environment-selector"
          className="py-2 pl-4 pr-4 rounded-md text-slate-900"
          value={environment.active}
          onChange={handleEnvChange}
        >
          <option value="none">No Environment</option>
          {envOptions}
        </select>
      </div>
    </nav>
  );
}

export { Navbar };
