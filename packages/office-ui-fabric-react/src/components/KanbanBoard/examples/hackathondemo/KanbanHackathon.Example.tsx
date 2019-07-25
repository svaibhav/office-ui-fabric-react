import * as React from 'react';
import { KanbanBoard } from '../../KanbanBoard';
import { mergeStyleSets } from '@uifabric/styling';
import { ILaneColumn } from '../../KanbanBoard.types';
import { IItem } from './HackathonDemo';

interface IKanbanHackthonProps {
  items: IItem[];
  laneColumns: ILaneColumn[];
}
interface IKanbanHackthonState {}

const classNamesExample = mergeStyleSets({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: '70vh',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2);',
    transition: '0.3s'
  },
  laneItemBorder: {
    borderRadius: 5,
    padding: '5px',
    margin: '5px'
  },
  cardDetails: {
    padding: '2px 16px'
  }
});
export class KanbanHackthonExample extends React.Component<IKanbanHackthonProps, IKanbanHackthonState> {
  constructor(props: IKanbanHackthonProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { laneColumns } = this.props;
    return (
      <div className={classNamesExample.wrapper} data-is-scrollable={true}>
        <KanbanBoard
          laneColumns={laneColumns}
          getLaneItems={this._getLaneItems}
          getMoreLaneItems={this._getLaneItems}
          onRenderLaneItem={this._onRenderLaneItem}
        />
      </div>
    );
  }

  private _getLaneItems = (laneColumn: ILaneColumn) => {
    const { items } = this.props;
    return items.filter(item => item.color.toUpperCase() === laneColumn.name);
  };

  private _onRenderLaneItem(item?: IItem, index?: number) {
    return (
      <div className={classNamesExample.laneItemBorder} style={{ background: item!.color }}>
        <img src="https://a.tile.openstreetmap.se/hydda/full/15/16557/11403.png" style={{ width: '100%' }} />
        <div className={classNamesExample.cardDetails}>
          <h4>
            <b>{item!.name}</b>
          </h4>
        </div>
      </div>
    );
  }
}
