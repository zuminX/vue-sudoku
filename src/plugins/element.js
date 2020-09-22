import Vue from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
  MenuItem,
  Message,
  Pagination,
  Row,
  Scrollbar,
  Submenu
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Scrollbar)

Vue.component(Message.name, Message)

