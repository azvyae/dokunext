'use client';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { BiFolder } from 'react-icons/bi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface FolderLink {
  name: string;
  url: string;
  children?: ReactNode;
}

function FolderLink({ name, url, children }: FolderLink) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div className="flex gap-1">
        <button onClick={() => setOpened((cur) => !cur)}>
          {opened ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
        </button>
        <Link href={url} className="flex items-center gap-2 hover:underline">
          <BiFolder className="flex-shrink-0" />
          <span className="line-clamp-1">{name}</span>
        </Link>
      </div>
      {children ? (
        <div className={`ml-4 ${opened ? 'block' : 'hidden'}`}>{children}</div>
      ) : null}
    </>
  );
}

export { FolderLink };
