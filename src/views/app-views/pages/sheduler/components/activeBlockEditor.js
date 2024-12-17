import React from 'react';
import { Card, Switch, InputNumber, Space } from 'antd';

const inputTypes = {
  left: "X",
  top: "Y",
  angle: "Угол",
  width: "Ширина",
  height: "Высота",
  zIndex: "Слой"
};

const ActiveBlockEditor = ({boxes, selectedBox, onBlockBoxEdit, isEditBlockDisabled, onItemParamsChange}) => {

  return (
    <Card
      title="Параметры элемента"
      extra={
      <>
        <span>Заблокировать </span>
        <Switch onChange={onBlockBoxEdit} checked={boxes[selectedBox]?.isBlocked} disabled={selectedBox ? false : true} />
      </>
      }>
      <Space wrap>
        {Object.keys(inputTypes).map((key) =>
          <InputNumber key={key} min={0} max={1000} defaultValue={0} value={selectedBox ? boxes[selectedBox][key] : 0} addonBefore={inputTypes[key]}
          disabled={isEditBlockDisabled} onChange={(value, action=key) => onItemParamsChange({value, action})} />
        )}
      </Space>
    </Card>
  )
};

export default ActiveBlockEditor;
