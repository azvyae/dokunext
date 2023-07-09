'use client';

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

  useEffect(() => {
    const url = window.origin;
    const token = window.sessionStorage.getItem('AUTH_TOKEN');
    async function retrieveData() {}
    (async () => {})();
  }, []);

  return <p>Hello World</p>;
}
