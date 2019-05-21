// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'
// import One from './views/One.vue'
// import Two from './views/Two.vue'
// import Three from './views/Three.vue'

// Vue.use(Router)
const home = resolve => require(['./views/Home.vue'],resolve)
const one = resolve => require(['./views/One.vue'],resolve)
const two = resolve => require(['./views/Two.vue'],resolve)
const three = resolve => require(['./views/Three.vue'],resolve)
export default new VueRouter({
  routes: [
      {
          path: '',
          component: home,
          children: [
              {
                  path: '',
                  name: 'one',
                  component: one
              },
              {
              path: 'one',
              name: 'one',
              component: one
          },
              {
                  path: 'two',
                  name: 'two',
                  component: two
              }
              ,
              {
                  path: 'three',
                  name: 'three',
                  component: three
              }
          ]
      }
  ]
})
