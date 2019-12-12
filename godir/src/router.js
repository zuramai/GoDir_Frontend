import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './middleware/auth';
import guest from './middleware/guest';
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: () => import("./views/Layouts/FullPage.vue"),
    children: [
        {
          path: "/",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/login",
          component: () => import("./views/Auth/Login.vue"),
          name: "login",
          meta: {
            middleware: guest
          }
        },
    ]
  },
  {
    path: "",
    component: () => import("./views/Layouts/Sidebar.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("./views/Dashboard.vue"),
        name: 'dashboard',
        meta: {
          middleware: auth
        }
      },
      {
        path: "/file-manager",
        component: () => import("./views/Pages/FileManager.vue")
      },
    ]
  },
  {
      path: '*',
      component: () => import('./views/Errors/404.vue')
  }
];


const router = new VueRouter({
  mode: "history",
  routes: routes
});


// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index, 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});



export default router