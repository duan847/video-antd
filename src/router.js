// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Main.vue'
// import One from './views/Home.vue'
// import Two from './views/Player.vue'
// import Three from './views/Search.vue'

// Vue.use(Router)
const main = resolve => require(['./views/Main.vue'],resolve)
const home = resolve => require(['./views/Home.vue'],resolve)
const player = resolve => require(['./views/Player.vue'],resolve)
const search = resolve => require(['./views/Search.vue'],resolve)
export default new VueRouter({
  routes: [
      {
          path: '',
          component: main,
          children: [
              {
                  path: '',
                  name: 'home',
                  component: home
              },
              {
              path: 'home',
              name: 'home',
              component: home
          },
              {
                  path: 'player',
                  name: 'player',
                  component: player
              }
              ,
              {
                  path: 'search',
                  name: 'search',
                  component: search
              }
          ]
      }
  ]
})
