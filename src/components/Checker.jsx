import React from 'react';

import { DragSource } from 'react-dnd';

const checkerSource = {
  beginDrag(props) {
    return props.checker;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function Checker(props) {
  const { isDragging, connectDragSource, checker } = props;
  const opacity = isDragging ? 0 : 1;
  return connectDragSource(
    <img style={{opacity}} className='field-img' src={props.src} alt='' />
  );
}

export default DragSource('checker', checkerSource, collect)(Checker);