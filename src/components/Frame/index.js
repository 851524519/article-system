import React, { Component, createRef } from 'react'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import { withRouter } from 'react-router-dom'

import './index.less'

const { Header, Content, Footer, Sider } = Layout


@withRouter
class Frame extends Component {
    constructor () {
        super()

        // 在 constructor 里来创建 ref
        this.spa = createRef()
    }
    menuClick = ({ key }) => {
        this.props.history.push(key)
    }
    
    // 滚动方法
    fScroll = () => {
        let spa = this.spa.current
        let con = 0
        setInterval(() => {
            con++
            if (con >= 1000) {
                con = 0
            }
            spa.style.left = con + 'px'
        }, 10);
    }

    componentDidMount () {
        this.fScroll()
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        selectedKeys={[this.props.location.pathname]} 
                        mode="inline" 
                        onClick={this.menuClick}
                    >
                        <div className="f-sys">管理系统</div>
                        {
                            this.props.menus.map(route => {
                                return (
                                    <Menu.Item key={route.pathname}>
                                        <Icon type="pie-chart" />
                                        <span>{route.title}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <span className='f_span' ref={this.spa} >欢迎来到文章管理系统...</span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{ background: '#F0F2F5', minHeight: '100%' }}
                        >
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer
                        style={{ textAlign: 'center' }}
                    >
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Frame