import * as React from 'react';
import { KanbanBoard } from '../../KanbanBoard';
import { mergeStyleSets } from '@uifabric/styling';
import { ILaneColumn } from '../../KanbanBoard.types';
import { IItem } from './HackathonDemo';
import { KanbanBoardStateMgr } from '../../KanbanBoardStateMgr';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/components/Image';

interface IKanbanHackthonProps {
  items: IItem[];
  laneColumns: ILaneColumn[];
  updatItems: (items: any[]) => void;
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
    padding: '2px 16px',
    textAlign: 'center'
  }
});
export class KanbanHackthonExample extends React.Component<IKanbanHackthonProps, IKanbanHackthonState> {
  private _kanbanBoardStateMgr: KanbanBoardStateMgr;
  constructor(props: IKanbanHackthonProps) {
    super(props);
    this._kanbanBoardStateMgr = new KanbanBoardStateMgr(props.items!);
  }

  public componentWillUnmount() {
    this.props.updatItems(this._kanbanBoardStateMgr.getAllItems());
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
          kanbanBoardStatemgr={this._kanbanBoardStateMgr}
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
      <div className={classNamesExample.laneItemBorder} style={{ background: item!.code, border: '2px solid' }}>
        <Image src={item!.flag} width={'100%'} height={100} imageFit={ImageFit.cover} />
        <hr color={'#000'} />
        <h4>
          <Label className={classNamesExample.cardDetails}>{item!.name}</Label>
        </h4>
      </div>
    );
  }
}
