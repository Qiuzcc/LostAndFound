import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: '/lost',
    children: [
      {
        path: 'lost',
        component: () => import('@/views/lost/index'),
        children:[
          {
            path:'',
            name: 'lost',
            component: () => import('@/views/lost/List')
          },{
            path:'detail',
            name: 'lost-detail',
            component: () => import('@/views/lost/Detail')
          }
        ]
      },
      {
        path: 'found',
        component: () => import('@/views/found/index'),
        children: [
          {
            path: '',
            name: 'found',
            component: () => import('@/views/found/List')
          },{
            path:'detail/:id',
            name:'found-detail',
            component:() => import('@/views/found/Detail')
          }
        ]
      },
      {
        path: 'help',
        name: 'help',
        component: () => import('@/views/help/index')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index')
      }
    ]
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('@/views/submit/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
