'use strict';

// import 'whatwg-fetch';
// impot library
// import {
//   TweenMax,
//   TweenLite
// } from 'gsap';
// import ScrollToPlugin from 'ScrollToPlugin';
// import EasePack from 'EasePack';
// import modernizr from 'modernizr';
//
// console.log(modernizr);
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store/index';
import App from './components/App.vue';

Vue.use(Vuex);


new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  },
  store
});
