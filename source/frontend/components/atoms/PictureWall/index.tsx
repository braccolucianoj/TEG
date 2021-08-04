import React, { useEffect, useState } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

import { useTranslation } from '../../../i18n';
import commonText from '../../../services/i18n/_common';
import './pictureWall.style.scss';

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface IPictureWallProps {
  imageFile?: UploadFile;
  onUploadFinish?: (file: UploadFile | null) => void;
}

const handleDownload = (fileParm: UploadFile) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([fileParm.originFileObj]));
  link.setAttribute('download', fileParm.name);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export default ({ imageFile, onUploadFinish }: IPictureWallProps): JSX.Element => {
  const { t } = useTranslation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [previewTitle, setPreviewTitle] = useState('');
  const [file, setFile] = useState<UploadFile>();

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (fileParam: UploadFile) => {
    let preview;
    if (!fileParam.url && !fileParam.preview) {
      preview = await getBase64(fileParam.originFileObj);
    }
    setPreviewImage(fileParam.url || preview);
    setPreviewVisible(true);
    setPreviewTitle(fileParam.name || fileParam.url.substring(fileParam.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ file: fileParam }) => {
    if (fileParam.status === 'done') {
      setFile(fileParam);
    } else if (fileParam.status === 'error') {
      message.error(t(commonText.uploadFail_P, fileParam.name));
    }
  };

  const handleRemove = () => {
    setPreviewImage(undefined);
    setPreviewTitle('');
    setFile(undefined);
  };

  const handleBeforeUpload = (fileParam: RcFile): boolean => {
    const isLt2M = fileParam.size / 1024 / 1024 > 1;
    if (isLt2M) {
      message.error(t(commonText.uploadMaxSize));
      return false;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      if (file && onUploadFinish) {
        const preview = await getBase64(file.originFileObj);
        onUploadFinish({ ...file, preview });
      }
    })();
  }, [file]);

  useEffect(() => {
    if (imageFile) {
      setFile(imageFile);
      handlePreview(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <Upload
        className="pictureWall"
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        name="file"
        accept=".png, .jpg, .jpeg, .gif, .tiff"
        listType="picture-card"
        fileList={file ? [file as UploadFile] : []}
        multiple={false}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        onDownload={handleDownload}
        showUploadList={{ showDownloadIcon: true, showRemoveIcon: true, showPreviewIcon: true }}
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
        }}
        onRemove={handleRemove}
      >
        {!file && (
          <div className="fullWidth">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t(commonText.upload)}</div>
          </div>
        )}
      </Upload>
      <Modal closable footer={null} centered visible={previewVisible} title={previewTitle} onCancel={handleCancel}>
        <img alt="example" className="fullWidth" src={previewImage} />
      </Modal>
    </>
  );
};
