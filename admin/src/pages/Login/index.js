import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css'
import servicePath from '../../api/index'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const Login = ({ history }) => {

  const [submitting, setSubmitting] = useState(false)

  const onFinish = async (values) => {
    console.log('Success:', values);
    setSubmitting(true)
    const res = await axios({
      method: 'post',
      url: servicePath.login,
      data: values,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true
      }
    });
    console.log('res', res)
    setSubmitting(false)
    if (res.data.data) {
      localStorage.setItem('openId', res.data.data)
      sessionStorage.setItem('openId', res.data.data)
      history.push('/index')
    } else {
      message.error(res.data.message)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="loginBox">
      <Card title="x1nGoo">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Please input your userName!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" block loading={submitting} htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login