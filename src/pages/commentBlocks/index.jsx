import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
  Popconfirm,
  Table
} from 'antd';
import React, { Component, Fragment } from 'react';
import { CreateComment } from './components/createComment'
import UpdateComment from './components/updateComment'

import { connect } from 'dva';
@connect(({ comment, loading }) => ({  
  comment,
  loading: loading.models.comment,
}))
export default class TableList extends Component {
  state = {
    visible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    data:[]
  };
  columns = [
    {
      title: '标注图标',
      dataIndex: 'iconSrc',
      render: (text, record) => (
        <img src={ text } style={{ width:'20px', height:'20px' }} />
      ),
    },
    {
      title: '背景颜色',
      dataIndex: 'background',
      render: (text, record) => (
        <span style={{ background: text, width: '20px', height: '20px', border: '1px solid black', display: 'block' }}></span>
      ),
    },
    {
      title: '批注名称',
      dataIndex: 'title',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record)}>
							<a href="javascript;">删除</a>
						</Popconfirm>
        </Fragment>
      ),
    },
  ];
  handleSubmit() {

  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleDelete = (record) => {
    let list = this.state.data.filter(val => val.id !== record.id)
    this.setState({data: this.state.data.pop()}, () => {
      
    })
    console.log(this.state.data, list)
  }
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  constructor() {
    super()
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props)
    dispatch({
      type: 'comment/fetch',
    });
    const { comment: { list } } = this.props;
    this.state.data = [...list];
  }

  handleUpdateModalVisible() {
    console.log('hhh')
  }
  handleModalVisible(flag, record) {

  }
  render() {
    const { comment: { list } } = this.props;
    this.state.data = [...list];

    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.showModal()}>
          新建
        </Button>
        <Table
          dataSource={this.state.data}
          pagination={false}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
          rowKey={(record, index) => index}
        />
        <CreateComment wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate} />
      </div>
    )
  }
}
