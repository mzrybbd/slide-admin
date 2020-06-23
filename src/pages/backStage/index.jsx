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
  Tag,
  Input,
  Divider,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import styles from './style.less';
import StandardFormRow from '../courseTemplate/components/StandardFormRow';
import TagSelect from '../courseTemplate/components/TagSelect';

import { UploadFile } from './createForm';
import { timeFrom } from '../../utils/index.js';
import { values } from 'lodash';
const { Search } = Input;
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
    queryObj: {},
    default: true,
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
          {record.source === 1 && record.type === 1 ? (
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
          {text === 1 && <Tag color="#35C2D0">睿泰</Tag>}
          {text === 2 && <Tag color="#E7481F">禾教</Tag>}
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
        <>
          <a onClick={this.toggleStatus.bind(this, record)}>{!record.enabled ? '启用' : '禁用'}</a>
          {record.isIframe && (
            <>
              {' '}
              <Divider type="vertical" />{' '}
              <a
                target="_blank"
                href={record.cdnPath + '/' + record.iframeIndex || 'http://baidu.com'}
              >
                {'查看'}
              </a>
            </>
          )}
        </>
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
    const { formatValue } = this
    await dispatch({
      type: 'game/putStatus',
      payload: {
        id: record.id,
        status: !!record.enabled ? 0 : 1,
      },
    });
    this.props.form.validateFields((err, values) => {
      this.init({
        page: pageNo,
        size: size,
        ...formatValue(values)
      });
    });
  };
  formatValue(values) {
    let res = {}
    if(values['source'].length === 1){
      res['source'] = values['source'].toString()
    }
    if(values['enabled'].length === 1){
      res['enabled'] = values['enabled'].toString() == 1
    }
    if(values['gameName']) {
      res['gameName'] = values['gameName'].trim()
    }
    return res;
  }
  changePage = page => {
    pageNo = page;
    const { formatValue } = this

    this.props.form.validateFields((err, values) => {
      this.init({
        page: pageNo,
        size: size,
        ...formatValue(values)
      });
    });
  };
  change = e => {
    this.setState({ default: false });
    const { formatValue } = this
    pageNo = 1
    this.props.form.validateFields((err, values) => {
      this.init({
        page: pageNo,
        size: size,
        ...formatValue(values)
      });
    });
  };
  render() {
    const {
      game: { gameList },
      form,
    } = this.props;
    const { getFieldDecorator } = form;

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
      locale: {
        emptyText: this.state.default ? '暂无数据' : '没有搜索到结果',
      },
    };

    return (
      <div>
        <Card bordered={false} className={styles.filterBox}>
          <Form layout="inline">
            <FormItem className={styles.gameFilter}>
              {getFieldDecorator('gameName')(
                <Search
                  placeholder="请输入游戏名称"
                  enterButton="搜索"
                  // onSearch={e => this.change(e)}
                  onSearch={e => {
                    this.setState({ queryObj: { ...this.state.queryObj, gameName: e } }, e => {
                      this.change(e);
                    });
                  }}
                />,
              )}
            </FormItem>
            <StandardFormRow
              title="来源"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('source', {
                  initialValue: [1, 2],
                })(
                  <TagSelect
                    radioable
                    onChange={e => {
                      this.setState(
                        {
                          queryObj: {
                            ...this.state.queryObj,
                            source: e.length === 1 ? e.toString() : null,
                          },
                        },
                        e => {
                          this.change(e);
                        },
                      );
                    }}
                  >
                    <TagSelect.Option value={1}>睿泰</TagSelect.Option>
                    <TagSelect.Option value={2}>禾教</TagSelect.Option>
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow
              title="状态"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('enabled', {
                  initialValue: [0, 1],
                })(
                  <TagSelect
                    radioable
                    onChange={e => {
                      this.setState(
                        {
                          queryObj: {
                            ...this.state.queryObj,
                            enabled: e.length === 1 ? e.toString() == 1 : null,
                          },
                        },
                        e => {
                          this.change(e);
                        },
                      );
                    }}
                  >
                    <TagSelect.Option value={1}>启用中</TagSelect.Option>
                    <TagSelect.Option value={0}>已禁用</TagSelect.Option>
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>

        <Button type="primary" onClick={() => this.showModal()}>
          上传游戏文件包
        </Button>
        {this.state.visible && (
          <UploadFile
            visible={this.state.visible}
            state={this.state.modalstate}
            onCancel={this.handleCancel}
            update={() => {
              this.init({
                page: 1,
                size: size,
              });
              this.props.form.resetFields()
            }}
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
}))(Form.create()(Projects));
