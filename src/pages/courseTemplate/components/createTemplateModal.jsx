
import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { CreateFrom } from './createForm';
import { connect } from 'dva';
@connect(({ listSearchProjects, loading }) => ({  
  listSearchProjects,
  loading: loading.models.listSearchProjects,
}))
class CreateTemplateModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onCreate = () => {
    let demo=this.refs.getFormValue;
    let form = {}
    demo.validateFields((err, values) => {
      if(!err){
        form = values;
      }
      let formData = new FormData()
      if(form.file){
        form.file.fileList.forEach((fileBlob) => {
          formData.append('file', fileBlob.originFileObj)
        })
      }
      formData.append('title', form.title)
      formData.append('gradeList', form.gradeList.toString())
      formData.append('yearList', form.yearList.toString())
      formData.append('termList', form.termList.toString())
      formData.append('inverted', form.inverted ? 1 : 0)
      formData.append('subjectProductId', form.subjectProductId.toString())
      this.props.dispatch({
        type:'listSearchProjects/createT',
        payload:formData,
      });
    })
  }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;

    return (
      <div>
        <Modal
          title="新建课程模版"
          visible={visible}
          onOk={this.onCreate}
          onCancel={onCancel}
          centered
          wrapped
        >
          <CreateFrom ref="getFormValue" ></CreateFrom>
        </Modal>
      </div>
    );
  }
}

export default CreateTemplateModal