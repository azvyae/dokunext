import { ForwardedRef, forwardRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
}

function ModalComponent(
  { children }: ModalProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <dialog
      className="w-full rounded-lg md:max-w-xl backdrop:bg-slate-950/75"
      ref={ref}
    >
      {children}
    </dialog>
  );
}
const Modal = forwardRef(ModalComponent);
export { Modal };
