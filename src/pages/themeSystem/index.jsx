import React, { Component } from 'react';
import {
  List,
  Select,
  Button,
  message,
  Table,
} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import ThemeEditor from './ThemeEditor'
import styles from './style.less';
import moment from 'moment';

let pageNo = 1;
let size = 20;

class ThemeList extends Component {
  state = {
    visible: false,
    current: 1,
    editData: null,
  };

  columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '主题名称', dataIndex: 'name', key: 'name' },
    { title: '学科', dataIndex: 'subjectName', key: 'subjectName' },
    { title: '年份', dataIndex: 'yearList', key: 'yearList', render: (list) => {
      return <p className={styles.colYears}>{list.join("、")}</p>
    }},
    { title: '状态', dataIndex: 'active', key: 'active', render: (text) => {
      return text ? '启用中' : '禁用中'
    }},
    { title: '创建时间', dataIndex: 'createAt', key: 'createAt',render: (text) => {
      return moment(text).format('YYYY-MM-DD HH:mm')
    }},
    {
      title: '操作',
      key: 'enabled',
      render: (text, record) => (
        <>
          <Button onClick={() => this.toThemeDetail(record.id)} type="link">
            查看
          </Button>
          <Button onClick={() => this.editTheme(record)} type="link">
            修改信息
          </Button>
        </>
      ),
    },
  ];

  toThemeDetail = id => {
    router.push(`/themeSystem/${id}`);
  }

  editTheme = record => {
    this.setState({
      editData: record,
      visible: true,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      editData: null,
    });
  };

  componentDidMount() {
    this.init({
      page: pageNo,
      size: size,
    });
  }

  async init(data) {
    const { dispatch } = this.props;
    await dispatch({
      type: 'theme/getList',
      payload: data,
    });
  }

  changePage = page => {
    pageNo = page;

    this.init({
      page: pageNo,
      size: size,
    });
  };

  onFormSuccess = () => {
    this.hideModal()
    this.init({
      page: pageNo,
      size: size,
    });
  }

  render() {
    const {
      theme: { list = [] },
    } = this.props;
    const table = {
      rowKey: 'id',
      dataSource: list,
      columns: this.columns,
      rowKey: 'id',
      pagination: Array.isArray(list.data) && list.data.length > 1 ? 'bottom' : 'none',
      loading: {
        tip: '玩命加载中',
        size: 'default',
        spinning: this.props.tableLoading,
      },
      pagination: {
        current: pageNo,
        onChange: this.changePage,
        defaultPageSize: size,
        total: list.itemTotal,
      },
      locale: {
        emptyText: '暂无数据' ,
      },
    };
    const { visible, editData } = this.state

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>+新增主题</Button>
        {visible && <ThemeEditor
          data={editData}
          visible={visible}
          onCancel={this.hideModal}
          onSuccess={this.onFormSuccess}
        />}
        <div className={styles.cardList}>
          <Table {...table} bordered style={{ wordBreak: 'break-all' }} size="middle" />
        </div>
      </div>
    );
  }
}

export default connect(({ theme, loading }) => ({
  theme,
  tableLoading: loading.effects['theme/getList'],
}))(ThemeList);
