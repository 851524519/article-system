/**
 * @file config-overrides.js
 * @author Fan Qiang(851524519@qq.com)
 * 基于 customize和 react-app-rewired 的定制化配置文件
 */

//  从 customize-cra 引入一些相关的方法
const { 
    override,
    addLessLoader,
    fixBabelImports,
    addDecoratorsLegacy 
} =  require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
)