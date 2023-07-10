'use client';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../Modal/Modal';
import Image from 'next/image';
import Lock from './lock.svg';
import { AuthorizationModal } from './Partials/AuthorizationModal';
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
      <div className="flex flex-col justify-between h-full p-4 bg-slate-700">
        <div></div>
        <button
          onClick={openAuthModal}
          className="flex items-center justify-center gap-2 p-2 text-lg bg-yellow-400 rounded-lg hover:bg-yellow-500"
        >
          <Image src={Lock} alt={'Authorize Access'} width={24} height={24} />
          <p>Authorize</p>
        </button>
      </div>
    </>
  );
}

export { Sidebar };
