function isArrayEmpty(value?: any[]) {
  if (!value) {
    return true;
  }
  return value.length === 0;
}

export { isArrayEmpty };
