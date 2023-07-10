'use client';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { BiLock as LockIcon } from 'react-icons/bi';
import { AuthorizationModal } from './Partials/AuthorizationModal';
import { useSidebarStore } from '@/store/store';
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
          openAuthModal();
        } else {
          throw new Error('HTTP Error: ' + res.status);
        }
      }
    }
    retrieveData();
  });
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
        <div className="flex flex-col justify-between h-full p-4 bg-slate-700 ">
          <div></div>
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
