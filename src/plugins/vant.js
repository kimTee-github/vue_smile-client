// 按需全局引入 vant组件
import Vue from 'vue'
import {  Sticky,Button, List, Cell, Tabbar, TabbarItem, Swipe, SwipeItem, NavBar, Grid, GridItem ,Icon  } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Swipe).use(SwipeItem);
Vue.use(NavBar);
Vue.use(Grid).use(GridItem);
Vue.use(Icon);
Vue.use(Sticky);