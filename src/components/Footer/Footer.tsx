function Footer() {
  return (
    <div className="text-xs text-center md:text-right text-slate-100">
      {new Date().getFullYear()} &copy;{' '}
      <a href="https://github.com/azvyae" target="_blank">
        @azvyae
      </a>{' '}
      | dokuNEXT | Apache 2.0 License
    </div>
  );
}

export { Footer };
