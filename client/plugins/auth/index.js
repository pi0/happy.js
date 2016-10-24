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
        user: {
          name: '',
        },
      },
      mutations: {
        [SET_USER](state, payload){
          state.user = payload.user
        }
      },
    });

    this.preFetch();

  }

  preFetch() {
    if (!this.preFetchObj) {
      this.preFetchObj = new Promise((resolve, reject)=> {
        this.context.resource.get('user').then(res=> {
          if (res.body && res.body.user)
            this.context.store.commit(SET_USER, {user: res.body.user});
          resolve();
          delete this.preFetchObj;
        }).catch((err)=> {
          console.log(err);
          resolve(); // preFetch is not mondatory!
          delete this.preFetchObj;
        });
      });
    }
    return this.preFetchObj;
  }

  login(credentials, cb) {
    this.context.resource.post('login', credentials).then(response=> {
      if (response.body.token) {
        this.context.cookie.set('token', response.body.token);
        this.preFetch();
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
