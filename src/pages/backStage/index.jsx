import {
  Card,
  Form,
  List,
  Select,
  Typography,
  Button,
  Pagination,
  message,
  Modal,
  Table,
  Tag
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import styles from './style.less';
import { UploadFile } from './createForm';
import { timeFrom } from '../../utils/index.js';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;
const { confirm } = Modal;
let pageNo = 1;
let size = 20;

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

class Projects extends Component {
  state = {
    visible: false,
    current: 1,
  };

  columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '游戏名称', dataIndex: 'gameName', key: 'gameName' },
    {
      title: '缩略图',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '25%',
      render: (text, record) => (
        <>
          {record.source === 1 ? (
            <img
              src={
                record.replacement['images/thumb'] ||
                record.cdnPath + '/images/thumb.png' ||
                'http://storage.aixuexi.com/u/80etDFEzFb54'
              }
              style={{ width: '100%' }}
            />
          ) : (
            <></>
          )}
        </>
      ),
    },
    { title: '游戏简介', dataIndex: 'gameDescription', key: 'gameDescription' },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: text => (
        <>
          {/* {text === 1 && '睿泰'}
          {text === 2 && '禾教'} */}
          {text === 1 && (
            <Tag color="#35C2D0">
              睿泰
            </Tag>
          )}
          {text === 2 && (
            <Tag  color="#E7481F">
              禾教
            </Tag>
          )}
        </>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: text => (
        <>
          
          {text === 1 && '模板'}
          {text === 2 && '成品'}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <>{record.enabled ? '启用中' : '禁用中'}</>,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      render: text => timeFrom(text),
    },
    {
      title: '操作',
      key: 'enabled',
      render: (text, record) => (
        <a onClick={this.toggleStatus.bind(this, record)}>{!record.enabled ? '启用' : '禁用'}</a>
      ),
    },
  ];
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.init({
      page: pageNo,
      size: size,
    });
  }
  async init(data) {
    const { dispatch, form } = this.props;
    await dispatch({
      type: 'game/fetchList',
      payload: data,
    });
  }

  toggleStatus = async record => {
    const { dispatch } = this.props;
    const props = this.props;

    await dispatch({
      type: 'game/putStatus',
      payload: {
        id: record.id,
        status: !!record.enabled ? 0 : 1,
      },
    });
    this.init({
      page: pageNo,
      size: 20,
    });
  };
  changePage = page => {
    pageNo = page;
    this.init({ page: pageNo, size });
  };
  render() {
    const {
      game: { gameList },
    } = this.props;
    const table = {
      rowKey: 'id',
      dataSource: gameList.list,
      columns: this.columns,
      rowKey: 'id',
      loading: {
        tip: '玩命加载中',
        size: 'default',
        spinning: this.props.tableLoading,
      },
      pagination: {
        current: pageNo,
        onChange: this.changePage,
        defaultPageSize: size,
        total: gameList.itemTotal,
      },
    };

    return (
      <div className={styles.coverCardList}>
        <Button type="primary" onClick={() => this.showModal()}>
          上传游戏文件包
        </Button>
        {this.state.visible && (
          <UploadFile
            visible={this.state.visible}
            state={this.state.modalstate}
            onCancel={this.handleCancel}
            update={this.init.bind(this)}
            centered
          ></UploadFile>
        )}

        <div className={styles.cardList}>
          <Table {...table} bordered style={{ wordBreak: 'break-all' }} size="middle" />
        </div>
        {/* <Pagination current={list.pageNum || 1} pageSize={list.pageSize || 1} onChange={this.onChange} total={list.itemTotal || 1} hideOnSinglePage={this.state.flag} /> */}
      </div>
    );
  }
}

export default connect(({ game, loading }) => ({
  game,
  tableLoading: loading.effects['game/fetchList'],
}))(Projects);
