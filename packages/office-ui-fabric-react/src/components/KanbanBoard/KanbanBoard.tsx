import * as React from 'react';
import { IKanbanBoardProps, IKanbanLaneProps, IKanbanLaneState, IKanbanLaneItemProps } from './KanbanBoard.types';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { List } from 'office-ui-fabric-react/lib/List';
import { css } from 'office-ui-fabric-react';
import { DefaultButton } from '../Button';
import {
  DragDropContextProvider,
  DragSourceSpec,
  DragSourceMonitor,
  DropTargetSpec,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSource,
  DropTarget,
  XYCoord
} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { findDOMNode } from 'react-dom';

const classNames = mergeStyleSets({
  kanbanContainer: {
    display: 'flex',
    direction: 'column',
    overflowY: 'hidden',
    overflowX: 'auto',
    height: 'inherit'
  },
  kanbanLaneColumn: {
    position: 'relative',
    top: 0,
    margin: '5px',
    textAlign: 'center',
    overflow: 'hidden'
  },
  laneListWrapper: {
    overflowY: 'auto',
    maxHeight: '95%',
    overflowX: 'hidden'
  },
  fetchItemsButton: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  laneItem: {
    overflow: 'hidden'
  },
  laneWrapper: {
    // border: '1px dashed'
    backgroundColor: '#0000001A',
    borderRadius: 5,
    margin: 2
  },
  dragStart: {
    backgroundColor: 'grey'
  },
  onHover: {
    transform: 'translate3d(0,0,0,)',
    backgroundColor: 'grey'
  }
});

const DRAG_TYPE = {
  CARD: 'card'
};

export class KanbanBoard extends React.Component<IKanbanBoardProps> {
  constructor(props: IKanbanBoardProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={classNames.kanbanContainer}>
          {this.props.laneColumns.map(laneColumn => (
            <KanbanLane
              {...this.props}
              laneColumn={laneColumn}
              key={laneColumn.key}
              //  items={this.props.getLaneItems && this.props.getLaneItems(laneColumn, this.props.items)}
              kanbanBoardStatemgr={this.props.kanbanBoardStatemgr}
              updateParent={this._update}
            />
          ))}
        </div>
      </DragDropContextProvider>
    );
  }

  private _update() {
    this.forceUpdate();
  }
}
class KanbanLane extends React.PureComponent<IKanbanLaneProps, IKanbanLaneState> {
  private _laneColumnWidth: string = '200px';
  constructor(props: IKanbanLaneProps) {
    super(props);
    this._laneColumnWidth = (props.laneColumn.width && props.laneColumn.width.toString() + 'px') || this._laneColumnWidth;
    this.state = {
      items: props.kanbanBoardStatemgr!.getLaneItems(this.props.laneColumn)
    };
  }
  public render(): JSX.Element {
    const laneWrapperStyle = { width: this._laneColumnWidth };
    const { laneColumn, fetchMore } = this.props;
    return (
      <div style={laneWrapperStyle} className={classNames.laneWrapper}>
        {this._onRenderLaneColumn()}
        <div className={classNames.laneListWrapper}>
          <List items={this.state.items} onRenderCell={this._onRenderLaneItem} />
          {fetchMore && <DefaultButton primary text={`${laneColumn.name}`} onClick={this._fetchItems} style={{ margin: 5 }} />}
        </div>
      </div>
    );
  }

