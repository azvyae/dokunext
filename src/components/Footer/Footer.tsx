function Footer() {
  return (
    <div className="text-xs text-center text-slate-100">
      {new Date().getFullYear()} &copy;{' '}
      <a href="https://github.com/azvyae" target="_blank">
        Azvya Erstevan I
      </a>{' '}
      | Dokunext | Apache 2.0 License
    </div>
  );
}

export { Footer };
