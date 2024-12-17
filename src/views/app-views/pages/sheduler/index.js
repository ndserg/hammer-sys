import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sheduler from './sheduler';


const ShedulerApp = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Sheduler />
    </DndProvider>
  )
}

export default ShedulerApp;