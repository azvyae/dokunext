import { HTTP_METHOD } from 'next/dist/server/web/http';
import Link from 'next/link';
import React from 'react';
interface RequestLinkProps {
  name: string;
  url: string;
  method: HTTP_METHOD;
}

function getMethodColor(method: HTTP_METHOD) {
  switch (method) {
    case 'GET':
      return 'text-emerald-400';
    case 'HEAD':
      return 'text-green-500';
    case 'POST':
      return 'text-yellow-300';
    case 'PUT':
      return 'text-sky-400';
    case 'DELETE':
      return 'text-rose-500';
    case 'OPTIONS':
      return 'text-[#f965ca]';
    case 'PATCH':
      return 'text-purple-400';
  }
}

function RequestLink({ name, url, method }: RequestLinkProps) {
  return (
    <div className="flex items-center gap-1">
      <span className={`text-[0.65rem] ${getMethodColor(method)}`}>
        {method}
      </span>
      <Link
        className="flex items-center gap-1 text-sm hover:underline"
        title={name}
        href={url}
      >
        <span className="line-clamp-1 "> {name}</span>
      </Link>
    </div>
  );
}

export { RequestLink };
