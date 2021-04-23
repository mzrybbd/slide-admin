import React, { Component } from 'react';
import {
  Button,
  message,
  Modal,
  Table,
  ConfigProvider,
  Breadcrumb,
  Tabs,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import DndTable from '@/components/DndTable'
import { CreateTemplate } from './editor';
import styles from './index.less';

const { TabPane } = Tabs;
class ThemeDetail extends Component {
  state = {
    visible: false,
    update: false,
    data: null,
    activeTab: '0',
    slideTypes: [],
  };

  columns = [
    { title: '课件页名称', dataIndex: 'name', key: 'name' },
    { title: '模板类型', dataIndex: 'templateTypeName', key: 'templateTypeName' },
    { title: '课件页类型', dataIndex: 'slideName', key: 'slideName',render: (text, record) => {
      return record.themeTypeName
    }},
    { title: '序号', dataIndex: 'formatIndex', key: 'formatIndex' },
    {
      title: '默认页',
      dataIndex: 'defualtFormat',
      key: 'defualtFormat',
      render: (text, record) => <>{record.defaultFormat ? '默认页' : '--'}</>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <>{record.active ? '启用中' : '禁用中'}</>,
    },
    {
      title: '操作',
      key: 'enabled',
      width: 400,
      render: (_, record, index) => this.renderTableRow(record, index),
    },
  ];

  componentDidMount() {
    this.fetchList().then(()=>{
      this.initSlideTypes()    
    });
  }

  async fetchList() {
    const { dispatch } = this.props;

    return await dispatch({
      type: 'theme/getDetail',
      payload: {
        themeId: this.props.match.params.id,
      }
    });

  }

  initSlideTypes() {
    const { theme: { themeDetail: { themeTypeList=[] } } } = this.props;
    const slideTypes = themeTypeList.map(({themeType, themeTypeName})=>({themeType, themeTypeName}))
    slideTypes.unshift({themeType: 0, themeTypeName: '全部'})
    this.setState({
      slideTypes
    })
  }

  handlePreview({ id }) {
    window.open(`//slide.aixuexi.com/template/player.html?themeSlideId=${id}`);
    // window.open(`//test.aixuexi.com:3001/player.html?themeSlideId=${id}`);
  }

  handleEdit({ id }) {
    window.open(`//slide.aixuexi.com/template/editor.html?themeSlideId=${id}`);
    // window.open(`//test.aixuexi.com:3001/editor.html?themeSlideId=${id}`);

  }

  createSlide = () => {
    let data = null;
    if(this.state.activeTab !== '0') {
      data = {
        themeType: +this.state.activeTab
      }
    }

    this.setState({
      visible: true,
      update: false,
      data,
    });
  }

  editSlide = (record) => {
    this.setState({
      visible: true,
      update: true,
      data: record,
    });
  }

  onSlideSuccess = () => {
    this.onSlideCancel()
    this.fetchList();
  };

  onSlideCancel = () => {
    this.setState({
      visible: false,
      update: false,
      data: null
    });
  };

  
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

  /**
   * 
   * @param {*} id 
   * @param {*} targetPosition  目标位置（首行为0）
   */
  sortSlide = async (id, targetPosition) => {
    const { dispatch } = this.props;
    const success = await dispatch({
      type: 'theme/sortThemeRecord',
      payload: {
        themeSlideId: id,
        index: targetPosition+1,
      },
    })
    if(success) {
      this.fetchList()
    }

  }

  onRowDrop = (drageId, dragIndex, hoverIndex) => {
    this.sortSlide(drageId, hoverIndex)
  }

  toggleDefault = async id => {
    const { dispatch } = this.props;
    const success = await dispatch({
      type: 'theme/setThemeDefaultFormat',
      payload: {
        themeSlideId: id,
      },
    })
    if(success) {
      this.fetchList()
    }
  }

  toggleStatus = record => {
    const { dispatch } = this.props;
    const that = this

    this.showConfirmModal(null, `确定${record.active ? '禁用' : '启用'}该课件页吗？`, () => {
      return dispatch({
        type: 'theme/toggleRecordStatus',
        payload: {
          id: record.id,
          active: !record.active
        },
      }).then(() => {
        const { toggleRes } = that.props.theme
        if(!toggleRes.status) {
          message.success(`${record.active ? '禁用' : '启用'}成功`)
          this.fetchList();
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

  onTabChange = (tabKey)=> {
    this.setState({activeTab: tabKey})
  }

  renderTabs() {
    const operations = <Button  type="primary" onClick={this.createSlide}>+新增课件页</Button>

    return (
    <Tabs className={styles.tabs} size="small" onChange={this.onTabChange} tabBarExtraContent={operations}>
      {
        this.state.slideTypes.map(({themeType,themeTypeName}) => (
          <TabPane tab={themeTypeName} key={themeType} />
        ))
      }
    </Tabs>
    )
  }

  renderModal() {
    const { visible, modalstate, update , data } = this.state
    const { match: {params: { id } } } = this.props

    return (
       visible && (
        <CreateTemplate
          visible={visible}
          state={modalstate}
          onSuccess={this.onSlideSuccess}
          onCancel={this.onSlideCancel}
          themeId={id}
          update={update}
          data={data}
          centered
        />
      )
    )
  }

  renderTable() {
    const slideList = this.getFilterTableData()
    const { tableLoading, sortLoading=false } = this.props
    const draggable = this.state.activeTab !== "0"

    const antTbProps = {
      rowKey: 'id',
      dataSource: slideList,
      columns: this.columns,
      size: 'middle',
      loading: {
        tip: '玩命加载中',
        size: 'default',
        spinning: tableLoading || sortLoading,
      },
      pagination: false,
      locale: {
        emptyText: '暂无数据',
      },
    };

    return (
      <div className={styles.tableList}>
        <DndTable 
          {...antTbProps}
          style={{ wordBreak: 'break-all' }}
          draggable={draggable}
          onRowDrop={this.onRowDrop}
        />
      </div>
    )
  }

  renderTableRow(record, index) {

    const slideList = this.getFilterTableData()

    const { activeTab } = this.state
    const disableToggleDefault = !record.active || record.defaultFormat // 禁用的不可设置为默认页
    const disableToggleStatus = record.active && record.defaultFormat // 默认页不可以被禁用
    const canMoveUp = activeTab !== "0" && index !== 0
    const canMoveDown = activeTab !== "0" && index !== slideList.length -1

    return (
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Button type="link" size="small" onClick={() => this.editSlide(record)}>
          修改
        </Button>
        <Button type="link" size="small" onClick={this.handleEdit.bind(this, record)}>
          编辑
        </Button>
        <Button type="link" size="small" onClick={this.handlePreview.bind(this, record)}>
          预览
        </Button>
        <Button type="link" size="small" disabled={disableToggleDefault} onClick={this.toggleDefault.bind(this, record.id)}>
          默认页
        </Button>
        <Button type="link" size="small" disabled={disableToggleStatus} onClick={this.toggleStatus.bind(this, record)}>
          {!record.active ? '启用' : '禁用'}
        </Button>
        {canMoveUp && <Button type="link" size="small" onClick={this.sortSlide.bind(this, record.id, index-1)}>
          上移
        </Button>}
        {canMoveDown && <Button type="link" size="small" onClick={this.sortSlide.bind(this, record.id, index+1)}>
          下移
        </Button>}
      </ConfigProvider>
    )
  }

  // tab过滤后的table数据
  getFilterTableData() {
    const { theme: { themeDetail: { themeTypeList=[] } } } = this.props;
    const { activeTab } = this.state
    if(activeTab !=='0' ) {
      return themeTypeList.find(item=>item.themeType === +activeTab).themeSlideList
    }
    return themeTypeList.reduce((all, item)=> {
      return all.concat(item.themeSlideList)
    },[])
  }

  render() {
    const {
      theme: { themeDetail },
    } = this.props;

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
        {this.renderTabs()}
        {this.renderModal()}
        {this.renderTable()}

      </div>
    );
  }
}

export default connect(({ theme, loading }) => ({
  theme,
  loading,
  tableLoading: loading.effects['theme/getDetail'],
  sortLoading: loading.effects['theme/sortThemeRecord'],
}))(ThemeDetail);
