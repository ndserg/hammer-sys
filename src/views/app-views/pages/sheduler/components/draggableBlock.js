import React from "react";
import { useDrag } from "react-dnd";

const  DraggableBlock = ({ boxId, box, isDraggable, isSelected }) => {
  const { img, width, height, top, left, angle, zIndex } = box;
  const boxShadowSelected = isSelected ? 'inset green 0px 0px 60px -12px' : 'none';

  const [{ isDragging }, drag] = useDrag({
    item: {index: boxId, type: "block"},
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div
      ref={drag}
      data-box={boxId}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        boxShadow: boxShadowSelected,
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        zIndex: zIndex,
        transform: `translate(${left}px, ${top}px) rotate(${angle}deg)`
      }}
    >
    </div>
  );
}

export default DraggableBlock;
