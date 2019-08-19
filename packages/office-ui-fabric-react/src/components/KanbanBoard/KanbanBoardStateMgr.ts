import { ILaneColumn } from './KanbanBoard.types';

export class KanbanBoardStateMgr {
  private _items: any[];
  constructor(items: any[]) {
    this._items = items;
  }

  public getLaneItems = (laneColumn: ILaneColumn) => {
    return this._items.filter(item => item.population === laneColumn.name);
  };

  public getAllItems() {
    return this._items.slice();
  }

  public deleteItem = (itemId: string) => {
    const index = this.findWithAttr(this._items, 'id', itemId);
    this._items.splice(index, 1);
  };

  public moveItem = (item: any, sourceCol: any, destinationCol: any): void => {
    const index = this.findWithAttr(this._items, 'id', item.id);
    this._items[index].population = destinationCol;
  };

  public addItem = (item: any) => {
    this._items.push(item);
  };

  private findWithAttr(array: any[], attr: string, value: any) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
