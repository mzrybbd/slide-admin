
import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Breadcrumb, Button, Table, Divider, ConfigProvider, message } from 'antd';
import { UpdateFrom } from '../updateForm';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ listSearchProjects, loading }) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))

export default class EditTemplate extends React.Component {
  state = {
    flag: true,
    fileList: [],
    confirmLoading: false
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
        <span>{text ? '已启用' : '已禁用'}</span>
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
          <a onClick={() => this.putStatus(record)}>{text.status ? '禁用' : '启用'}</a>
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
    })
    this.props.dispatch({
      type: 'listSearchProjects/queryT',
      payload: {
        id: this.props.match.params.id
      },
    });
  }
  updateTemplate = e => {
    e.preventDefault();
    let demo = this.refs.getFormValue;
    let form = {}
    const { listSearchProjects: { edit = {} }, dispatch } = this.props;
    const { subjectProductId } = edit

    demo.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        form = values
        let formData = new FormData()
        formData.append('id', this.props.match.params.id)
        formData.append('title', form.title)
        formData.append('gradeList', form.gradeList.toString())
        formData.append('yearList', form.yearList.toString())
        formData.append('termList', form.termList.toString())
        formData.append('inverted', !!form.inverted)
        if (form.deckUuid) {
          formData.append('deckUuid', form.deckUuid)
        }
        formData.append('subjectProductId', form.subjectProductId ? form.subjectProductId.toString() : edit.subjectProductId)
        formData.append('skin', form.skin || '')
        formData.append('style', form.style || '')
        if (!!form.file && form.file.fileList) {
          if (form.file.fileList.length >= 1) {
            let file = form.file.fileList[form.file.fileList.length - 1]
            formData.append('file', file.originFileObj)
          }
        }
        dispatch({
          type: 'listSearchProjects/putT',
          payload: formData,
        }).then(() => {
          const { listSearchProjects: { putDetailRes = {} } } = this.props;
          if (putDetailRes.status === 1 && putDetailRes.errorCode === 0) {
            this.setState({
              confirmLoading: false
            });
            dispatch({
              type: 'listSearchProjects/queryT',
              payload: {
                id: this.props.match.params.id
              },
            });
          }else {
            this.setState({
              confirmLoading: false
            });
          }
        })
      }
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'listSearchProjects/queryT',
      payload: {
        id: this.props.match.params.id
      },
    }).then(() => {
      dispatch({
        type: 'listSearchProjects/querySubjectStatic',
      }).then(() => {
        const {
          listSearchProjects: { staticData = {} },
        } = this.props;
        const { subjectProductList = [] } = staticData
        if (this.props.listSearchProjects.edit.subjectProductId) {
          dispatch({
            type: 'listSearchProjects/fetch31',
            payload: {
              id: this.props.listSearchProjects.edit.subjectProductId,
            },
          })
        }
      })
    })
  }
  backList = () => {
    router.push('/courseTemplate')
  }
  render() {
    const { visible, onCancel, onCreate, form, listSearchProjects: { edit = {} }, } = this.props;
    const { templateVoList, referenced, subjectProductId } = edit
    let fileList = edit.previewImg ? [
      {
        uid: "-1",
        status: "done",
        name: edit.previewImg,
        url: edit.previewImg
      }
    ] : [{
      uid: "-2",
      status: "done",
      name: ',',
      url: ''
    }]
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
        {this.state.flag && (<UpdateFrom confirmLoading={this.state.confirmLoading} ref="getFormValue" fileList={fileList} id={subjectProductId} reference={referenced} formList={edit} updateTemplate={this.updateTemplate}></UpdateFrom>)}
        <h2>模版课件页</h2>
        <Table
          dataSource={templateVoList}
          pagination={false}
          columns={this.columns}
          rowKey={(record, index) => index}
        />
      </div>
    );
  }
}

