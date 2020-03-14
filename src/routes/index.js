import {
    Login,
    Banner,
    NotFound,
    AddArticle,
    HotArticle,
    Welcome,
    Title
} from '../views'

// 不需要登陆就可以访问的页面
export const mainRouter = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

// 登陆之后才可以访问的页面
export const adminRouter = [{
    pathname: '/admin/welcome',
    component: Welcome,
    title: '欢迎进入',
    isNav: true
},{
    pathname: '/admin/addArticle',
    component: AddArticle,
    title: '添加文章',
    isNav: true
}, {
    pathname: '/admin/hotArticle',
    component: HotArticle,
    title: '热门文章',
    isNav: true
}, {
    pathname: '/admin/banner',
    component: Banner,
    title: '广告图',
    isNav: true
}, {
    pathname: '/admin/title',
    component: Title,
    title: '添加题目',
    isNav: true
}, {
    pathname: '/admin/question',
    component: Title,
    title: 'wenti'
}]