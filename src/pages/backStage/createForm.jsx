import { Button, Form, Input, message, Upload, Checkbox, Icon, Switch, Radio, Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
const { Dragger } = Upload;
@connect(({ game, loading }) => ({
  game,
  confirmLoading: loading.effects['game/postUploadGame'],
}))
export const UploadFile = Form.create({ name: 'upload_file' })(
  
  class extends React.Component {
    state = {
      fileList: [],
      file: {},
    };
    handleChange = info => {
      console.log(info, 'info')
      if(!this.checkFile(info)) {
        return;
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({ fileList: [...fileList] });
      // this.setState({ fileList });
    };

    handleCreate = () => {
      const { form, dispatch } = this.props;
      form.validateFields(async (err, values) => {
        if (!err) {
          let formData = new FormData();

          if (values.file.length >= 1) {
            let file = values.file[values.file.length - 1];
            formData.append('file', file.originFileObj);
          }
          console.log(values.file,  'values.file')

          formData.append('isIframe', values['source'] == 2 ? true : false);
          formData.append('type', values['source'] == 1 ? 1 : 2);
          
          for (let key in values) {
            if (key !== 'file' && key !== 'isIframe' ) formData.append(key, values[key]);
          }
          await dispatch({
            type: 'game/postUploadGame',
            payload: formData,
          });

          const {
            game: { uploadGameRes = {} },
          } = this.props;
          if (uploadGameRes.status === 1 && uploadGameRes.errorCode === 0) {
            this.props.update({ page: 1, size: 20 });
            this.props.onCancel();
          }
        }
      });
    };
    checkFile = file => {
      let fileName = file.file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (lastName.toLowerCase() != ".zip") {
        return false;
      }
      return true
    }
    normFile = e => {
      let limit = 1;

      if (Array.isArray(e)) {
        return e;
      }
      console.log(e,'eeeee',e.fileList.length, e &&
      e.fileList &&
      e.fileList
        .filter((item, index, arr) => {
          return index > arr.length - (limit + 1);
        }))
      if(!this.checkFile(e)){
        message.warning("文件必须为.zip类型");
        e.fileList.pop()
        // if(e.fileList.length <= 1)
        //  return 
      }
      return (
        e &&
        e.fileList &&
        e.fileList
          .filter((item, index, arr) => {
            return index > arr.length - (limit + 1);
          })
      );
    };
    handleRemove = info => {
      this.setState({ fileList: [] });
    };
    checkGameName = (rule, value='', callback) => {
      if (value.trim().length === 0) {
        return callback('请输入游戏名称');
      } else if (value.trim().length > 10) {
         callback('最多10个文字');
      }
       callback();
    };
    checkGameDescription = (rule, value='', callback) => {
      if (value.trim().length === 0) {
        return callback('请输入游戏简介');
      } else if (value.trim().length > 15) {
         callback('最多15个文字');
      }
       callback();
    };
    render() {
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
          md: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 19 },
          md: { span: 18 },
        },
      };
      const { confirmLoading, visible, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
      const fileprops = {
        name: 'gameFile',
        accept: 'application/zip,application/x-zip,application/x-zip-compressed',
        beforeUpload: file => {
          return false;
        },
        // multiple: false,
        // onChange: this.handleChange,
        // onRemove: this.handleRemove,
      };

      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 8 },
        },
      };
      return (
        <Modal
          title="上传"
          width="640px"
          visible={visible}
          onOk={this.handleCreate.bind(this)}
          onCancel={onCancel}
          maskClosable={false}
          confirmLoading={confirmLoading}
          okText="确定"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="资源包">
              {getFieldDecorator('file', {
                // initialValue: undefined,
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [{ required: true, message: '请上传素材或源文件' }],
              })(
                <Dragger {...fileprops} >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或拖拽上传素材或源文件</p>
                  <p className="ant-upload-hint">只允许上传：.zip</p>
                </Dragger>,
              )}
            </Form.Item>
            <Form.Item label="游戏名称" className="required">
              {getFieldDecorator('gameName', {
                rules: [
                  // { required: true, message: '请输入游戏名称' },
                  {
                    validator: this.checkGameName,
                  },
                ],
              })(<Input placeholder="最多10个字" />)}
            </Form.Item>
            <Form.Item label="游戏简介" className="required">
              {getFieldDecorator('gameDescription', {
                rules: [
                  // { required: true, message: '请输入游戏简介' },
                  {
                    validator: this.checkGameDescription,
                  },
                ],
              })(<Input placeholder="最多15个字" />)}
            </Form.Item>
            {
              <Form.Item label="来源">
                {getFieldDecorator('source', {
                  initialValue: '1',
                  rules: [{ required: true, message: '请选择类型' }],
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">睿泰</Radio.Button>
                    <Radio.Button value="2">禾教</Radio.Button>
                  </Radio.Group>,
                )}
              </Form.Item>
            }
            {/* <Form.Item label="类型">
              {getFieldDecorator('type', {
                initialValue: '1',
                rules: [{ required: true, message: '请选择类型' }],
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">模板</Radio.Button>
                  <Radio.Button value="2">成品</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item> */}
            {/* {this.props.form.getFieldValue('source') === '2' &&
              this.props.form.getFieldValue('type') === '2' && (
                <Form.Item label="是否iframe">
                  {getFieldDecorator('isIframe', { valuePropName: 'checked' })(<Switch />)}
                </Form.Item>
              )} */}
          </Form>
        </Modal>
      );
    }
  },
);