  private _fetchItems = () => {
    const { kanbanBoardStatemgr, laneColumn } = this.props;
    const newItems = (kanbanBoardStatemgr!.getLaneItems && kanbanBoardStatemgr!.getLaneItems(laneColumn)) || [];
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return { items: newItems };
    });
  };

  private _onRenderLaneItem = (item?: any, index?: number): JSX.Element => {
    const { onRenderLaneItem, laneColumn } = this.props;
    // return <div className={classNames.laneItem}>{onRenderLaneItem && onRenderLaneItem(item, index)}</div>;
    return (
      <DragDroppableListItem
        item={item}
        index={index}
        onRenderLaneItem={onRenderLaneItem}
        moveItem={this._moveItem}
        parentLaneKey={this.props.laneColumn.key}
        ParentLaneColumn={laneColumn}
        updateLane={this._updateLane}
      />
    );
  };

  private _onRenderLaneColumn() {
    const { onRenderLaneColumn, laneColumn } = this.props;
    return (
      <div className={classNames.kanbanLaneColumn}>
        {onRenderLaneColumn ? onRenderLaneColumn : <div className={classNames.kanbanLaneColumn}>{laneColumn.name}</div>}
      </div>
    );
  }

  private _moveItem = (itemId: any, sourceCol: any, destinationCol: any, sourceInx: any, destInx: any): void => {
    const { kanbanBoardStatemgr, laneColumn } = this.props;

    kanbanBoardStatemgr.moveItem(itemId, sourceCol, destinationCol, sourceInx, destInx);

    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return { items: kanbanBoardStatemgr.getLaneItems(laneColumn) };
    });
  };

  private _updateLane = () => {
    const { kanbanBoardStatemgr, laneColumn } = this.props;
    // const items = this.state.items.slice();
    // items.splice(index, 0, item);
    this.setState(state => {
      // Important: read `state` instead of `this.state` when updating.
      return { items: kanbanBoardStatemgr.getLaneItems(laneColumn) };
    });
  };
}

class KanbanLaneItem extends React.PureComponent<IKanbanLaneItemProps> {
  constructor(props: IKanbanLaneItemProps) {
    super(props);
  }
  public render(): JSX.Element {
    const { onRenderLaneItem, item, index, connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver } = this.props;
    return connectDropTarget(
      connectDragPreview(
        connectDragSource(
          <div className={css(classNames.laneItem, isOver ? classNames.onHover : '')} style={{ opacity: isDragging ? 0 : 1 }}>
            {onRenderLaneItem && onRenderLaneItem(item, index)}
          </div>
        )
      )
    );
  }
}

const dragSourceSpec: DragSourceSpec<any, any> = {
  beginDrag(props: IKanbanLaneItemProps, monitor: DragSourceMonitor, component: React.Component): any {
    console.log('Drag started');
    return {
      index: props.index,
      dragItem: props.item,
      dragItemParentLaneKey: props.parentLaneKey,
      itemId: props.item.id,
      dragItemParentLane: props.ParentLaneColumn
    };
  },

  endDrag(props: IKanbanLaneItemProps, monitor: DragSourceMonitor, component: React.Component): void {
    if (monitor.didDrop()) {
      console.log('Drag end delete item: ', monitor.getItem().index);
      console.log('monitor.getItem().destinationIndex: ', monitor.getItem().destinationIndex);
    }
    props.updateLane();
    console.log('Drag end');
  }
};

const dropTargetSpec: DropTargetSpec<any> = {
  drop(props: IKanbanLaneItemProps, monitor: DropTargetMonitor, component: React.Component): any {
    // const draggedItem = monitor.getItem();
    console.log('Drop event add item: ', props.index);
    console.log('Drop event moveitem');
    props.moveItem(
      monitor.getItem().dragItem,
      monitor.getItem().dragItemParentLane.name.toUpperCase(),
      props.ParentLaneColumn.name.toUpperCase(),
      monitor.getItem().index,
      props.index
    );

    return { dropTargetParentLaneKey: props.parentLaneKey };
    console.log('Drop event');
  },

  hover(props: IKanbanLaneItemProps, monitor: DropTargetMonitor, component: React.Component): void {
    // console.log("onHover");
    const item = monitor.getItem();
    const dragIndex = item.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const componentNode = findDOMNode(component) as HTMLElement;
    const hoverBoundingRect = componentNode.getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

    if (hoverClientY > hoverMiddleY) {
      monitor.getItem().destinationIndex = props.index + 1;
    } else {
      monitor.getItem().destinationIndex = props.index;
    }

    console.log('Moing item in hover from ', dragIndex, ' to:  ', hoverIndex);
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor, props: any): any {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const DraggableListItem = DragSource(DRAG_TYPE.CARD, dragSourceSpec, collect)(KanbanLaneItem);

function collectDropTargetProps(connect: DropTargetConnector, monitor: DropTargetMonitor, props: any): any {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const DragDroppableListItem = DropTarget(DRAG_TYPE.CARD, dropTargetSpec, collectDropTargetProps)(DraggableListItem);
