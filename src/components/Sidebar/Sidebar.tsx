'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { BiLock as LockIcon } from 'react-icons/bi';
import { AuthorizationModal } from './Partials/AuthorizationModal';
import { useSidebarStore } from '@/store/store';
import Link from 'next/link';
import { FolderLink } from '../TocItems/FolderLink';
interface Collections {
  name: string;
  url: string;
}

type Provider = 'Postman' | 'OpenAPI';

async function getApiDefinitions(token: string | null, provider: Provider) {
  const res = await fetch(`/${provider.toLowerCase()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res;
}

function Sidebar() {
  const [provider, setProvider] = useState<Provider>('Postman');
  const [collections, setCollections] = useState<Collections[]>([]);
  const insertTokenModal = useRef<HTMLDialogElement>(null);
  const sidebarOpen = useSidebarStore((state) => state.open);
  const collectionNodes = !(collections.length > 0) ? (
    <li className="text-sm">No Collection or Definition Available</li>
  ) : (
    collections.map((item) => (
      <li key={item.url}>
        <Link
          href={item.url}
          className="block p-1 mb-1 text-xs rounded hover:bg-slate-500 bg-slate-600"
        >
          {item.name}
        </Link>
      </li>
    ))
  );
  function handleProviderChange(e: ChangeEvent<HTMLSelectElement>) {
    const currentValue = e.currentTarget.value;
    if (currentValue !== 'Postman' && currentValue !== 'OpenAPI') {
      throw Error('Provider not found');
    }
    setProvider(currentValue);
  }

  function openAuthModal() {
    if (!insertTokenModal.current) {
      return;
    }
    if (insertTokenModal.current.open) {
      return;
    }
    insertTokenModal.current.showModal();
  }

  function closeAuthModal() {
    if (!insertTokenModal.current) {
      return;
    }
    if (!insertTokenModal.current.open) {
      return;
    }
    insertTokenModal.current.close();
  }

  useEffect(() => {
    const token = window.localStorage.getItem('AUTH_TOKEN');
    async function retrieveData() {
      const res = await getApiDefinitions(token, provider);
      if (!res.ok) {
        if (res.status === 401) {
          return openAuthModal();
        } else {
          throw new Error('HTTP Error: ' + res.status);
        }
      }
      const collectionResponse = await res.json();
      return setCollections(collectionResponse.data);
    }
    retrieveData();
  }, [provider]);
  return (
    <>
      <Modal ref={insertTokenModal}>
        <AuthorizationModal closeModal={closeAuthModal} />
      </Modal>
      <div
        className={`fixed w-full h-full md:static md:block ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed flex flex-col w-full md:w-[30vw] lg:w-[16vw] justify-between h-full p-4 pt-20 bg-slate-700">
          <div>
            <p className="mb-2 text-slate-50">Provider:</p>
            <select
              name="provider"
              id="provider-selector"
              className="w-full px-2 py-1 pr-4 mb-4 rounded-md md:px-4 text-slate-900"
              value={provider}
              onChange={handleProviderChange}
            >
              <option value="Postman">Postman</option>
              {/* <option value="OpenAPI">OpenAPI</option> */}
            </select>
            <p className="mb-2 text-slate-50">Collections:</p>
            <div className="h-[10vh] overflow-y-auto border border-slate-500 rounded-md p-2 mb-2">
              <ul className="text-slate-50">{collectionNodes}</ul>
            </div>
            <p className="mb-2 text-slate-50">Table of Contents:</p>
            <div className="h-[35vh] overflow-y-auto border border-slate-500 rounded-md p-2 ">
              <div className=" text-slate-50">
                <p className="mb-2 font-bold">JUMP TO</p>
                <div className="flex flex-col gap-2">
                  <Link className="line-clamp-1 hover:underline" href="#">
                    <span>Sample Link</span>
                  </Link>
                  <FolderLink name="Another Abc" url="#abc">
                    <FolderLink name="Test" url="#abc" />
                    <div className="flex items-center gap-1">
                      <span className="text-[0.65rem]">POST</span>
                      <Link
                        className="flex items-center gap-1 line-clamp-1 hover:underline"
                        href="#"
                      >
                        <span>Sample Link</span>
                      </Link>
                    </div>
                  </FolderLink>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={openAuthModal}
            className="flex items-center justify-center gap-2 p-2 text-lg bg-yellow-400 rounded-lg hover:bg-yellow-500"
          >
            <LockIcon size={20} />
            <p>Authorize</p>
          </button>
        </div>
      </div>
    </>
  );
}

export { Sidebar };
export type { Collections };
