declare module '*.css' {
  const exports: { [exportName: string]: string };
  export = exports;
}

declare module 'toastify-js' {
  const Toastify: {
    (options: any): {
      showToast: () => void;
    };
  };
  export default Toastify;
}
