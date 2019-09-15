import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('封面图必须小于10MB!');
  }
  return false;
}
const fileprops = {
  accept: 'image/*',
  
  onRemove: file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  },
  beforeUpload: file => {
    this.setState(state => ({
      fileList: [...state.fileList, file],
    }));
    return false;
  },
  onChange(info) {
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
  },
};

class CoverPage extends React.Component {

  static getDerivedStateFromProps(props) {
    if (props.imageUrl) {
      return {
        imageUrl: props.imageUrl,
      }
    }
    return {}
  };

  state = {
    imageUrl: this.props.imageUrl,
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        accept="image/*"
        name="coverPage"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action=""
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default CoverPage          