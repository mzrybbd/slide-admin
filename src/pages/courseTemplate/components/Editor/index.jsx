
import React, { Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import { Breadcrumb, Button, Table, Divider, ConfigProvider, message } from 'antd';
// import { TemplateFrom } from '../form';
import { UpdateFrom } from '../updateForm';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ listSearchProjects, loading }) => ({  
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))

export default class EditTemplate extends React.Component {
  state = {
    submitting: false,
    flag: false
  }
  columns = [
    {
      title: '课件页类型',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => (
        <span>{text? '已启用': '已禁用'}</span>
      ),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a target='_blank' href={`http://slide.aixuexi.com/editor.html?themeId=${this.props.match.params.id}&tempType=${text.type}`}>编辑</a>
          <Divider type="vertical" />
          <a target='_blank' href={`http://slide.aixuexi.com/player.html?themeId=${this.props.match.params.id}&tempType=${text.type}`} onClick={this.redirect}>预览</a>
          <Divider type="vertical" />
          <a onClick={() => this.putStatus(record)}>{text.status? '禁用': '启用'}</a>
        </Fragment>
      ),
    },
  ];
  putStatus = (record) => {
    this.props.dispatch({
      type: 'listSearchProjects/putAnyS',
      payload: {
        id: this.props.match.params.id,
        type: record.type,
        status: (record.status) ? 0 : 1
      },
    }).then(() => {
      let msg = record.status ? '禁用成功' : '启用成功'
      message.success(msg)
    });
  }
  updateTemplate() {
    let demo=this.refs.getFormValue;
    let form = {}
    demo.validateFields((err, values) => {
      if(!err){
        form = values;
      }
    });
    let formData = new FormData()
    form.file.fileList.forEach((file) => {
      formData.append('file', file)
    })
    // formData.append('file', form.file)
    formData.append('id', 54339)
    formData.append('title', form.title)
    formData.append('gradeList', form.gradeList.toString())
    formData.append('yearList', form.yearList.toString())
    formData.append('termList', form.gradeList.toString())
    formData.append('inverted', 1)
    formData.append('subjectProductId', form.subjectProductId.toString())
    formData.append('skin', form.skin || '')
    formData.append('style', form.style || '')
    console.log(formData)
    this.props.dispatch({
      type:'listSearchProjects/putT',
      payload: formData,
    })
  }
  componentDidMount(){
    const { dispatch } = this.props;

    dispatch({
      type: 'listSearchProjects/fetch4',
      payload: {
        id: this.props.match.params.id
      },
    });
  }
  backList = () => {
    router.push('/courseTemplate')
  }
  render() {
    const { visible, onCancel, onCreate, form, listSearchProjects: { edit = {} }, } = this.props;
    console.log( edit)
    const { templateVoList,referenced } = edit

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={this.backList}>列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          <Breadcrumb.Item>{edit.title}</Breadcrumb.Item>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2>课件模版属性</h2>
        <UpdateFrom ref="getFormValue" onUpdate={this.updateTemplate} reference={referenced} formList={edit}></UpdateFrom>
        <h2>模版课件页</h2>
        <Table
          dataSource={ templateVoList }
          pagination={false}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
          rowKey={(record, index) => index}
        />
      </div>
    );
  }
}

