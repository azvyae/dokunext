'use client';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { BiFolder } from 'react-icons/bi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface FolderLinkProps {
  name: string;
  url: string;
  children?: ReactNode;
  closeSidebar: () => void;
}

function FolderLink({ name, url, children, closeSidebar }: FolderLinkProps) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div className="flex gap-2">
        <button
          className="flex items-center flex-shrink-0 gap-2"
          onClick={() => setOpened((cur) => !cur)}
        >
          {opened ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          <BiFolder className="flex-shrink-0 " />
        </button>
        <Link
          href={url}
          className="flex items-center gap-2 hover:underline"
          onClick={closeSidebar}
        >
          <span className="line-clamp-1">{name}</span>
        </Link>
      </div>
      {children ? (
        <div
          className={`ml-4 ${opened ? 'block' : 'hidden'} flex flex-col gap-2`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export { FolderLink };
