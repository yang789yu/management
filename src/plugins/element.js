import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Menu, Submenu, MenuItemGroup,
         MenuItem, MessageBox, Tag, Breadcrumb, BreadcrumbItem, Dropdown, DropdownMenu,
         DropdownItem, Table, TableColumn, Pagination, Upload } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert;

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Upload)
