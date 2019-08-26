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
  Table
} from 'antd';
import React, { Component, Fragment } from 'react';

import { connect } from 'dva';
@connect(({ comment, loading }) => ({  
  comment,
  loading: loading.models.comment,
}))
export default class TableList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
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
          <a href="">删除</a>
        </Fragment>
      ),
    },
  ];

  constructor() {
    super()
    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props)
    dispatch({
      type: 'comment/fetch',
    });
  }

  handleUpdateModalVisible() {
    console.log('hhh')
  }
  handleModalVisible(flag, record) {

  }
  render() {
    const { comment: { list } } = this.props;
    const data = [...list];

    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
          新建
        </Button>
        <Table
          dataSource={data}
          pagination={false}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
          rowKey={(record, index) => index}
        />
      </div>
    )
  }
}
