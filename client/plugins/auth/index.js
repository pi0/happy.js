import BasePlugin from '../base';

export const SET_USER = 'auth/SET_USER';
export const LOAD_USER = 'auth/LOAD_USER';

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
        user: {
          name: '',
        },
      },
      actions: {
        [LOAD_USER]({commit}){
          self.context.resource.get('auth/profile').then(res=> {
            if (res.body.user) {
              commit(SET_USER, {user: res.body.user});
            }
          });
        }
      },
      mutations: {
        [SET_USER](state, payload){
          state.user = payload.user
        }
      },
    });

  }

  preFetch() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.context.resource.get('auth/profile')
        .then(res=> {
          if (res.body.user)
            self.context.store.commit(SET_USER, {user: res.body.user});
          resolve();
        })
        .catch((err)=> {
          resolve(); // preFetch is not mondatory!
        });
    });
  }

  login(credentials, cb) {
    this.context.resource.post('auth/login', credentials).then(response=> {
      if (response.body.token) {
        this.context.cookie.set('token', response.body.token);
        this.context.router.replace('/');
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
