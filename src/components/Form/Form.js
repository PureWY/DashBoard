import React from 'react';
import { Form, Input, Button } from 'antd';
// import styles from './Form.css';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
}

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class FormComponent extends React.Component{
  state = {
    checkNick: false,
  }

  componentDidMount(){
    this.props.onRef(this)
  } 

  checkForm = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
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
    return (
      <div>
        <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input placeholder="Please input your name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input your email',
                },
              ],
            })(<Input placeholder="Please input your email" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Website">
            {getFieldDecorator('website')(<Input placeholder="Please input your website" />)}
          </Form.Item>
          <Form.Item {...formTailLayout}>
        </Form.Item>
      </div>
    );
  }
}

const WarpForm = Form.create({ name: 'warp_form' })(FormComponent)

export default WarpForm