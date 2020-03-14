import axios from 'axios'

const services = axios.create({
    baseURL: 'http://server.ignorantscholar.cn'
})



services.interceptors.request.use((config) => {
    // console.log(config)
    // axios.defaults.headers.post['Token'] = window.localStorage.getItem('autoToken')
    // config.headers = {
    //     Token: window.localStorage.getItem('autoToken')
    // }
    config.headers = Object.assign({}, config.headers, {
        Token: window.localStorage.getItem('autoToken')
    })
    return config
})

services.interceptors.response.use((resp) => {
    // console.log(resp)
    if (resp.data.code === 100002) {
        window.location.href = '/login'
    } else {
        return resp.data
    }
})

// 登录接口
export const fLogin = () => {
    return services.post('/active/login', {
        username: '11',
        password: '11'
    })
}

// 获取文章列表
export const getArticles = () => {
    return services.post('/active/activelist')
}

// 添加文章
export const addArticles = (params) => {
    return services.post('/active/addActivelist', params)
}

// 更新文章
export const updateArticles = (params) => {
    return services.post('/active/updateActivelist', params)
}

// 删除文章
export const deleteArticles = (params) => {
    return services.post('/active/removeActivelist', params)
}

// 获取热门文章列表
export const getHotArticles = () => {
    return services.post('/active/articlesListHot')
}

// 添加热门文章
export const addHotArticles = (params) => {
    return services.post('/active/hot/addActivelist', params)
}

// 更新热门文章
export const updateHotArticles = (params) => {
    return services.post('/active/hot/updateActivelist', params)
}

// 删除热门文章
export const deleteHotArticles = (params) => {
    return services.post('/active/hot/removeActivelist', params)
}

// 查询图片的接口
export const getBanner = () => {
    return services.post('/active/banner')
}

// 添加图片的接口
export const addBanner = (params) => {
    return services.post('/active/addbanner', params)
}

// 修改图片的接口
export const updateBanner = (params) => {
    return services.post('/active/updatebanner', params)
}

// 删除图片的方法
export const deleteBanner = (params) => {
    return services.post('/active/removebanner', params)
}

// 查询问题的接口
export const getTitle = () => {
    return services.post('/active/questionlist')
}

// 添加问题的接口
export const AddTitle = (params) => {
    return services.post('/active/addquestion', params)
}

// 更新问题的接口
export const updateTitle = (params) => {
    return services.post('/active/updatequestionlist', params)
}

// 删除问题的接口
export const deleteTitle = (params) => {
    return services.post('/active/removequestionlist', params)
}