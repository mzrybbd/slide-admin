import { Card, Form, List, Select, Typography, Button, Pagination, message, Modal, ConfigProvider } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { CreateFrom } from './components/createForm';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;
const { confirm } = Modal;
let pageNo = 1;

const getData = (props, values) => {
  let form = {}
  props.form.validateFields((err, obj) => {
    if (!err) {
      form = Object.assign(obj, values);
    }
  });

  const { subjectList, gradeList, termMap, yearList, status } = form
  const prop = {
    id: subjectList.toString(),
    gradeList: gradeList.toString(),
    termList: termMap.toString(),
    yearList: yearList.toString(),
    pageNo,
    pageSize: 12,
  }
  if (status.length === 1) {
    prop.status = status.toString()
  }
  props.dispatch({
    type: 'listSearchProjects/queryFilterList',
    payload: { ...prop },
  });
}

class Projects extends Component {
  state = {
    visible: false,
    current: 1,
    flag: true,
  };

  editTemplate = id => {
    router.push(`/courseTemplate/${id}`);
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

  handleCreate = () => {
    let demo = this.refs.getFormValue;
    let form = {}
    const { dispatch } = this.props

    demo.validateFields((err, values) => {
      if (!err) {
        form = values;

        let formData = new FormData()
        if (!!form.file) {
          if (form.file.fileList.length >= 1) {
            let file = form.file.fileList[form.file.fileList.length - 1]
            formData.append('file', file.originFileObj)
          }
        }

        formData.append('title', form.title)
        formData.append('gradeList', form.gradeList.toString())
        formData.append('yearList', form.yearList.toString())
        formData.append('termList', form.termList.toString())
        formData.append('inverted', form.inverted ? 1 : 0)
        formData.append('subjectProductId', form.subjectProductId.toString())
        dispatch({
          type: 'listSearchProjects/createT',
          payload: formData,
        }).then((res) => {
          const {
            listSearchProjects: { createRes = {} },
          } = this.props;
          if (createRes.status === 1 && createRes.errorCode === 0) {
            demo.resetFields()
            this.setState({
              visible: false,
            });
            getData(this.props, this.props.form.getFieldsValue())
          }
        });
      }
    })
  }

  change = () => {
    pageNo = 1
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let id = 1

    dispatch({
      type: 'listSearchProjects/querySubjectStatic',
    }).then(() => {
      const {
        listSearchProjects: { staticData = {} },
      } = this.props;
      const { subjectProductList = [] } = staticData
      id = subjectProductList[0].id
      dispatch({
        type: 'listSearchProjects/fetch33',
        payload: {
          id,
        },
      }).then(() => {
        const {
          listSearchProjects: { grade3 = [], staticData = {} },
        } = this.props;
        const { yearList = [], termMap = {} } = staticData
        const gradeList = grade3.map(item => item.id)
        dispatch({
          type: 'listSearchProjects/queryFilterList',
          payload: {
            id,
            gradeList: gradeList.toString(),
            termList: Object.keys(termMap).toString(),
            yearList: yearList.toString(),
            pageNo: 1,
            pageSize: 12,
          },
        });
      })
    })
  }

  onChange = page => {
    pageNo = page
    getData(this.props, this.props.form.getFieldsValue())
    this.setState({
      current: page,
    });
  };

  delete = async id => {
    const props = this.props
    const { dispatch } = this.props
    await confirm({
      title: '确定删除改模版吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'listSearchProjects/deleteT',
          payload: {
            id,
          },
        }).then(() => {
          const {
            listSearchProjects: { list = {} },
          } = props;
          let page = Math.ceil(list.itemTotal % 12)
          if (page === 1 && pageNo > 1) {
            pageNo -= 1
          }
          getData(props, props.form.getFieldsValue())
        })
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  }

  copy = async id => {
    const { dispatch } = this.props
    const props = this.props

    await dispatch({
      type: 'listSearchProjects/copyT',
      payload: {
        id,
      },
    }).then(() => {
      getData(props, props.form.getFieldsValue())
    })
  }

  toggleStatus = async (id, status) => {
    const { dispatch } = this.props
    const props = this.props

    let msg = status ? '禁用' : '启用'
    await confirm({
      title: `确定${msg}该模版吗`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'listSearchProjects/putS',
          payload: {
            id,
            status: status ? 0 : 1,
          },
        }).then(() => {
          getData(props, props.form.getFieldsValue())
        })
      },
      onCancel() {
        console.log('取消操作');
      },
    });
  }

  filter(props) {
    dispatch({
      type: 'listSearchProjects/queryFilterList',
      payload: { ...props },
    });
  }

  async changeGrade(tag) {
    const { dispatch, form } = this.props;
    pageNo = 1
    await dispatch({
      type: 'listSearchProjects/fetch33',
      payload: {
        id: tag,
      },
    });
    form.setFieldsValue({ gradeList: this.props.listSearchProjects.grade3.map(item => item.id) })
  }

  render() {
    const {
      listSearchProjects: { list = {}, grade3 = [], staticData = {} },
      loading,
      form,
    } = this.props;
    const { subjectProductList = [], yearList = [], termMap = {} } = staticData
    const defaultSubject = subjectProductList.map(item => item.id)
    const { getFieldDecorator } = form;
    const cardList = list.list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={list.list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              title={item.title}
              cover={
                <img
                  alt={item.title}
                  src={item.previewImg || "http://diy-courseware.aixuexi.com/images/medium/missing.png"}
                />
              }
            >
              <Card.Meta
                title={<span className={styles.flex}>
                  <ConfigProvider autoInsertSpaceInButton={!this.state.flag}>
                    <Button size="small" target="_blank" href={`http://slide.aixuexi.com/player.html?deck=${item.deckUuid}`} disabled={!item.deckUuid}>查看</Button>
                    <Button size="small" onClick={() => this.editTemplate(item.id)}>编辑</Button>
                    <Button size="small" disabled={item.referenced} onClick={() => this.delete(item.id)}>删除</Button>
                    <Button size="small" disabled={item.referenced} onClick={() => this.toggleStatus(item.id, item.enabled)}>{item.enabled ? '禁用' : '启用'}</Button>
                    <Button size="small" onClick={() => this.copy(item.id)}>复制</Button></ConfigProvider></span>}
              />
            </Card>

          </List.Item>
        )}
      />
    ) : null;
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
    return (
      <div className={styles.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="学科"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('subjectList', {
                  initialValue: defaultSubject.slice(0, 1),
                })(
                  <TagSelect hideCheckAll radioable onChange={tag => this.changeGrade(tag)}>
                    {subjectProductList.map((item, index) => (
                      <TagSelect.Option value={item.id} key={index}>{item.name}</TagSelect.Option>
                    ))}
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow
              title="年级"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('gradeList', {
                  initialValue: grade3.map(item => item.id),
                })(
                  <TagSelect onChange={() => this.change()}>
                    {grade3.map((item, index) => (
                      <TagSelect.Option value={item.id} key={index}>{item.name}</TagSelect.Option>
                    ))}
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow
              title="学期"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('termMap', {
                  initialValue: Object.keys(termMap),
                })(
                  <TagSelect onChange={() => this.change()}>
                    {Object.keys(termMap).map((index, item) => (
                      <TagSelect.Option value={index} key={index}>{termMap[index]}</TagSelect.Option>
                    ))}
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow
              title="年份"
              block
              style={{
                paddingBottom: 11,
              }}
            >
              <FormItem>
                {getFieldDecorator('yearList', {
                  initialValue: yearList,
                })(
                  <TagSelect onChange={() => this.change()}>
                    {yearList.map((item, index) => (
                      <TagSelect.Option value={item} key={index}>{item}</TagSelect.Option>
                    ))}
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
                {getFieldDecorator('status', {
                  initialValue: ['0', '1'],
                })(
                  <TagSelect radioable onChange={() => this.change()}>
                    <TagSelect.Option value="1">启用中</TagSelect.Option>
                    <TagSelect.Option value="0">已禁用</TagSelect.Option>
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
          <Button icon="plus" shape="round" type="primary" onClick={() => this.showModal()}>
            新建
          </Button>
        </Card>
        {
          this.state.visible && (
            <Modal
              title="新建课程模版"
              visible={this.state.visible}
              onOk={this.handleCreate}
              onCancel={this.handleCancel}
              centered
            >
              <CreateFrom ref="getFormValue" ></CreateFrom>
            </Modal>)
        }

        <div className={styles.cardList}>{cardList}</div>
        <Pagination current={list.pageNum || 1} pageSize={list.pageSize || 1} onChange={this.onChange} total={list.itemTotal || 1} hideOnSinglePage={this.state.flag} />
      </div>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange(props, values) {
    getData(props, values)
  },
})(Projects);
export default connect(({ listSearchProjects, loading }) => ({
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))(WarpForm);
