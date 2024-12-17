import React from 'react';
import { Card, Button, Upload, Space, message } from 'antd';
import { DownloadOutlined, DeleteOutlined, ClearOutlined, UploadOutlined } from '@ant-design/icons';
import {fakeUpload, downloadJSON, jsonFileUpload } from '../utils';

const ButtonsBlock = ({boxes,selectedBox, isBoardEmty, deleteElement, onReset, onUploadFileSuccess}) => {
  const onFileUpload = (info) => {
    const onSuccess = (data) => {
      onUploadFileSuccess(data);
    };

    const onError = (err) => {
      message.error({ content: err });
    };

    jsonFileUpload(info, onSuccess, onError);
  };

  return (
    <Card>
      <Space wrap>
        <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadJSON(boxes)} disabled={isBoardEmty}>
          Скачать схему
        </Button>
        <Upload accept=".json" action="/upload" onChange={onFileUpload} customRequest={fakeUpload}>
          <Button icon={<UploadOutlined />}>Загрузить схему</Button>
        </Upload>
        <Button type="danger" icon={<ClearOutlined />} onClick={onReset} disabled={isBoardEmty}>
          Удалить все
        </Button>
        <Button
          type="danger"
          ghost
          icon={<DeleteOutlined />}
          disabled={selectedBox ? false : true}
          onClick={deleteElement}>
          Удалить элемент
        </Button>
      </Space>
    </Card>
  )
};

export default ButtonsBlock;