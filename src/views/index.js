import { Loading } from '../components'

import Loadable from 'react-loadable'

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const Banner = Loadable({
    loader: () => import('./Banner'),
    loading: Loading
})

const AddArticle = Loadable({
    loader: () => import('./AddAtricle'),
    loading: Loading
})

const HotArticle = Loadable({
    loader: () => import('./HotArticle'),
    loading: Loading
})

const Welcome = Loadable({
    loader: () => import('./Welcome'),
    loading: Loading
})

const Title = Loadable({
    loader: () => import('./Title'),
    loading: Loading
})

export {
    Login,
    NotFound,
    Banner,
    AddArticle,
    HotArticle,
    Welcome,
    Title
}