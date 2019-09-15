import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  message,
  Upload,
  Checkbox,
  Icon,
  Switch,
} from 'antd';
import React, { Component } from 'react';
import { CompactPicker } from 'react-color'
import CoverPage from './coverPage';
const { TextArea } = Input
import { connect } from 'dva';

@connect(({ listSearchProjects, loading }) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))

export const CreateFrom = Form.create({ name: 'create_form' })(

  class extends React.Component {
    state = {
      fileList: [],
      file: {}
    }
    createTemplate = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    async changeGradeList(tag) {
      const { dispatch, form } = this.props;

      await dispatch({
        type: 'listSearchProjects/fetch32',
        payload: {
          id: tag,
        },
      });
      form.setFieldsValue({ gradeList: this.props.listSearchProjects.grade2.map(item => item.id) })
    }
    componentDidMount() {
      const { dispatch } = this.props;
      let id = 1

      dispatch({
        type: 'listSearchProjects/querySubjectStatic',
      }).then(() => {
        const {
          listSearchProjects: { staticData = {} },
        } = this.props;
        const { subjectProductList = [] } = staticData
        id = subjectProductList[0].id
        dispatch({
          type: 'listSearchProjects/fetch32',
          payload: {
            id: id,
          },
        })
      }).catch(e => {
        console.log(e)
      })
    }
    render() {
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
          md: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
          md: { span: 18 },
        },
      };
      const {
        listSearchProjects: { list = {}, grade2 = [], staticData = {} },
        loading,
        visible,
        onCancel,
        onCreate,
        form,
      } = this.props;
      const { getFieldDecorator } = form;
      const { subjectProductList = [], yearList = [], termMap = {} } = staticData
      const defaultSubject = subjectProductList.map(function (item) {
        return item['id'];
      })
      let { fileList } = this.state
      const fileprops = {
        accept: 'image/*',

        onRemove: file => {
          this.setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: file => {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        onChange(info) {
          let fileList = info.fileList;
          fileList = fileList.slice(-1);
        },
      };

      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 8 },
        },
      };
      return (
        <Form {...formItemLayout}>
          <Form.Item label="学科" >
            {getFieldDecorator('subjectProductId', {
              rules: [{ required: true, message: '请选择学科' }],
              initialValue: defaultSubject.slice(0, 1)
            })(
              <Select placeholder="请选择学科" onChange={(tag) => this.changeGradeList(tag)}>
                {subjectProductList.map((item, index) => (
                  <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="年级">
            {getFieldDecorator('gradeList', {
              rules: [{ required: true, message: '请选择年级' }],
              initialValue: grade2.map(function (item) {
                return item['id'];
              })
            })(
              <Checkbox.Group>
                {grade2.map((item, index) => (
                  <Checkbox value={item.id} key={index}>{item.name}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label="学期">
            {getFieldDecorator('termList', {
              rules: [{ required: true, message: '请选择学期' }],
              initialValue: Object.keys(termMap)
            })(
              <Checkbox.Group>
                {Object.keys(termMap).map((index, item) => (
                  <Checkbox value={index} key={index}>{termMap[index]}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Form.Item>

          <Form.Item label="年份">
            {getFieldDecorator('yearList', {
              rules: [
                {
                  required: true, message: '请选择年份', type: 'array',
                },
              ],
              initialValue: yearList.slice(1, 2)
            })(
              <Checkbox.Group>
                {yearList.map((item, index) => (
                  <Checkbox value={item} key={index}>{item}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label="模版名称">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入课程模版名称' }, {
                max: 100,
                message: '名称不能超过100字符',
              },],
            })(<Input placeholder="请输入课程模版名称" />)}
          </Form.Item>
          <Form.Item label="题目页反色">
            {getFieldDecorator('inverted', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>

          <Form.Item label="模版封面页">
            {getFieldDecorator('file')(
              <Upload {...fileprops}>
                <Button>
                  <Icon type="upload" /> 上传
              </Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
      );
    }
  },
);