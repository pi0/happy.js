function init(runtime_context, client_context) {

  var {app, router, store}=client_context;

  // Link client virtual cookies with runtime
  client_context.cookies = runtime_context.cookies;

  // Set router's location
  router.push(runtime_context.url);

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been updated.
  var prefetch = [
    ...router.getMatchedComponents(),
    client_context.auth,
  ];

  return Promise.all(prefetch.map(component => {
    if (component.preFetch) {
      return component.preFetch(store)
    }

  })).then(() => {

    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    runtime_context.initialState = store.state;

    // Detect redirects
    if (router.history.current && router.history.current.path != runtime_context.url) {
      console.log('Redirect from ' + runtime_context.url + ' -> ' + router.history.current.path);
      runtime_context.url = router.history.current.path;
      runtime_context.redirect = true;
    }

    return app
  })
}

module.exports = function (client_context) {

  // This function will be called by `bundleRenderer`.
  // This is where we perform data-pre-fetching to determine the
  // state of our application before actually rendering it.
  // Since data fetching is async, this function is expected to
  // return a Promise that resolves to the app instance.
  return function (runtime_context) {
    return init(runtime_context, client_context);
  };

};

