import { ILaneColumn } from './KanbanBoard.types';
// import { string } from 'prop-types';
// import { item } from '../OverflowSet/OverflowSet.scss';

export class KanbanBoardStateMgr {
  private _items: any[];
  private _lanes = new Map<string, any>();
  constructor(items: any[]) {
    this._items = items;
  }

  public getLaneItems = (laneColumn: ILaneColumn) => {
    if (!this._lanes.get(laneColumn.name.toUpperCase())) {
      this._lanes.set(
        laneColumn.name.toUpperCase().toString(),
        this._items.filter(item => item.color.toUpperCase() === laneColumn.name.toUpperCase())
      );
    }
    // return this._items.filter(item => item.color.toUpperCase() === laneColumn.name.toUpperCase());
    return this._lanes.get(laneColumn.name.toUpperCase()).slice();
  };

  public getAllItems() {
    let items: any[] = [];
    let values = Array.from(this._lanes.values());
    // @ts-ignore
    for (let value of values) {
      items = items.concat(value);
    }

    return items;
  }

  public deleteItem = (itemId: string, mapKey: string) => {
    let laneItems = this._lanes.get(mapKey);
    const index = this.findWithAttr(laneItems, 'id', itemId);
    laneItems.splice(index, 1);
    this._lanes.set(mapKey, laneItems);
  };

  public moveItem = (item: any, sourceCol: any, destinationCol: any, sourceInx: any, destInx: any): void => {
    if (sourceCol == destinationCol) {
      this.moveItemInArray(sourceCol, sourceInx, destInx);
    } else {
      this.deleteItem(item.id, sourceCol);
      item.color = destinationCol.toUpperCase();
      this.addItem(item, destinationCol, destInx);
    }
  };

  public moveItemInArray(mapKey: string, sourceIndex: any, destinationIndex: any): void {
    const items: any[] = this._lanes.get(mapKey);
    const itemToMove = items[sourceIndex];
    //remove rule at currentIndex
    items.splice(sourceIndex, 1);
    if (sourceIndex < destinationIndex) {
      destinationIndex = destinationIndex - 1;
    }
    //insert rule at moveToIndex
    items.splice(destinationIndex, 0, itemToMove);
    this._lanes.set(mapKey, items);
  }

  public addItem = (item: any, mapKey: string, index: any) => {
    let laneItems = this._lanes.get(mapKey);
    laneItems.splice(index, 0, item);
    this._lanes.set(mapKey, laneItems);
  };

  private findWithAttr(array: any[], attr: string, value: any) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
}
