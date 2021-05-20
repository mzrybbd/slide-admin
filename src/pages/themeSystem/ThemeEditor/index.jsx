import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Checkbox,
  Radio,
  Row,
  Col,
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
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const filterOption = (input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0


@connect(({ theme, loading }) => ({
  theme,
  confirmLoading: loading.effects['theme/putTheme'] || loading.effects['theme/postTheme']
}))
export default Form.create({})(
  class extends React.Component {
    state = {
    };

    componentDidMount() {
      this.fetchConfigs();
    }

    fetchConfigs() {
      // 学科，年份
      this.props.dispatch({
        type: 'theme/querySubjectStatic',
      })
    }

    onSubmit = () => {
      const { form, dispatch, data, onSuccess } = this.props;

      form.validateFields(async (err, values) => {
        if ( err) return
        const payload = {
          ...values,
          yearList: values.yearList || [],
        }

        let res = false
        if(data) {
          payload.id = data.id
          res = await dispatch({
            type: 'theme/putTheme',
            payload,
          })
        } else {
          res = await dispatch({
            type: 'theme/postTheme',
            payload,
          })
        }
        res && onSuccess()
      });
    };

    render() {
      const { form, theme, confirmLoading, visible, onCancel, onSuccess, data } = this.props;
      const { getFieldDecorator } = form;
      const { staticData: { subjectProductList=[], yearList=[]} }  = theme
      const title = data ? "修改主题" : "新增主题";

      return (
        <Modal
          title={title}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={onCancel}
          maskClosable={false}
          okText="保存"
          cancelText="取消"
        >
          <Form {...formItemLayout}>
            {!data ? (
              <Form.Item label="学科">
                {getFieldDecorator('subjectId', {
                  rules: [{ required: true, message: '请选择学科' }],
                  initialValue: data ? data.subjectId : null,
                })(
                  <Select placeholder="请选择学科" showSearch filterOption={filterOption}>
                    {subjectProductList.map(item => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ): (
              <Form.Item label="学科">
                <span>{data.subjectId===0 ? '通用': data.subjectName}</span>
              </Form.Item>
            )}
            <Form.Item label="年份">
              {getFieldDecorator('yearList', {
                initialValue: data ? data.yearList  : null,
              })(
                <CheckboxGroup>
                  <Row>
                    {yearList.map(v => 
                      <Col span={6} key={v} >
                        <Checkbox value={v}>{v}</Checkbox>
                      </Col>
                    )}
                  </Row>
                </CheckboxGroup>
              )}
            </Form.Item>
            <Form.Item label="主题名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入主题名称' }, {
                  max: 100,
                  message: '名称不能超过100字符',
                },],
                initialValue: data ? data.name : ''
              })(
                <Input placeholder="主题名称" />
              )}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator('active', {
                initialValue: data ? data.active : false
              })(
                <RadioGroup>
                  <Radio value={true}>启用</Radio>
                  <Radio value={false}>禁用</Radio>
                </RadioGroup>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
