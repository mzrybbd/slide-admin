import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

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

export const CreateTemplate = Form.create({ name: 'create_slide' })(
  @connect(({ theme }) => ({
    theme,
  }))
  class extends React.Component {
    state = {
      confirmLoading: false,
      templateType: [],
      themeType: [],
    };

    handleCreate = () => {
      const { form, dispatch, themeId, data } = this.props;

      form.validateFields(async (err, values) => {
        if (!err) {
          let formData = new FormData();
          values.themeId = themeId
          this.setState({
            confirmLoading: true,
          });
          if(!data) {
            await dispatch({
              type: 'theme/postThemeRecord',
              payload: values,
            });
            this.setState({
              confirmLoading: false,
            });
            const {
              theme: { createRes = {} },
            } = this.props;
            if (!createRes.status) {
              message.success('创建成功')
              this.props.update();
              this.props.onCancel();
            }
          }else {
            await dispatch({
              type: 'theme/putThemeRecord',
              payload: values,
            });
            this.setState({
              confirmLoading: false,
            });
            const {
              theme: { updateRes = {} },
            } = this.props;
            if (!updateRes.status) {
              message.success('更新成功')
              this.props.update();
              this.props.onCancel();
            }
          }

        }
      });
    };

    componentDidMount() {
      this.init();
    }

    async init() {
      const { dispatch, themeId, data } = this.props;
      await dispatch({
        type: 'theme/getThemeRecordTypes',
        payload: {
          themeId: themeId,
        },
      });
      const themeTypes = this.props.theme.themeTypes;
      if(data) {
        let themeType = themeTypes.filter(item => item.templateType === data.templateType)
        this.setState({
          templateType: themeTypes,
          themeType: themeType.length ? themeType[0].themeList : [],
        });
      }else {
        this.setState({
          templateType: themeTypes,
          themeType: themeTypes.length ? themeTypes[0].themeList : [],
        });
      }

    }

    changeThemeType(tag) {
      let templateType = this.state.templateType.filter(item => item.templateType === tag)
      this.setState({themeType: templateType.length ? templateType[0].themeList : []})
      this.props.form.resetFields(['themeType'])
    }

    render() {
      const { visible, onCancel, form, title, status, data } = this.props;
      const { getFieldDecorator } = form;
      const { templateType, themeType } = this.state;

      return (
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleCreate.bind(this)}
          onCancel={onCancel}
          maskClosable={false}
          confirmLoading={this.state.confirmLoading}
          okText="确定"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
          {!status && <Form.Item label="模板类型">
              {getFieldDecorator('templateType', {
                rules: [{ required: true, message: '请选择模板类型' }],
                initialValue: templateType.length ? templateType[0].templateType : null,
              })(
                <Select placeholder="请选择模板类型" onChange={tag => this.changeThemeType(tag)}>
                  {templateType.map(item => (
                    <Select.Option value={item.templateType} key={item.templateType}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>}
            <Form.Item label="课件页类型">
              {getFieldDecorator('themeType', {
                rules: [{ required: true, message: '请选择课件页类型' }],
                initialValue: themeType.length ? themeType[0].id : null,
              })(
                <Select placeholder="请选择课件页类型">
                  {themeType.map(item => (
                    <Select.Option value={item.id} key={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="课件页名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入课件页名称' },

                  {
                    max: 20,
                    message: '课件页名称不超过20个字符',
                  },
                ],
                initialValue: data ? data.slideName : ''
              })(<Input placeholder="请输入名称，不超过20个字符" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
