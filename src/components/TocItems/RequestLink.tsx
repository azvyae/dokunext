import { HTTP_METHOD } from 'next/dist/server/web/http';
import Link from 'next/link';
import React from 'react';
interface RequestLinkProps {
  name: string;
  url: string;
  method: HTTP_METHOD;
  closeSidebar: () => void;
}

function getMethodColor(method: HTTP_METHOD, invert = false) {
  switch (method) {
    case 'GET':
      return invert ? 'bg-emerald-400 text-slate-700' : 'text-emerald-400';
    case 'HEAD':
      return invert ? 'bg-green-500 text-slate-700' : 'text-green-500';
    case 'POST':
      return invert ? 'bg-yellow-300 text-slate-700' : 'text-yellow-300';
    case 'PUT':
      return invert ? 'bg-sky-400 text-slate-700' : 'text-sky-400';
    case 'DELETE':
      return invert ? 'bg-rose-500 text-slate-700' : 'text-rose-500';
    case 'OPTIONS':
      return invert ? 'bg-[#f965ca] text-slate-700' : 'text-[#f965ca]';
    case 'PATCH':
      return invert ? 'bg-purple-400 text-slate-700' : 'text-purple-400';
  }
}

function RequestLink({ name, url, method, closeSidebar }: RequestLinkProps) {
  return (
    <div className="flex gap-1 ml-1">
      <span className={`text-[0.65rem] mt-[0.08rem] ${getMethodColor(method)}`}>
        {method}
      </span>
      <Link
        className="flex items-center gap-1 text-sm hover:underline"
        title={name}
        href={url}
        onClick={closeSidebar}
      >
        <span className=""> {name}</span>
      </Link>
    </div>
  );
}

export { RequestLink, getMethodColor };
