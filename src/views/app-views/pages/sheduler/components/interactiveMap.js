import React, {useState} from 'react';
import { Card, Switch } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrop } from "react-dnd";
import DraggableBlock from './draggableBlock';
import styles from '../styles/Sheduler.module.css';

const InteractiveMap = ({ boxes, selectedBox, onDrop, onSelectItem }) => {
  const [showGrid, setshowGrid] = useState(true);

  const onBoardGridSwitch = () => {
    setshowGrid((prevState) => !prevState);
  }

  const dropHandler = (item, monitor) => {
    const itemIdx = item.index;
    const delta = monitor.getDifferenceFromInitialOffset();
    const data = {left: 0, top: 0};
    data.top = Math.round(boxes[itemIdx].top + delta.y);
    data.left = Math.round(boxes[itemIdx].left + delta.x);
    

    onDrop(itemIdx, data)
  };

  const [, drop] = useDrop({
    accept: "block",
    drop: (item, monitor) => dropHandler(item, monitor),
  });

  return (
    <Card
      title="Карта заведения"
      extra={
        <>
          <span>Сетка </span>
          <Switch onChange={onBoardGridSwitch} checked={showGrid}/>
        </>
      }
      style={{height: '100%'}}
    >
      <div className={showGrid ? `${styles.boardWrapper} ${styles.boardGrid}` : styles.boardWrapper}>
        <Scrollbars autoHide>
          <div className={styles.board} ref={drop} onMouseDown={onSelectItem}>
            {Object.keys(boxes).length > 0 && 
                Object.keys(boxes).map((key) => 
                  <DraggableBlock
                    key={key}
                    boxId={key}
                    box={boxes[key]}
                    isDraggable={!boxes[key].isBlocked}
                    isSelected={key === selectedBox}
                  />
                )
              }
          </div>
        </Scrollbars>
      </div>
    </Card>
  )
};

export default InteractiveMap;
