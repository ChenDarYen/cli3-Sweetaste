import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import Main from '@/views/main.vue'
import MainHome from '@/views/main-home.vue'
import MainDesserts from '@/views/main-desserts.vue'
import MainDessert from '@/views/main-dessert.vue'
import MainCart from '@/views/main-cart.vue'
import MainCheckout from '@/views/main-checkout.vue'
import Admin from '@/views/admin.vue'
import AdminProducts from '@/views/admin-products.vue'
import AdminOrders from '@/views/admin-orders.vue'
import Login from '@/views/login.vue'

Vue.use(Router, Axios, VueAxios)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/main'
    },
    {
      path: '/main',
      name: '',
      component: Main,
      children: [
        {
          path: '',
          name: 'MainHome',
          component: MainHome
        },
        {
          path: 'desserts',
          name: 'MainDesserts',
          component: MainDesserts
        },
        {
          path: 'dessert/:dessert_id',
          name: 'MainDessert',
          component: MainDessert
        },
        {
          path: 'cart',
          name: 'MainCart',
          component: MainCart
        },
        {
          path: 'checkout',
          name: 'MainCheckout',
          component: MainCheckout
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: '',
      component: Admin,
      children: [
        {
          path: '',
          neme: 'AdminOrders',
          component: AdminOrders
        },
        {
          path: 'products',
          neme: 'AdminProducts',
          component: AdminProducts
        }
      ],
      beforeEnter: (to, from, next) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
        Axios.post(api).then((response) => {
          if (response.data.success) {
            next()
          } else {
            next({
              path: '/login'
            })
          }
        })
      }
    }
  ]
})
