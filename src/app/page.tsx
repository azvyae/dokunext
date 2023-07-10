'use client';

import { useEnvironmentStore } from '@/store/store';
import { useEffect, useState } from 'react';

interface Collections {
  name: string;
  url: string;
}

type Provider = 'Postman' | 'OpenAPI';

async function getApiDefinitions(
  appUrl: string,
  token: string,
  provider: Provider
) {
  const res = await fetch(`${appUrl}/${provider.toLowerCase()}`, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  const [provider, setProvider] = useState<Provider>('Postman');
  const [collections, setCollections] = useState<Collections[]>([]);
  const environment = useEnvironmentStore();
  useEffect(() => {
    environment.setActive('none');
    environment.setEnvironments([]);

    const url = window.origin;
    const token = window.sessionStorage.getItem('AUTH_TOKEN');
    async function retrieveData() {}
    (async () => {})();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Hello World</p>;
}
