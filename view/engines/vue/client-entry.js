const isDev = process.env.NODE_ENV !== 'production';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (app, router, store) => {

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  store.replaceState(window.__INITIAL_STATE__);

  // TODO: check if #app element not exists (due to SSR Unavailable, inject it)

  // actually mount to DOM
  app.$mount('#app');

  return app;
}
