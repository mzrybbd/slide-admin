import React, { Component } from 'react';
import {
  Button,
  message,
  Modal,
  Table,
  ConfigProvider,
  Breadcrumb
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { CreateTemplate } from './editor';
import styles from './index.less';

const TEMPLATE_TYPE = {
  普通模板页: 1,
  Word碎片页: 2,
  通用题目页: 3,
  目录: 4
};

class ThemeDetail extends Component {
  state = {
    visible: false,
    update: false,
    data: null,
  };

  columns = [
    { title: '模板类型', dataIndex: 'templateTypeName', key: 'templateTypeName' },
    { title: '课件页类型', dataIndex: 'name', key: 'name' },
    {
      title: 'ID',
      dataIndex: 'themeType',
      key: 'themeType',
    },
    { title: '课件页名称', dataIndex: 'slideName', key: 'slideName' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <>{record.active ? '启用中' : '禁用中'}</>,
    },
    {
      title: '操作',
      key: 'enabled',
      render: (text, record) => (
        <>
          <ConfigProvider autoInsertSpaceInButton={false}>
            <Button type="link" onClick={() => {
              this.showModal()
              this.setState({ update: true, data: record })
            }}>
              课件页编辑
            </Button>
            <Button type="link" onClick={this.handleEdit.bind(this, record)}>
              编辑
            </Button>
            <Button type="link" onClick={this.handlePreview.bind(this, record)}>
              预览
            </Button>
            <Button type="link" onClick={this.toggleStatus.bind(this, record)}>
              {!record.active ? '启用' : '禁用'}
            </Button>
            <Button
              type="link"
              onClick={this.delSlide.bind(this, record)}
              disabled={record.active}
            >
              删除
            </Button>
          </ConfigProvider>
        </>
      ),
    },
  ];

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handlePreview({ id }) {
    window.open(`http://slide.aixuexi.com/static-v2/player.html?themeSlideId=${id}`);
  }
  handleEdit({id, templateType}) {
    window.open(`http://slide.aixuexi.com/static-v2/editor.html?themeSlideId=${id}&templateType=${templateType}`);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      update: false,
      data: null
    });
  };

  componentDidMount() {
    this.init();
  }
  async init() {
    const { dispatch } = this.props;

    await dispatch({
      type: 'theme/getDetail',
      payload: {
        themeId: this.props.match.params.id,
      }
    });
  }

  delSlide = record => {
    const { dispatch } = this.props;
    const that = this

    this.showConfirmModal('danger', `确定删除该课件页吗？`, () => {
      return dispatch({
        type: 'theme/deleteRecord',
        payload: {
          id: record.id,
          active: record.active
        },
      }).then(() => {
        const { delRes } = that.props.theme
        if(!delRes.status) {
          message.success(`删除成功`)
          this.init();
        }
      })
    });
  };

  toggleStatus = record => {
    const { dispatch } = this.props;
    const that = this

    this.showConfirmModal(null, `确定${record.active ? '禁用' : '启用'}该课件页吗？`, () => {
      return dispatch({
        type: 'theme/toggleRecordStatus',
        payload: {
          id: record.id,
          active: record.active
        },
      }).then(() => {
        const { toggleRes } = that.props.theme
        if(!toggleRes.status) {
          message.success(`${record.active ? '禁用' : '启用'}成功`)
          this.init();
        }
      })
    });
  };

  showConfirmModal(type, title, onOk) {
    Modal.confirm({
      title: title,
      onOk: onOk,
      okType: type,
    });
  }

  render() {
    const {
      theme: { themeDetail },
    } = this.props;

    const table = {
      rowKey: 'id',
      dataSource: themeDetail.themeSlideList || [],
      columns: this.columns,
      rowKey: 'id',
      loading: {
        tip: '玩命加载中',
        size: 'default',
        spinning: this.props.tableLoading,
      },
      pagination: false,
      locale: {
        emptyText: '暂无数据',
      },
    };

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => router.push('/themeSystem')}>列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Item>{themeDetail.name}</Breadcrumb.Item>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => this.showModal()} className={styles.tableList}>
          新增课件页
        </Button>
        {this.state.visible && (
          <CreateTemplate
            visible={this.state.visible}
            state={this.state.modalstate}
            onCancel={this.handleCancel}
            themeId={this.props.match.params.id}
            title={this.state.update ? '更新课件页' : '新增课件页'}
            status={this.state.update}
            data={this.state.data}
            update={() => {
              this.init();
            }}
            centered
          />
        )}

        <div className={styles.tableList}>
          <Table {...table} style={{ wordBreak: 'break-all' }} size="middle" />
        </div>
      </div>
    );
  }
}

export default connect(({ theme, loading }) => ({
  theme,
  tableLoading: loading.effects['theme/getDetail'],
}))(ThemeDetail);
