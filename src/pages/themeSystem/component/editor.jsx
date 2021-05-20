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
  @connect(({ theme ,loading}) => ({
    theme,
    confirmLoading:  loading.effects['theme/postThemeRecord'] || loading.effects['theme/putThemeRecord'],
  }))
  class extends React.Component {
    state = {
      templateTypes: [],
      themeTypes: [],
      initTemplateType: null,
      initThemeType: null,
    };

    handleCreate = () => {
      const { form, dispatch, themeId, data, update } = this.props;

      form.validateFields(async (err, values) => {
        if (!err) {
     
          values.themeId = themeId
   
          if(!update) {
            await dispatch({
              type: 'theme/postThemeRecord',
              payload: values,
            });

            const {
              theme: { createRes = {} },
            } = this.props;
            if (!createRes.status) {
              message.success('创建成功')
              this.props.onSuccess();
            }
          }else {
            values.slideId = data.id
            await dispatch({
              type: 'theme/putThemeRecord',
              payload: values,
            });

            const {
              theme: { updateRes = {} },
            } = this.props;
            if (!updateRes.status) {
              message.success('更新成功')
              this.props.onSuccess();
            }
          }

        }
      });
    };

    componentDidMount() {
      this.init();
    }

    async init() {
      const { dispatch, themeId, data, theme: { themeTypes } } = this.props;
      if(themeTypes.length === 0) {
        await dispatch({
          type: 'theme/getThemeRecordTypes',
          payload: {
            themeId: themeId,
          },
        });
      }
      this.initSelectOptions()
    }

    initSelectOptions() {
      const { data, theme: { themeTypes: templateTypes } } = this.props;
      let themeTypes = templateTypes[0].themeList
      let initTemplateType = templateTypes[0].templateType
      let initThemeType = templateTypes[0].themeList[0].id
      
      // 默认课件页类型
      if(data && data.themeType) {
        const template = templateTypes.find(template => template.themeList.find(theme=> theme.id === data.themeType))
        initTemplateType = template.templateType
        themeTypes = template.themeList
        initThemeType = data.themeType
      }
      this.setState({
        templateTypes,
        themeTypes,
        initTemplateType,
        initThemeType
      });
    }
    
    changeTemplateType(tag) {
      let templateType = this.state.templateTypes.find(item => item.templateType === tag)

      this.setState({
        themeTypes: templateType.themeList,
        initThemeType:  templateType.themeList[0].id,
      })
      this.props.form.resetFields(['themeTypes'])
    }

    render() {
      const { visible, onCancel, form, update, data, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      const { templateTypes, themeTypes, initTemplateType, initThemeType } = this.state;
      const title = update ?  '更新课件页' : '新增课件页';

      return (
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleCreate.bind(this)}
          onCancel={onCancel}
          maskClosable={false}
          confirmLoading={confirmLoading}
          okText="确定"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            <Form.Item label="模板类型">
              {getFieldDecorator('templateType', {
                rules: [{ required: true, message: '请选择模板类型' }],
                initialValue: initTemplateType,
              })(
                <Select placeholder="请选择模板类型" disabled={update}  onChange={tag => this.changeTemplateType(tag)}>
                  {templateTypes.map(item => (
                    <Select.Option value={item.templateType} key={item.templateType}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="课件页类型">
              {getFieldDecorator('themeType', {
                rules: [{ required: true, message: '请选择课件页类型' }],
                initialValue: initThemeType
              })(
                <Select placeholder="请选择课件页类型" disabled={update} >
                  {themeTypes.map(item => (
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
                    max: 8,
                    message: '课件页名称不超过8个字符',
                  },
                ],
                initialValue: data ? data.name : ''
              })(<Input placeholder="请输入名称，不超过8个字符" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
