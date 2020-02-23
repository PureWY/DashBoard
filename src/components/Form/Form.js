import React from 'react';
import { Form, Input, Button } from 'antd';
// import styles from './Form.css';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}

class FormComponent extends React.Component{
  state = {
    checkNick: false,
  }

  componentDidMount(){
    this.props.onRef(this)
  } 

  checkForm = () => {
    return new Promise((resolve,reject) => {
      this.props.form.validateFields((err,values) => {
        if (!err) {
          resolve(values)
        }else{
          reject('error')
        }
      })
    })
  };

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['warp_form'], { force: true });
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formData = this.props.updateData
    return (
      <div>
        <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              initialValue: formData.name,
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input disabled={formData.name ? true : false} placeholder="Please input your name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Email">
            {getFieldDecorator('email', {
              initialValue: formData.email,
              rules: [
                {
                  required: true,
                  message: 'Please input your email',
                },
              ],
            })(<Input placeholder="Please input your email" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Website">
            {getFieldDecorator('website',{
              initialValue: formData.website,
            })(<Input placeholder="Please input your website" />)}
          </Form.Item>
      </div>
    );
  }
}

const WarpForm = Form.create({ name: 'warp_form' })(FormComponent)

export default WarpForm