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
    fileList: []
  }
  createTemplate = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  changeGradeList(tag) {
    const { dispatch } = this.props;

    dispatch({
      type: 'listSearchProjects/fetch3',
      payload: {
        id: tag,
      },
    });
    // this.filter()
  }
  componentDidMount() {
    const { dispatch } = this.props;
    let id = 1
    
    dispatch({
      type: 'listSearchProjects/fetch2',
    }).then(() => {
      const {
       listSearchProjects: { staticData = {} },
     } = this.props;
     const { subjectProductList = []} = staticData
      id = subjectProductList[0].id
      dispatch({
        type: 'listSearchProjects/fetch3',
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
        listSearchProjects: { list = {}, grade = [], staticData = {} },
        loading,
        visible, 
        onCancel, 
        onCreate, 
        form
      } = this.props;
      const { getFieldDecorator } = form;

      const { subjectProductList = [], yearList = [], termMap ={} } = staticData
      const defaultSubject = subjectProductList.map(function (item) {
        return item['id']; 
      })
        const fileprops = {
          name: 'file',
          accept: 'image/*',
          action: '',
          beforUpload(file){
            // let fileList = [...info.fileList];
            // fileList = fileList.slice(-1);
            // // this.setState({
            // //     fileList:[file]
            // // })
            return false;
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };
      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 8 },
        },
      };
      return (
        <Form {...formItemLayout} onSubmit={this.createTemplate}>
          <Form.Item label="学科" >
            {getFieldDecorator('subjectProductId', {
              rules: [{ required: true, message: '请选择学科' }],
              initialValue: defaultSubject.slice(0,1)
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
              initialValue: grade.map(function (item) {
                return item['id']; 
              })
            })(
              <Checkbox.Group>
                {grade.map((item, index) => (
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
                { required: true, message: '请选择年份', type: 'array',
                
               },
              ],
              initialValue: yearList
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
              rules: [{ required: true, message: '请输入课程模版名称' }],
            })(<Input placeholder="请输入课程模版名称" />)}
          </Form.Item>
          <Form.Item label="题目页反色">
            {getFieldDecorator('inverted', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>
         
          <Form.Item label="模版封面页">
          {getFieldDecorator('file')(
            <Upload {...fileprops} >
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