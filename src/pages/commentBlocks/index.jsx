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
import { getComment } from './api'

export default class TableList extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    data: [{"id":1,"title":"重难点1","background":"rgb(240, 149, 82)","use":true,"createdAt":"2017-10-25T05:58:05.000+0000","updatedAt":"2019-08-25T14:27:18.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025215642____.png"},{"id":2,"title":"易错点","background":"rgb(240, 149, 82)","use":true,"createdAt":"2017-10-25T06:09:46.000+0000","updatedAt":"2017-10-25T06:09:46.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025220938____.png"},{"id":3,"title":"时间控制","background":"rgb(240, 149, 82)","use":true,"createdAt":"2017-10-25T06:10:06.000+0000","updatedAt":"2017-10-25T06:10:06.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221003_____.png"},{"id":4,"title":"重要性说明","background":"rgb(240, 149, 82)","use":true,"createdAt":"2017-10-25T06:10:28.000+0000","updatedAt":"2017-10-25T06:10:28.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221021______.png"},{"id":5,"title":"前序知识","background":"rgb(138, 179, 72)","use":true,"createdAt":"2017-10-25T06:10:45.000+0000","updatedAt":"2017-10-25T06:10:45.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221040_____.png"},{"id":6,"title":"逻辑说明","background":"rgb(138, 179, 72)","use":true,"createdAt":"2017-10-25T06:11:30.000+0000","updatedAt":"2017-10-25T06:11:30.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221124_____.png"},{"id":7,"title":"课堂反应","background":"rgb(138, 179, 72)","use":true,"createdAt":"2017-10-25T06:11:51.000+0000","updatedAt":"2017-12-11T03:00:37.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221146_____.png"},{"id":8,"title":"过渡方式","background":"rgb(138, 179, 72)","use":true,"createdAt":"2017-10-25T06:12:09.000+0000","updatedAt":"2017-12-11T03:00:47.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171128133902_______new.png"},{"id":9,"title":"拓展","background":"rgb(82, 174, 240)","use":true,"createdAt":"2017-10-25T06:12:24.000+0000","updatedAt":"2017-10-25T06:12:24.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221221___.png"},{"id":10,"title":"互动提问","background":"rgb(82, 174, 240)","use":true,"createdAt":"2017-10-25T06:12:49.000+0000","updatedAt":"2017-10-25T06:12:49.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221242_____.png"},{"id":11,"title":"题目解析","background":"rgb(82, 174, 240)","use":true,"createdAt":"2017-10-25T06:13:08.000+0000","updatedAt":"2017-10-25T06:13:08.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171025221304_____.png"},{"id":12,"title":"知识讲解","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:44:00.000+0000","updatedAt":"2017-11-17T02:49:42.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105026________.png"},{"id":13,"title":"流程介绍","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:47:38.000+0000","updatedAt":"2017-12-11T03:01:10.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105037________.png"},{"id":14,"title":"互动思考","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:48:16.000+0000","updatedAt":"2017-11-17T02:50:27.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105047________.png"},{"id":15,"title":"过渡衔接","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:50:52.000+0000","updatedAt":"2017-11-17T02:47:16.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105055________.png"},{"id":16,"title":"时间分配","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:51:31.000+0000","updatedAt":"2017-11-17T02:45:36.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105103________.png"},{"id":17,"title":"拓展链接","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:52:41.000+0000","updatedAt":"2017-12-11T03:01:44.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116105119________.png"},{"id":18,"title":"总结笔记","background":"rgb(226, 249, 211)","use":true,"createdAt":"2017-11-05T23:53:13.000+0000","updatedAt":"2017-12-11T03:01:54.000+0000","iconSrc":"//diy-courseware.aixuexi.com/system/images/171116101530________.png"},{"id":24,"title":"时间","background":"rgb(2,31,39)","use":true,"createdAt":"2019-08-22T11:49:29.000+0000","updatedAt":"2019-08-22T11:49:29.000+0000","iconSrc":"https://storage.aixuexi.com/u/20kPuF5Ref7"}],
  };

  columns = [
    {
      title: '标注图标',
      dataIndex: 'iconSrc',
      render: (text, record) => {
        <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
        // <img src='//diy-courseware.aixuexi.com/system/images/171025220938____.png' />
      },
    },
    {
      title: '背景颜色',
      dataIndex: 'background',
      render: (text, record) => {
        <span style={{ background: text, width: '20px', height: '20px', border: '1px solid black', display: 'block' }}></span>
      },
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
    getComment(this.state.data)
  }

  handleUpdateModalVisible() {
    console.log('hhh')
  }
  handleModalVisible(flag, record) {

  }
  render() {
    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
          新建
        </Button>
        <Table
          dataSource={this.state.data}
          pagination={false}
          columns={this.columns}
          onChange={this.handleStandardTableChange}
          rowKey={(record, index) => index}
        />
      </div>
    )
  }
}
