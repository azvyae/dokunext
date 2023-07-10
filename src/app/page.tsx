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

  return (
    <>
      <h3 className="mb-4 text-4xl font-bold">
        dokuNEXT Simple API Documentation Viewer
      </h3>
      <p className="text-2xl leading-relaxed">
        Start navigating by pick collections that will you use. Currently only
        support Postman v2.1 collection and environment files. Feel free if you
        want to contribute for this open source project, you can find out{' '}
        <a
          href="https://github.com/azvyae/dokunext"
          target="_blank"
          className="hover:text-sky-700 hover:underline text-sky-500"
        >
          here
        </a>
      </p>
    </>
  );
}
