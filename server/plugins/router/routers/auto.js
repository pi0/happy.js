const path = require('path');
const glob = require('glob');
const Joi = require('joi');
require('../../../../utils/colors');

class AutoRouter {
  // Based on WURST By Felix Heck <hi@whoTheHeck.de>

  // Autoload and prefix routes
  constructor(server, options) {
    this.server = server;
    this.options = options ? options : {};
    this.routeList = [];

    this.validateOptions();

    this.getFilePaths().forEach(this.registerRoutes.bind(this));

    this.logRouteList();
  }

  // Load and register routes
  registerRoutes(filePath) {
    const modulePath = path.join(this.options.routes, filePath);
    const routes = require(modulePath);

    const prefixedRoutes = this.prefixRoutes(routes, filePath);
    if (!prefixedRoutes || !prefixedRoutes.length || !prefixedRoutes[0].path) return; // Ignore empty routes
    this.server.route(prefixedRoutes);

    delete require.cache[modulePath];
  };

  // Prefix the path for each of the passed routes
  prefixRoutes(routes, filePath) {
    if (!Array.isArray(routes)) routes = Array.of(routes);
    const pathTree = getPathTree(filePath);
    if (pathTree.length !== 0) {
      routes.forEach(route => {
        validateRouteObject(route);
        let prefixedPath = `/${pathTree.join('/')}${route.path}`.replace(/\/$/, '');
        this.extendRouteList(route.path, prefixedPath, route.method);
        route.path = prefixedPath;
      });
    }
    return routes;
  };

  // Extend the list of prefixed routes
  extendRouteList(origin, modified, method) {
    this.routeList.push({path: modified, method, origin});
  };

  // Get list of file paths based on passed options
  getFilePaths() {
    return glob.sync(this.options.include, {
      nodir: true,
      cwd: this.options.routes,
      ignore: this.options.ignore,
    });
  };

  // Log the built list of prefixed routes into console
  logRouteList() {
    var colorify = method=> {
      switch (method) {
        case 'GET':
          return green(method);
        case 'POST':
          return red(method);
        default:
          return magenta(method);
      }
    };
    console.info(grey(`-------------Routes---------------`));
    this.routeList.forEach(route => {
      console.info(`${'        ['+colorify(route.method)}]`.slice(-16), route.path);
    });
    console.info(grey(`----------------------------------`));
  };

  // Validate plugin options based on defined schema
  validateOptions() {
    this.options = Joi.attempt(this.options, schemata.options, 'Invalid options');
  };

}

// Route Objects Basic validator
const schemata = {
  options: Joi.object({
    routes: Joi.string().default(__dirname),
    include: Joi.string().default('**/*.js'),
    ignore: [
      Joi.string(),
      Joi.array().items(Joi.string()),
    ],
    log: Joi.boolean().default(false),
  }),
  routeObject: Joi.object({
    path: Joi.string().required(),
    method: Joi.string().required(),
  }).unknown(true),
};

// Validate route configuration object based on defined schema
function validateRouteObject(routeObject) {
  Joi.assert(routeObject, schemata.routeObject, 'Invalid route object');
}

// Split file path and drop file name
function getPathTree(filePath) {
  const splitPath = filePath.split('/');
  splitPath.pop();
  return splitPath;
}


function register(server, options,next) {
  let r= new AutoRouter(server, options);
  next();
  return r;
}

register.attributes = {
  name: 'happy_router_auto',
};

module.exports = register;
