'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { BiLock as LockIcon } from 'react-icons/bi';
import { AuthorizationModal } from './Partials/AuthorizationModal';
import { useSidebarStore } from '@/store/store';
import Link from 'next/link';
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
      <li key={item.url} className="my-3 text-sm">
        <Link href={item.url} className=" hover:underline hover:text-sky-200">
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
            <div className="h-[50vh] overflow-y-auto border border-slate-500 rounded-md p-2">
              <ul className="list-disc text-slate-50">{collectionNodes}</ul>
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
