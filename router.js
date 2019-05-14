import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import One from './views/One.vue'
import Two from './views/Two.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '',
          component: Home,
          children: [
              {
                  path: '',
                  name: 'one',
                  component: One
              },
              {
              path: 'one',
              name: 'one',
              component: One
          },
              {
                  path: 'two',
                  name: 'two',
                  component: Two
              }
          ]
      }
  ]
})
