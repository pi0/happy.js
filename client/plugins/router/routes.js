const routes = [];

// TODO: ignore file with _* pattern
loadRoutes(require.context('app/', true, /\.vue$/));

function loadRoutes(req) {
  req.keys().forEach(m=> {

    let component = req(m);

    let path = '/' + m
          .replace(/^\.\//, '')
          .replace(/.[^\\.]*$/, '')
          .replace(/\/index$/, '')
      ;

    routes.push({path, component});
  });
}

export default routes;
