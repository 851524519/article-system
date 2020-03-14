import React, { Component } from 'react'

import { Button, Table, Modal, Form, Input } from 'antd'

import './index.less'

import {
    getBanner,
    addBanner,
    updateBanner,
    deleteBanner
} from '../../requests'

const { confirm } = Modal

export default class Banner extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        fan: false,
        dataSource: [],
        bannerSrc: '',
        id: '',
        columns: [
            {
                title: '图片地址',
                dataIndex: 'bannerSrc',
                key: 'bannerSrc',
                render: imgSrc => <a>{imgSrc}</a>
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: 16 }} onClick={() => {this.showUpdateModal(record)}} >更新</a>
                        <a onClick={() => {this.showPropsConfirm(record)}}>删除</a>
                    </span>
                ),
            },
        ]
    }
    // 显示添加
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 显示更新
    showUpdateModal = (record) => {
        // console.log(record)
        this.setState({
            fan: true,
            bannerSrc: record.bannerSrc,
            id: record.id
        });
    };

    // 确定添加
    handleOk = () => {
        console.log('确定添加')
        this.setState({
            confirmLoading: true,
        });
        let { bannerSrc } = this.state
        let params = { bannerSrc }
        addBanner(params)
            .then(resp => {
                console.log(resp)
            })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            this.bannerRender()
        }, 2000);
    };

    // 确定修改
    handleUpdateOk = () => {
        console.log('确定修改')
        this.setState({
            confirmLoading: true,
        });
        let { bannerSrc, id } = this.state
        let params =  { bannerSrc, id }
        updateBanner(params)
            .then(resp => {
                console.log(resp)
            })
        setTimeout(() => {
            this.setState({
                fan: false,
                confirmLoading: false,
            });
            this.bannerRender()
        }, 2000);
    };

    // 取消添加
    handleCancel = () => {
        console.log('取消添加');
        this.setState({
            visible: false,
        });
    };

    // 取消修改
    handleUpdateCancel = () => {
        console.log('取消修改');
        this.setState({
            fan: false,
        });
    };

    // 删除按钮
    showPropsConfirm = (record) => {
        console.log(record)
        let that = this
        // let { id } = this.state
        confirm({
            title: '即将删除该篇文章?',
            content: '请确认！！！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = { id: record.id }
                deleteBanner(params)
                    .then(resp => {
                        console.log(resp)
                    })
                that.bannerRender()
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 图片渲染方法
    bannerRender = () => {
        getBanner()
            .then(resp => {
                console.log(resp)
                this.setState({
                    dataSource: resp
                })
            })
    }

    componentDidMount() {
        this.bannerRender()
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const { visible, confirmLoading, dataSource, columns, fan } = this.state;
        return (
            <div>
                <Button block className="f_btn" onClick={this.showModal} >添加广告图</Button>
                <Table dataSource={dataSource} columns={columns} rowKey={dataSource => dataSource.id} />
                <Modal
                    title="添加广告图"
                    visible={visible}
                    okText="OK"
                    cancelText="Cancel"
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="bannerSrc">
                            <Input onChange={(e) => { this.setState({ bannerSrc: e.target.value }) }} />
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 修改页 */}
                <Modal
                    title="修改广告图"
                    visible={fan}
                    okText="OK"
                    cancelText="Cancel"
                    onOk={this.handleUpdateOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleUpdateCancel}
                >
                    <Form {...formItemLayout} >
                        <Form.Item label="bannerSrc">
                            <Input value={this.state.bannerSrc} onChange={(e) => { this.setState({ bannerSrc: e.target.value }) }} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
