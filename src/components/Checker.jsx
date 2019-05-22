import React from 'react';

import { DragSource } from 'react-dnd';

const checkerSource = {
  beginDrag(props, monitor, component) {

    props.highlightTargets(props.checker, props.data);
    return props.checker;

  },
  endDrag(props, monitor, component) {
    props.highlightTargets(props.checker, props.data, true);
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
  const opacity = isDragging ? .5 : 1;

  return connectDragSource(
    <img style={{opacity}} className='field-img' src={props.src} alt='' />
  );
}

export default DragSource('checker', checkerSource, collect)(Checker);