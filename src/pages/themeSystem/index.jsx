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
import styles from './style.less';

let pageNo = 1;
let size = 20;

class ThemeList extends Component {
  state = {
    visible: false,
    current: 1,
  };

  columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    {
      title: '操作',
      key: 'enabled',
      render: (text, record) => (
        <>
          <Button onClick={() => this.editTheme(record.id)} type="link">
            {'查看'}
          </Button>
        </>
      ),
    },
  ];

  editTheme = id => {
    router.push(`/themeSystem/${id}`);
  }

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

  render() {
    const {
      theme: { list = {} },
    } = this.props;
    const table = {
      rowKey: 'id',
      dataSource: list.data || [],
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

    return (
      <div>
        {/* <Button type="primary" onClick={() => this.showModal()}>
          新建主题
        </Button> */}
        {/* {this.state.visible && (
          <CreateTheme
            visible={this.state.visible}
            state={this.state.modalstate}
            onCancel={this.handleCancel}
            update={() => {
              this.init({
                page: 1,
                size: size,
              });
            }}
            centered
          ></CreateTheme>
        )} */}
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
