module.exports = function (args) {

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  if (typeof window.___ !== "undefined")
    args.store.replaceState(window.___);
  else {
    // Fallback support
    args.store.replaceState({
      state: {
        route: {
          path: window.location.pathname,
        }
      }
    })
  }

  // actually mount to DOM
  args.app.$mount('#app');

  return args.app;
};
