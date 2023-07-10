import Link from 'next/link';

function Navbar() {
  return (
    <nav className="flex justify-between px-16 py-4 bg-slate-800">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Dokunext</h1>
      </Link>
      <div className="flex items-center">
        <select
          name="environment"
          id="environment-selector"
          className="px-4 py-2 rounded-md text-slate-900"
        >
          <option value="none">No Environment</option>
        </select>
      </div>
    </nav>
  );
}

export { Navbar };
