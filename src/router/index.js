import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import BaseView from '@/components/BaseView'
Vue.use(Router);

export const router = new Router(
  {
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path:'/registration',
        name: 'Registration',
        component: Registration
      },
      {
        path: '/',
        name: 'BaseView',
        component: BaseView
      },
      {
        path: '*', redirect: '/'
      }
    ]
  }
);

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/forget/password/email/', '/forget/password', '/forget/password/confirm/', '/registration'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user-token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
