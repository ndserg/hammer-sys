import React, { useState } from 'react';
import update from 'immutability-helper';
import { Row, Col } from 'antd';
import ConstructorItems from './components/constructorItems';
import ActiveBlockEditor from './components/activeBlockEditor';
import ButtonsBlock from './components/buttonsBlock';
import InteractiveMap from './components/interactiveMap';

const Sheduler = () => {
  const [boxes, setBoxes] = useState({});
  const [selectedBox, setSelectedBox] = useState(null);

  const isBoardEmty = Object.keys(boxes).length === 0;
  const isEditBlockDisabled = selectedBox && !boxes[selectedBox]?.isBlocked ? false : true;

  const onSelectItem = (item) => {
    if (item.target.dataset?.box) {
      setSelectedBox(item.target.dataset.box)
    } else {
      setSelectedBox(null)
    }
  };

  const onItemParamsChange = (evt) => {
    const { value, action } = evt;

    setBoxes(
      update(boxes, {
        [selectedBox]: {
          $merge: { [action]: value},
        },
      }),
    );
  };

  const onTemplateItemSelect = (item) => {
    const uniqId = Date.now();
    const newItem = {
      [uniqId]: {
        ...item,
        top: 20,
        left: 20,
        angle: 0,
        zIndex: 0,
        isBlocked: false
      }
    };

    setBoxes((prevState) => ({...prevState, ...newItem}));
    setSelectedBox(uniqId);
  };

  const onReset = () => {
    setBoxes({});
    setSelectedBox(null);
  };

  const deleteElement = () => {
    const slectedBoxId = selectedBox;

    setSelectedBox(null);

    setBoxes((prevState) => {
      delete prevState[slectedBoxId]

      return prevState;
    });
  };

  const onUploadFileSuccess = (data) => {
    setBoxes(data);
  };

  const onBlockBoxEdit = () => {
    setBoxes(
      update(boxes, {
        [selectedBox]: {
          $merge: { isBlocked: !boxes[selectedBox].isBlocked},
        },
      }),
    );
  }

  const onDrop = (itemIdx, data) => {
    setBoxes(
      update(boxes, {
        [itemIdx]: {
          $merge: data,
        },
      }),
    );
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <ConstructorItems onTemplateItemSelect={onTemplateItemSelect}/>
        <ActiveBlockEditor
          boxes={boxes}
          selectedBox={selectedBox}
          onBlockBoxEdit={onBlockBoxEdit}
          isEditBlockDisabled={isEditBlockDisabled}
          onItemParamsChange={onItemParamsChange}
        />
        <ButtonsBlock
          boxes={boxes}
          selectedBox={selectedBox}
          deleteElement={deleteElement}
          isBoardEmty={isBoardEmty}
          onReset={onReset}
          onUploadFileSuccess={onUploadFileSuccess}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <InteractiveMap boxes={boxes} selectedBox={selectedBox} onSelectItem={onSelectItem} onDrop={onDrop}/>
      </Col>
    </Row>
  )
}

export default Sheduler;
