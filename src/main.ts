import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/store/store'
import '@github/clipboard-copy-element'
import '@github/tab-container-element'

import AppHeader from '@/components/app-header/index.vue'
import NavigatorMenu from '@/components/navigator-menu/src/index.vue'
import HeaderNav from '@/components/header-nav/src/index.vue'
import SearchBar from '@/components/SearchBar/src/index.vue'

import LatestDeal from '@/components/Home/LatestDeal/index.vue'
import LatestBlock from '@/components/Home/LatestBlock/index.vue'
import mescrollVue from 'mescroll.js/mescroll.vue'
import popover from '@/components/popover/src/index.vue'
import appFooter from '@/components/app-footer/src/index.vue'

Vue.directive('waves', {
  bind(el, binding) {
    el.addEventListener('click', e => {
      const customOpts = Object.assign({}, binding.value)
      const opts = Object.assign({
        ele: el, // 波纹作用元素
        type: 'hit', // hit点击位置扩散center中心点扩展
        color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
      }, customOpts)
      const target = opts.ele
      if (target) {
        // target.style.position = 'relative'
        target.style.overflow = 'hidden'
        const rect = target.getBoundingClientRect()
        let ripple = target.querySelector('.waves-ripple')
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'waves-ripple'
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
            ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
            break
          default:
            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple animation-active'
        return false
      }
    }, false)
  }
});


Vue.component('app-header', AppHeader)
Vue.component('navigator-menu', NavigatorMenu)
Vue.component('header-nav', HeaderNav)
Vue.component('search-bar', SearchBar)
Vue.component('latest-deal', LatestDeal)
Vue.component('latest-block', LatestBlock)
Vue.component('mescroll-vue', mescrollVue)
Vue.component('popover', popover)
Vue.component('app-footer', appFooter)
import '@/components/index'
import './icons'
import 'normalize.css/normalize.css'
// import * as filters from './filter/index'

// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// const req = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.ts?$/);
// req.keys().forEach((mod) => {
//   req(mod);
// });

// module.exports = require('./components/index')
