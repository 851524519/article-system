import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';

import { fLogin } from '../../requests'

import './index.less'

@Form.create()
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    state = {
        username: '',
        password: '',
        show: false
    }

    handleLogin = () => {
        let { username, password } = this.state
        let { history } = this.props
        if (username === '11' && password === '11') {
            fLogin()
                .then(resp => {
                    window.localStorage.setItem('autoToken', resp.Token)
                })
            history.push('/admin/welcome')
        } else {
            this.setState({
                show: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        show: false
                    })
                }, 3000)
            })
        }
    }

    user = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    pass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        let { show } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="f_login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <span className="f_log">登录</span>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                    onChange={(e) => { this.user(e) }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => { this.pass(e) }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button
                                type="primary"
                                // htmlType="submit"
                                className="login-form-button"
                                onClick={() => { this.handleLogin() }}
                            >
                                Log in
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="f_err" style={{ display: show ? 'block' : 'none' }}>
                    <Alert
                        message="Error"
                        description="您输入的账号或密码不正确, 请您重新输入."
                        type="error"
                        showIcon
                    />
                </div>
            </div>
        )
    }
}

export default Login