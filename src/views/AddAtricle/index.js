import React, { Component } from 'react'

import './index.less'

import { getArticles, addArticles, updateArticles, deleteArticles } from '../../requests'

import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Divider,
} from 'antd'

const { confirm } = Modal

export default class AddArticle extends Component {

  state = {
    visible: false,
    fan :false,
    confirmLoading: false,
    Title: '',
    Http: '',
    Author: '',
    Imgsrc: '',
    key: '',
    data: [],

    columns: [
      {
        title: '文章标题',
        dataIndex: 'Title',
        key: 'Title',
        render: Title => <a>{Title}</a>,
      },
      {
        title: '文章链接地址',
        dataIndex: 'Http',
        key: 'Http',
      },
      {
        title: '文章作者',
        dataIndex: 'Author',
        key: 'Author',
      },
      {
        title: '文章宣传图片',
        key: 'Imgsrc',
        dataIndex: 'Imgsrc',
        render: Imgsrc => <a>{Imgsrc}</a>,
      },
      {
        title: '上传时间',
        dataIndex: 'Time',
        key: 'Time',
        render: Time => <a>{Time}</a>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text) => (
          <span>
            <a onClick={() => { this.showUpdateModal(text) }}>更新</a>
            <Divider type="vertical" />
            <a onClick={() => { this.showPropsConfirm(text) }} >删除</a>
          </span>
        ),
      },
    ]
  };

  showModal = () => {
    this.setState({
      visible: true,
      Title: '',
      Http: '',
      Author: '',
      Imgsrc: ''
    });
  };

  // 更新界面
  showUpdateModal = (text) => {
    console.log(text)
    this.setState({
      fan: true,
      Title: text.Title,
      Http: text.Http,
      Author: text.Author,
      Imgsrc: text.Imgsrc,
      key: text.key
    });
  };

  // 添加文章按钮
  handleAddOk = () => {
    this.setState({
      confirmLoading: true,
    });
    let { Title, Http, Author, Imgsrc } = this.state
    let params = { Title, Http, Author, Imgsrc }
    addArticles(params)
      .then(resp => {
        console.log(resp)
      })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.articlesRender()
    }, 2000);
  };

  // 添加取消
  handleAddCancel = () => {
    console.log('取消添加');
    this.setState({
      visible: false,
    });
  };

  // 修改取消
  handleUpdateCancel = () => {
    console.log('取消修改');
    this.setState({
      fan: false,
    });
  };

  // 更新文章的确定按钮
  handleUpdateOk = () => {
    this.setState({
      confirmLoading: true,
    });
    let { Title, Http, Author, Imgsrc, key } = this.state
    let params = { Title, Http, Author, Imgsrc, key }
    updateArticles(params)
      .then(resp => {
        console.log(resp)
      })
    setTimeout(() => {
      this.setState({
        fan: false,
        confirmLoading: false,
      });
      this.articlesRender()
    }, 2000);
  };

  // 删除按钮
  showPropsConfirm = (text) => {
    let that = this
    console.log(text)
    confirm({
      title: '即将删除该篇文章?',
      content: '请确认！！！',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        console.log(text.key)
        let params = { key: text.key }
        deleteArticles(params)
          .then(resp => {
            console.log(resp)
          })
        that.articlesRender()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 获取文章列表
  articlesRender = () => {
    getArticles()
      .then(resp => {
        console.log(resp)
        this.setState({
          data: resp
        })
      })
  }

  componentDidMount() {
    this.articlesRender()
  }

  render() {
    const { visible, confirmLoading } = this.state;
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
    const { Title, Http, Author, Imgsrc, fan } = this.state
    return (
      <div>
        <Button block className="f_btn" onClick={this.showModal} >添加文章</Button>
        <Table columns={this.state.columns} dataSource={this.state.data} />
        <Modal
          title="添加文章"
          visible={visible}
          onOk={this.handleAddOk}
          okText="OK"
          cancelText="Cancel"
          confirmLoading={confirmLoading}
          onCancel={this.handleAddCancel}
        >
          <Form {...formItemLayout} >
            <Form.Item label="Title">
              <Input onChange={(e) => { this.setState({ Title: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Http">
              <Input onChange={(e) => { this.setState({ Http: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Author">
              <Input onChange={(e) => { this.setState({ Author: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Imgsrc">
              <Input onChange={(e) => { this.setState({ Imgsrc: e.target.value }) }} />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="更新文章"
          visible={fan}
          onOk={this.handleUpdateOk}
          okText="OK"
          cancelText="Cancel"
          confirmLoading={confirmLoading}
          onCancel={this.handleUpdateCancel}
        >
          <Form {...formItemLayout} >
            <Form.Item label="Title">
              <Input value={Title} onChange={(e) => { this.setState({ Title: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Http">
              <Input value={Http} onChange={(e) => { this.setState({ Http: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Author">
              <Input value={Author} onChange={(e) => { this.setState({ Author: e.target.value }) }} />
            </Form.Item>
            <Form.Item label="Imgsrc">
              <Input value={Imgsrc} onChange={(e) => { this.setState({ Imgsrc: e.target.value }) }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
