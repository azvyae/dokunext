'use client';

import { useEnvironmentStore } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const environment = useEnvironmentStore();
  useEffect(() => {
    environment.setActive('none');
    environment.setEnvironments([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Hello World</p>;
}
