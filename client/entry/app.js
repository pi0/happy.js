module.exports = function (args) {
  return function (context) {
    return init(context, args.app, args.router, args.store);
  }
};

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
function init(context, app, router, store) {

  // Set router's location
  router.push(context.url);

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been updated.
  return Promise.all(router.getMatchedComponents().map(component => {
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
    context.initialState = store.state;

    // Detect redirects
    if (router.history.current && router.history.current.path != context.url) {
      console.log('Redirect from '+context.url+' To '+router.history.current.path);
      // context.url = router.history.current.path;
      // context.redirect = true;
    }

    return app
  })
}
