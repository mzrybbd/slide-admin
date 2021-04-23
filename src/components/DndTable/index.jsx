
import React from 'react';
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.less'

// https://codesandbox.io/s/b6qic?file=/index.js

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, draggable, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = draggable ? { ...restProps.style, cursor: 'move' } : restProps.style;

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
      id: props.id
    };
  },
  canDrag(props) {
    return props.draggable
  }
};

const rowTarget = {
  drop(props, monitor) {
    
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    const dragId = monitor.getItem().id;
    props.moveRow(dragId, dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = 
  DropTarget(
    'row',
    rowTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    })
  )
  (
    DragSource(
      'row', 
      rowSource,
      connect => ({
        connectDragSource: connect.dragSource(),
      })
    )
    (BodyRow),
  );


class DndTable extends React.Component {
  
  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (drageId, dragIndex, hoverIndex) => {
    this.props.onRowDrop(drageId, dragIndex, hoverIndex)
  };

  render() {
    const { draggable = true } = this.props

    return (
      <DndProvider backend={HTML5Backend}>
        <Table 
          {...this.props}
          components={this.components}
          onRow={(record, index) => ({
            moveRow: this.moveRow,
            id: record.id,
            draggable,
            index,
          })}
        />
      </DndProvider>
    );
  }
}

export default DndTable 