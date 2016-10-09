module.exports = function (args) {
  // console.log('Client Entry');

  // ...
  //store.replaceState(localStorage.state);

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  args.store.replaceState(window.__INITIAL_STATE__);

  // actually mount to DOM
  // TODO: check if #app element not exists (due to SSR Unavailable, inject it)
  args.app.$mount('#app');

  return args.app;
};
