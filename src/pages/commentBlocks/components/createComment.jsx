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
  message,
  Upload,
  Modal
} from 'antd';
import React, { Component } from 'react';
import { CompactPicker } from 'react-color'
export const CreateComment = Form.create({ name: 'form_in_modal' })(

  // eslint-disable-next-line
  class extends React.Component {
    state = {
      fileList: [],
      fileData: [],
    }

    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        message.error('Image must smaller than 10MB!');
      }
      return false;
    }

    handleChange(params) {
      const { file, fileList } = params;
      if(file.state === 'uploading') {
        setTimeout(() => {
          this.setState({
            percent: fileList.percent
          })
        }, 1000)
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form; 
      const props = {
        action: 'https://www.baidu.com',
        onChange: this.handleChange,
        multiple: false,
      };
      
      return (
       <Modal
        visible={visible}
        title="新建批注"
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
          <Form.Item label="批注名称">
            {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入批注名称' }],
              })(<Input placeholder="批注名称"/>)}
          </Form.Item>
          <Form.Item label="批注图标">
          { getFieldDecorator('iconSrc', {
                rules: [{ required: true, message: '请选择批注图标' }],
              })(<Upload {...props} fileList={this.state.fileList} beforeUpload={this.beforeUpload}>
                <Button>
                  <Icon type="upload" /> 选择文件
                </Button>
              </Upload>)}
          </Form.Item>
          <Form.Item label="批注填充色">
            <div>
              <span style={{height: '20px', width: '20px', background: 'rgb(255, 255, 255)',border: '1px solid #000',display: 'block'}}></span>
              <CompactPicker />
            </div>
          </Form.Item>
        </Form>
      </Modal>
      );
    }
  },
);