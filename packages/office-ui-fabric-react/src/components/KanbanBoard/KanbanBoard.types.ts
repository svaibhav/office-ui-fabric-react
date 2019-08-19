import { KanbanBoardStateMgr } from './KanbanBoardStateMgr';

export interface ILaneColumn {
  name: string;
  key: string;
  width?: number;
}
export interface IKanbanBoardProps {
  laneColumns: ILaneColumn[];
  onRenderLaneItem?: (item?: any, index?: number) => any;
  onRenderLaneColumn?: (laneColumn: ILaneColumn) => any;
  items?: any[];
  getMoreLaneItems?: (laneColumn: ILaneColumn) => any[];
  getLaneItems?: (laneColumn: ILaneColumn, items?: any[]) => any[] | undefined;
  kanbanBoardStatemgr: KanbanBoardStateMgr;
}
export interface IKanbanLaneProps {
  laneColumn: ILaneColumn;
  onRenderLaneItem?: (item?: any, index?: number) => any;
  onRenderLaneColumn?: (laneColumn: ILaneColumn) => any;
  items?: any[];
  getMoreLaneItems?: (laneColumn: ILaneColumn) => any[];
  kanbanBoardStatemgr: KanbanBoardStateMgr;
  updateParent: () => void;
}
export interface IKanbanLaneState {
  items: any[];
}

export interface IKanbanLaneItemProps {
  onRenderLaneItem?: (item?: any, index?: number) => any;
  ParentLaneColumn: ILaneColumn;
  item: any;
  index: any;
  connectDragSource?: any;
  connectDropTarget?: any;
  connectDragPreview?: any;
  deleteItem?: (index: any) => any;
  addItem?: (item: any) => void;
  moveItem: (item: any, sourceCol: any, destinationCol: any, sourceInx: any, destInx: any) => void;
  updateLane: () => void;
  isDragging?: boolean;
  isOver?: boolean;
  parentLaneKey: string;
}
