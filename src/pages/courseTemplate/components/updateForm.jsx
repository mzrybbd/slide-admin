import {
  Button,
  Card,
  Form,
  Input,
  Select,
  message,
  Upload,
  Checkbox,
  Icon,
  Switch,
} from 'antd';
import React, { Component } from 'react';
import { CompactPicker } from 'react-color'
const { TextArea } = Input
import { connect } from 'dva';

@connect(({ listSearchProjects, loading }) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))
export const UpdateFrom = Form.create({ name: 'update_form' })(

  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        file: props.fileList,
        fileList: props.fileList,
        defaultFileList: [{
          uid: "-2",
          status: "done",
          name: '',
          url: ','
        }]
      }
    }

    handleChange = info => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({ fileList });
    };
    handleRemove = info => {
      this.setState({ fileList: this.state.defaultFileList })
    }
    beforeUpload = file => {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        message.error('封面图必须大于10MB!');
      }
      return false;
    }

    componentWillReceiveProps(nextProps) {
      const { file, defaultFileList } = this.state
      const fatherFileList = nextProps.fileList
      if (!file.length || file[0].name !== fatherFileList[0].name) {
        this.setState({
          fileList: fatherFileList,
          file: fatherFileList
        })
      }
      return true;
    }

    async changeGradeList(tag) {
      const { dispatch, form } = this.props;

      await dispatch({
        type: 'listSearchProjects/fetch31',
        payload: {
          id: tag,
        },
      });
      form.setFieldsValue({ gradeList: this.props.listSearchProjects.grade1.map(item => item.id) })
    }

    render() {
      const { form, reference, formList, onUpdate, id } = this.props;
      const { getFieldDecorator } = form;
      const {
        listSearchProjects: { list = {}, grade1 = [], staticData = {} },
        loading,
        visible,
        onCancel,
        onCreate,
      } = this.props;
      const { subjectProductList = [], yearList = [], termMap = {} } = staticData
      let subjectId = [].concat(formList.subjectProductId)
      let value = subjectProductList.filter((item, index) => {
        return item.id == subjectId
      })

      let fileList = []
      if (this.state.fileList.length) {
        fileList = this.state.fileList[0].name !== ',' ? this.state.fileList : []
      }

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
          md: { span: 12 },
        },
      };
      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 8 },
        },
      };
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传</div>
        </div>
      );
      const { defaultFileList } = this.state

      const fileprops = {
        accept: 'image/*',
        beforeUpload: this.beforeUpload,
        onChange: this.handleChange,
        onRemove: this.handleRemove
      };
      return (
        <Form {...formItemLayout} >
          {!reference && (<Form.Item label="学科" >
            {getFieldDecorator('subjectProductId', {
              rules: [{ required: true, message: '请选择学科' }],
              initialValue: [].concat(formList.subjectProductId)
            })(
              <Select placeholder="请选择学科" onChange={(tag) => this.changeGradeList(tag)}>
                {subjectProductList.map((item, index) => (
                  <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>)}
          {reference && value[0] && (<Form.Item label="学科" >
            {getFieldDecorator('subjectProductId')(
              <span className="ant-form-text">{value[0].name}</span>
            )}
          </Form.Item>)}
          <Form.Item label="年级" >
            {getFieldDecorator('gradeList', {
              rules: [{ required: true, message: '请选择年级' }],
              initialValue: formList.themeGradeBoList
            })(
              <Checkbox.Group>
                {grade1.map((item, index) => (
                  <Checkbox value={item.id} key={index}>{item.name}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label="学期">
            {getFieldDecorator('termList', {
              rules: [{ required: true, message: '请选择学期' }],
              initialValue: formList.themeTermBoList
            })(
              <Checkbox.Group>
                {Object.keys(termMap).map((index, item) => (
                  <Checkbox value={Number(index)} key={index}>{termMap[index]}</Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </Form.Item>

          <Form.Item label="年份">
            {getFieldDecorator('yearList', {
              rules: [
                { required: true, message: '请选择年份' },],
              initialValue: formList.themeYearBoList
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
              initialValue: formList.title
            })(<Input placeholder="请输入课程模版名称" />)}
          </Form.Item>
          {reference && (<Form.Item label="DIY预览讲次UUID">
            {getFieldDecorator('deckUuid', {
              rules: [{ required: true, message: '请输入UUID' }],
              initialValue: formList.deckUuid
            })(<Input placeholder="请输入讲次UUID" />)}
          </Form.Item>)}
          <Form.Item label="题目页反色">
            {getFieldDecorator('inverted', { valuePropName: 'checked', initialValue: formList.inverted })(<Switch />)}
          </Form.Item>
          <Form.Item label="皮肤">
            {getFieldDecorator('skin', {
              initialValue: formList.skin
            })(
              <TextArea
                rows={2}
                disabled
              />,
            )}
          </Form.Item>
          <Form.Item label="样式">
            {getFieldDecorator('style', {
              initialValue: formList.style
            })(
              <TextArea
                rows={2}
                disabled
              />,
            )}
          </Form.Item>
          <Form.Item label="模版封面页">
            {getFieldDecorator('file')(
              <Upload {...fileprops} fileList={fileList}>
                <Button>
                  <Icon type="upload" /> 上传
                 </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout}>
            <Button type="primary" onClick={this.props.updateTemplate}>
              提交
          </Button>
          </Form.Item>
        </Form>
      );
    }
  },
);