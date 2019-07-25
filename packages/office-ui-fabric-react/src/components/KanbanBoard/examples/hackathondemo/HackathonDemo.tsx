import * as React from 'react';
import { Toggle, IToggleStyles } from '../../../Toggle';
import { KanbanHackthonExample } from './KanbanHackathon.Example';
import { DetailsList, IDetailsList } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ILaneColumn } from '../../KanbanBoard.types';

export interface IItem {
  key: string;
  name: string;
  color: string;
}

interface IColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth: number;
}

interface IGroup {
  key: string;
  name: string;
  startIndex: number;
  count: number;
}

interface IHackathonDemoProps {}

interface IHackathonDemoState {
  isKanbanMode: boolean;
  items: IItem[];
  groups: IGroup[];
  columns: IColumn[];
  laneColumns: ILaneColumn[];
}

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '0 20px 20px 0' },
  label: { marginLeft: 10 }
};

export class HackathonDemo extends React.Component<IHackathonDemoProps, IHackathonDemoState> {
  private _root = React.createRef<IDetailsList>();
  private _locations: string[] = [
    'Seattle',
    'New York',
    'Chicago',
    'Los Angeles',
    'Portland',
    'Amherst',
    'Philadelphia',
    'Hawaii',
    'San Francisco',
    'Los Angels',
    'Las Vegas',
    'Denver',
    'New Jersey',
    'New Orleans',
    'Albaquerque',
    'Manhatten',
    'Miami',
    'Boston',
    'Long Island',
    'Nashville',
    'Memphis',
    'Kansas City',
    'Houston'
  ];
  private _colors = ['red', 'blue', 'green', 'yellow', 'black'];

  constructor(props: IHackathonDemoProps) {
    super(props);

    const { items, groups, columns, laneColumns } = this._bootstrapData();
    this.state = {
      isKanbanMode: false,
      items,
      groups,
      columns,
      laneColumns
    };
  }

  public render(): JSX.Element {
    const { isKanbanMode, items, groups, columns, laneColumns } = this.state;
    return (
      <div>
        <Toggle label="Kanban mode" inlineLabel checked={isKanbanMode} onChange={this._onChangeCompactMode} styles={toggleStyles} />
        {isKanbanMode ? (
          <KanbanHackthonExample items={items} laneColumns={laneColumns} />
        ) : (
          <DetailsList
            componentRef={this._root}
            items={items}
            groups={groups}
            columns={columns}
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            ariaLabelForSelectionColumn="Toggle selection"
            checkButtonAriaLabel="Row checkbox"
            groupProps={{
              showEmptyGroups: true
            }}
          />
        )}
      </div>
    );
  }

  private _onChangeCompactMode = () => {
    const { isKanbanMode } = this.state;
    this.setState({
      isKanbanMode: !isKanbanMode
    });
  };

  private _bootstrapData = () => {
    const items: IItem[] = this._getItems().sort((item1, item2) => {
      return item1.color === item2.color ? 0 : item1.color < item2.color ? -1 : 1;
    });
    const groups: IGroup[] = this._getGroups(items);
    const laneColumns: ILaneColumn[] = groups.map(group => {
      return {
        name: group.name,
        key: `lane_column_${group.name}`
      };
    });
    const columns: IColumn[] = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
      { key: 'color', name: 'Color', fieldName: 'color', minWidth: 100, maxWidth: 200 }
    ];
    return { items, groups, columns, laneColumns };
  };

  private _getGroups = (_items: IItem[]): IGroup[] => {
    const items = _items || this.state.items;
    const groups: IGroup[] = [];
    let _count: number = 1;
    let _group: string = '';
    let _startIndex: number = 0;
    items.forEach((item, index) => {
      if (!_group || _group !== item.color) {
        if (_group) {
          groups.push({
            key: `group_key_${index}`,
            startIndex: _startIndex,
            count: _count,
            name: _group.toUpperCase()
          });
          _startIndex = index;
        }
        _count = 1;
        _group = item.color;
      } else {
        _count++;
      }
    });
    groups.push({
      key: `group_key_last`,
      startIndex: _startIndex,
      count: _count,
      name: items[items.length - 1].color.toUpperCase()
    });
    return groups;
  };

  private _getItems = (): IItem[] => {
    return this._locations.map((location, index) => {
      return {
        key: `item_key_${index}`,
        name: location,
        color: this._colors[Math.floor(Math.random() * this._colors.length)]
      };
    });
  };
}
