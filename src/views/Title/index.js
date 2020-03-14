import React, { Component, createRef } from 'react'

import { Button, Table, Modal, Popover } from 'antd'

import './index.less'

import {
    getTitle,
    AddTitle,
    updateTitle,
    deleteTitle
} from '../../requests'

import Ed from '../../common/editor'

const { confirm } = Modal

export default class Title extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        question: '',
        id: '',
        answer: '无',
        fan: false,
        dataSource: [],
        columns: [
            {
                title: '图片地址',
                dataIndex: 'question',
                key: 'question',
                render: (text, record) => (
                <Popover title="点击访问详情" trigger="hover">
                    <div dangerouslySetInnerHTML={{__html: record.question}} />
                </Popover>
                )
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a style={{ marginRight: 16 }} onClick={() =>{this.showUpdateModal(record)}} >更新 {record.name}</a>
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
            id: record.id
        })
        this.setState({
            fan: true,
        });
    };

    // 确定添加
    handleOk = () => {
        console.log('确定添加')
        this.setState({
            confirmLoading: true,
        });
        let { question, answer } = this.state
        let params = { question, answer }
        console.log(params)
        AddTitle(params)
            .then(resp => {
                console.log(resp)
            })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            this.getTitles()
        }, 2000);
    };

    // 确定修改
    handleUpdateOk = () => {
        console.log('确定修改')
        this.setState({
            confirmLoading: true,
        });
        let { question, answer, id } = this.state
        let params = { question, answer, id }
        updateTitle(params)
            .then(resp => {
                console.log(resp)
            })
        setTimeout(() => {
            this.setState({
                fan: false,
                confirmLoading: false,
            });
            this.getTitles()
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
        // console.log(record)
        let that = this
        confirm({
            title: '即将删除该篇文章?',
            content: '请确认！！！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = { id: record.id }
                deleteTitle(params)
                console.log('OK');
                that.getTitles()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    getTitles = () => {
        getTitle()
            .then(resp => {
                console.log(resp)
                this.setState({
                    dataSource: resp
                })
            })
    }

    componentDidMount () {
        this.getTitles()
    }

    getAdd = (html) => {
        console.log(html)
        this.setState({
            question: html
        })
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
                <Button block className="f_btn" onClick={this.showModal} ref={this.title} >添加题目</Button>
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
                    <div >
                        <Ed getAdd={this.getAdd}></Ed>
                    </div>
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
                    <div >
                        <Ed getAdd={this.getAdd}></Ed>
                    </div>
                </Modal>
            </div>
        )
    }
}
