
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

  onCreate = (e) => {
    let demo=this.refs.getFormValue;
    let form = {}
    demo.validateFields((err, values) => {
      if(!err){
        form = values;
      }
      let formData = new FormData()
      console.log(form)
      // form.file.fileList.forEach((file) => {
      //   formData.append('file', file)
      // })
      // formData.append('file', form.file)
      formData.append('title', form.title)
      formData.append('gradeList', form.gradeList.toString())
      formData.append('yearList', form.yearList.toString())
      formData.append('termList', form.termList.toString())
      formData.append('inverted', 1)
      formData.append('subjectProductId', form.subjectProductId.toString())
      console.log(formData)
      this.props.dispatch({
        type:'listSearchProjects/createT',
        payload:formData,
      })
    });
    
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