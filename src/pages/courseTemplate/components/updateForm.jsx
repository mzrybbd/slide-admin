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
import EditTemplate from './Editor';
@connect(({ listSearchProjects, loading }) => ({  
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))
export const UpdateFrom = Form.create({ name: 'update_form' })(

class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.formList.subjectProductId
    }
  }
  updateTemplate = e => {
    let form = {}
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        form = values
      }
    let formData = new FormData()
    console.log('====', form)
    if(form.file){
      form.file.forEach((file) => {
        formData.append('file', file.originFileObj)
      })
    }
    formData.append('id', this.props.url)
    formData.append('title', form.title)
    formData.append('gradeList', form.gradeList.toString())
    formData.append('yearList', form.yearList.toString())
    formData.append('termList', form.gradeList.toString())
    formData.append('inverted', !!form.inverted)
    if(form.deckUuid){
      formData.append('deckUuid', form.deckUuid)
    }
    formData.append('subjectProductId', form.subjectProductId.toString())
    formData.append('skin', form.skin || '')
    formData.append('style', form.style || '')
    console.log('===', form)
    this.props.dispatch({
      type:'listSearchProjects/putT',
      payload:formData,
    })
    });
    
  };

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
      const { form, reference, formList, onUpdate} = this.props;
      const { getFieldDecorator } = form;

      const {
        listSearchProjects: { list = {}, grade1 = [], staticData = {} },
        loading,
        visible, 
        onCancel, 
        onCreate, 
      } = this.props;

      const { subjectProductList = [], yearList = [], termMap ={} } = staticData

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
      const props = {
        action: '',
        onChange: this.handleChange,
      };
      const submitFormLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 8 },
        },
      };
      return (
        <Form {...formItemLayout} >
          {!reference && (<Form.Item label="学科" >
            {getFieldDecorator('subjectProductId', {
              rules: [{ required: true, message: '请选择学科' }],
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
          {reference && (<Form.Item label="学科" >
            {getFieldDecorator('subjectProductId')(
             <span className="ant-form-text">jj </span>
            )}
          </Form.Item>)}
          <Form.Item label="年级">
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
                { required: true, message: '请选择年份'},],
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
              rules: [{ required: true, message: '请输入课程模版名称' },{
                max:100,
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
            {getFieldDecorator('inverted', { valuePropName: 'checked',initialValue: formList.inverted })(<Switch />)}
          </Form.Item>
           <Form.Item label="皮肤">
            {getFieldDecorator('skin', {
              initialValue: formList.skin
            })(
                <TextArea
                rows= {2}
                disabled
                />,
              )}
          </Form.Item>
          <Form.Item label="样式">
            {getFieldDecorator('style',{
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
            <CoverPage imageUrl={formList.previewImg }></CoverPage>
          )}
        </Form.Item>
        <Form.Item {...submitFormLayout}> 
          <Button type="primary" onClick={ this.updateTemplate }>
            提交
          </Button>
        </Form.Item>
        </Form>
      );
    }
  },
);