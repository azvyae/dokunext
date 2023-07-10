'use client';

import { FormEvent, useRef, useState } from 'react';

interface AuthorizationModalProps {
  closeModal: () => void;
}

function AuthorizationModal({ closeModal }: AuthorizationModalProps) {
  const tokenInput = useRef<HTMLInputElement>(null);
  const [authError, setAuthError] = useState('');
  async function authorize(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tokenInput.current?.value) {
      return setAuthError('You need to fill auth token');
    }
    const AUTH_TOKEN = tokenInput.current.value;
    const res = await fetch('/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok && res.status === 401) {
      return setAuthError('Invalid authorization token');
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
    }
    closeModal();
    return setAuthError('');
  }
  return (
    <>
      <h3 className="mb-2 text-lg font-semibold">Authorization Dialog</h3>
      <p className="mb-2">Please fill authorization token</p>
      <form onSubmit={authorize}>
        <input
          ref={tokenInput}
          type="password"
          name="AUTH_TOKEN"
          className="w-full px-4 py-1 mb-2 border rounded-lg"
        />
        <p className="mb-2 text-xs text-rose-600">{authError}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-slate-50"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-slate-50"
          >
            Authorize
          </button>
        </div>
      </form>
    </>
  );
}

export { AuthorizationModal };
