import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Modal
} from 'antd';
import React, { Component } from 'react';
import ColorSelect from './colorPicker'
import { CompactPicker } from 'react-color'
export const CreateComment = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
       <Modal
        visible={visible}
        title="新建批注"
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form >
          <Form.Item label="批注名称">
            {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入批注名称' }],
              })(<Input placeholder="批注名称"/>)}
          </Form.Item>
          <Form.Item label="批注图标">
          { getFieldDecorator('iconSrc', {
                rules: [{ required: true, message: '请选择批注图标' }],
              })(<Input type="file"/>)}
          </Form.Item>
          <Form.Item label="批注填充色">
              <CompactPicker />
         

            {/* <a href="javascript:void(0)"> */}
              {/* <span style={{ background: 'rgb(255, 255, 255)', width: '20px', height: '20px', border: '1px solid black', display: 'block' }}></span> */}
            {/* </a> */}
          </Form.Item>
        </Form>
      </Modal>
      );
    }
  },
);