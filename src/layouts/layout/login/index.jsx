import React, { Component } from 'react';
import './style.less';
import router from 'umi/router';
import { Form, Icon, Input, Button, Checkbox } from 'antd'

@Form.create() //经 Form.create() 包装过的组件会自带 this.props.form 属性
class Login extends Component {
  state = {
    collapsed: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 检测用户名
        const result = ("admin" === values.username)
        if (!result) {
          this.props.form.setFields({
            username: {
              value: values.username,
              errors: [new Error('用户名不正确')]
            }
          })
          return
        } else {
          //检测密码是否错误
          if ('admin' !== values.password) {
            this.props.form.setFields({
              password: {
                value: values.password,
                errors: [new Error('密码错误')]
              }
            })
            return
          }
        }
      }
    })
    window.localStorage.setItem('token', 'admin')
    router.push('/home');

  }
  register = () => {
    this.props.switchShowBox('register')
    setTimeout(() => this.props.form.resetFields(), 500)
  }

  render() {
    // console.log(this.props, 1)
    const { getFieldDecorator } = this.props.form

    return (
      <div id='login-page' style={{ minHeight: '100vh' }}>
        <div className="container">
          <div className="box showBox">
            <h3 className='title'>管理员登录</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox style={{ color: '#1890ff' }}>记住密码</Checkbox>)}
                {/* <a className="login-form-forgot" href="">
                  Forgot password
          </a> */}
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </div>
              </Form.Item>
            </Form>
            <div className='footer'>
              <div>欢迎登陆后台管理系统</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login


