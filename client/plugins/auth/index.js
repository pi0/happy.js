import BasePlugin from '../base';

export const SET_USER = 'auth/SET_USER';


export default class AuthPlugin extends BasePlugin {

  init() {

    // Auto redirect to Auth
    this.context.router.beforeEach((to, from, next) => {
      if (!to.meta.noAuth && !this.check())
        return next(this.options.redirect);
      return next();
    });

    // Register Auth module on store
    this.context.store.registerModule('auth', {
      state: {
        token: null,
        user: null,
      },
      mutations: {
        [SET_USER](state, payload){
          state.user = payload.user
        }
      }
    });


  }

  login(credentials,cb) {
    this.context.resource.post('auth/login', credentials).then(response=> {
      if (response.body.token) {
        this.context.cookie.set('token', response.body.token);
        this.context.store.commit(SET_USER, {user: response.body.user});
        this.context.router.replace({name:'dashboard.dashboard'});
      }
      cb(response.body);
    });
  }

  user() {
    return this.context.store.state.auth.user;
  }

  token() {
    return this.context.cookie.get('token');
  }

  check() {
    return !!this.token();
  }

  logout() {
    this.context.cookie.remove('token');
    this.context.router.replace('/');
  }


};

AuthPlugin.prototype.name = 'auth';
