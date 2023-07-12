'use client';
import { useTocStore } from '@/store/store';
import { TocState } from '@/store/types';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { BiFolder } from 'react-icons/bi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { shallow } from 'zustand/shallow';

interface FolderLinkProps {
  name: string;
  url: string;
  children?: ReactNode;
  closeSidebar: () => void;
}

function FolderLink({ name, url, children, closeSidebar }: FolderLinkProps) {
  const { folders, toggleDropdown, setFolders } = useTocStore(
    (state) => ({
      folders: state.folders,
      toggleDropdown: state.toggleDropdown,
      setFolders: state.setFolders
    }),
    shallow
  );
  useEffect(() => {
    setFolders(url);
  }, [setFolders, url]);
  return (
    <>
      <div className="flex gap-2">
        <button
          className="flex items-center flex-shrink-0 gap-2"
          onClick={() => toggleDropdown(url)}
        >
          {folders[url]?.opened ? (
            <FaChevronDown size={12} />
          ) : (
            <FaChevronRight size={12} />
          )}
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
          className={`ml-4 ${
            folders[url]?.opened ? 'block' : 'hidden'
          } flex flex-col gap-2`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export { FolderLink };
