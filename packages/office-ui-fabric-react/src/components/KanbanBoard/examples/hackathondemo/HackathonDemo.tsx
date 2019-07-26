import * as React from 'react';
import { Toggle, IToggleStyles } from '../../../Toggle';
import { KanbanHackthonExample } from './KanbanHackathon.Example';
import { DetailsList, IDetailsList } from 'office-ui-fabric-react/lib/components/DetailsList';
import { ILaneColumn } from '../../KanbanBoard.types';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/components/Image';

export interface IItem {
  key: string;
  name: string;
  flag: string;
  code: string;
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
  columns: IColumn[];
}

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '0 20px 20px 0' },
  label: { marginLeft: 10 }
};

export class HackathonDemo extends React.Component<IHackathonDemoProps, IHackathonDemoState> {
  private _root = React.createRef<IDetailsList>();
  private _locations: { name: string; flag: string; id: string }[] = [
    {
      name: 'Alabama',
      flag: '//usa.fmcdn.net/data/flags/h80/al.png'
    },
    {
      name: 'Alaska',
      flag: '//usa.fmcdn.net/data/flags/h80/ak.png'
    },
    {
      name: 'Arizona',
      flag: '//usa.fmcdn.net/data/flags/h80/az.png'
    },
    {
      name: 'Arkansas',
      flag: '//usa.fmcdn.net/data/flags/h80/ar.png'
    },
    {
      name: 'California',
      flag: '//usa.fmcdn.net/data/flags/h80/ca.png'
    },
    {
      name: 'Colorado',
      flag: '//usa.fmcdn.net/data/flags/h80/co.png'
    },
    {
      name: 'Connecticut',
      flag: '//usa.fmcdn.net/data/flags/h80/ct.png'
    },
    {
      name: 'Delaware',
      flag: '//usa.fmcdn.net/data/flags/h80/de.png'
    },
    {
      name: 'Florida',
      flag: '//usa.fmcdn.net/data/flags/h80/fl.png'
    },
    {
      name: 'Georgia',
      flag: '//usa.fmcdn.net/data/flags/h80/ga.png'
    },
    {
      name: 'Hawaii',
      flag: '//usa.fmcdn.net/data/flags/h80/hi.png'
    },
    {
      name: 'Idaho',
      flag: '//usa.fmcdn.net/data/flags/h80/id.png'
    },
    {
      name: 'Illinois',
      flag: '//usa.fmcdn.net/data/flags/h80/il.png'
    },
    {
      name: 'Indiana',
      flag: '//usa.fmcdn.net/data/flags/h80/in.png'
    },
    {
      name: 'Iowa',
      flag: '//usa.fmcdn.net/data/flags/h80/ia.png'
    },
    {
      name: 'Kansas',
      flag: '//usa.fmcdn.net/data/flags/h80/ks.png'
    },
    {
      name: 'Kentucky',
      flag: '//usa.fmcdn.net/data/flags/h80/ky.png'
    },
    {
      name: 'Louisiana',
      flag: '//usa.fmcdn.net/data/flags/h80/la.png'
    },
    {
      name: 'Maine',
      flag: '//usa.fmcdn.net/data/flags/h80/me.png'
    },
    {
      name: 'Maryland',
      flag: '//usa.fmcdn.net/data/flags/h80/md.png'
    },
    {
      name: 'Massachusetts',
      flag: '//usa.fmcdn.net/data/flags/h80/ma.png'
    },
    {
      name: 'Michigan',
      flag: '//usa.fmcdn.net/data/flags/h80/mi.png'
    },
    {
      name: 'Minnesota',
      flag: '//usa.fmcdn.net/data/flags/h80/mn.png'
    },
    {
      name: 'Mississippi',
      flag: '//usa.fmcdn.net/data/flags/h80/ms.png'
    },
    {
      name: 'Missouri',
      flag: '//usa.fmcdn.net/data/flags/h80/mo.png'
    },
    {
      name: 'Montana',
      flag: '//usa.fmcdn.net/data/flags/h80/mt.png'
    },
    {
      name: 'Nebraska',
      flag: '//usa.fmcdn.net/data/flags/h80/ne.png'
    },
    {
      name: 'Nevada',
      flag: '//usa.fmcdn.net/data/flags/h80/nv.png'
    },
    {
      name: 'New Hampshire',
      flag: '//usa.fmcdn.net/data/flags/h80/nh.png'
    },
    {
      name: 'New Jersey',
      flag: '//usa.fmcdn.net/data/flags/h80/nj.png'
    },
    {
      name: 'New Mexico',
      flag: '//usa.fmcdn.net/data/flags/h80/nm.png'
    },
    {
      name: 'New York',
      flag: '//usa.fmcdn.net/data/flags/h80/ny.png'
    },
    {
      name: 'North Carolina',
      flag: '//usa.fmcdn.net/data/flags/h80/nc.png'
    },
    {
      name: 'North Dakota',
      flag: '//usa.fmcdn.net/data/flags/h80/nd.png'
    },
    {
      name: 'Ohio',
      flag: '//usa.fmcdn.net/data/flags/h80/oh.png'
    },
    {
      name: 'Oklahoma',
      flag: '//usa.fmcdn.net/data/flags/h80/ok.png'
    },
    {
      name: 'Oregon',
      flag: '//usa.fmcdn.net/data/flags/h80/or.png'
    },
    {
      name: 'Pennsylvania',
      flag: '//usa.fmcdn.net/data/flags/h80/pa.png'
    },
    {
      name: 'Rhode Island',
      flag: '//usa.fmcdn.net/data/flags/h80/ri.png'
    },
    {
      name: 'South Carolina',
      flag: '//usa.fmcdn.net/data/flags/h80/sc.png'
    },
    {
      name: 'South Dakota',
      flag: '//usa.fmcdn.net/data/flags/h80/sd.png'
    },
    {
      name: 'Tennessee',
      flag: '//usa.fmcdn.net/data/flags/h80/tn.png'
    },
    {
      name: 'Texas',
      flag: '//usa.fmcdn.net/data/flags/h80/tx.png'
    },
    {
      name: 'Utah',
      flag: '//usa.fmcdn.net/data/flags/h80/ut.png'
    },
    {
      name: 'Vermont',
      flag: '//usa.fmcdn.net/data/flags/h80/vt.png'
    },
    {
      name: 'Virginia',
      flag: '//usa.fmcdn.net/data/flags/h80/va.png'
    },
    {
      name: 'Washington',
      flag: '//usa.fmcdn.net/data/flags/h80/wa.png'
    },
    {
      name: 'West Virginia',
      flag: '//usa.fmcdn.net/data/flags/h80/wv.png'
    },
    {
      name: 'Wisconsin',
      flag: '//usa.fmcdn.net/data/flags/h80/wi.png'
    },
    {
      name: 'Wyoming',
      flag: '//usa.fmcdn.net/data/flags/h80/wy.png'
    }
  ].map((item, idx) => {
    return { id: `index_${idx}`, ...item };
  });
  private _colors = [
    { code: '#FFA07A', color: 'salmon' },
    { code: '#AFEEEE', color: 'blue' },
    { code: '#98FB98', color: 'green' },
    { code: '#FFD700', color: 'yellow' },
    { code: '#7B68EE', color: 'indigo' },
    { code: '#FAEBD7', color: 'white' },
    { code: '#FFB6C1', color: 'pink' },
    { code: '#FFA500', color: 'orange' },
    { code: '#9932CC', color: 'purple' },
    { code: '#DDA0DD', color: 'violet' }
  ];

  constructor(props: IHackathonDemoProps) {
    super(props);

    const { items, columns } = this._bootstrapData();
    this.state = {
      isKanbanMode: false,
      items,
      columns
    };

    this.updateItems = this.updateItems.bind(this);
  }

  public render(): JSX.Element {
    const { isKanbanMode, items, columns } = this.state;
    const groups: IGroup[] = this._getGroups(items);
    const laneColumns: ILaneColumn[] = groups.map(group => {
      return {
        name: group.name,
        key: `lane_column_${group.name}`
      };
    });

    return (
      <div>
        <Toggle label="Kanban mode" inlineLabel checked={isKanbanMode} onChange={this._onChangeCompactMode} styles={toggleStyles} />
        {isKanbanMode ? (
          <KanbanHackthonExample items={items} laneColumns={laneColumns} updatItems={this.updateItems} />
        ) : (
          <DetailsList
            componentRef={this._root}
            items={items}
            groups={groups}
            columns={columns}
            onRenderItemColumn={this._renderItemColumn}
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

  private updateItems(items: any[]) {
    console.log('update items in HackathodDemo');
    this.setState({ items: items });
  }

  private _onChangeCompactMode = () => {
    const { isKanbanMode } = this.state;
    this.setState({
      isKanbanMode: !isKanbanMode
    });
  };

  private _renderItemColumn = (item: IItem, index: number, column: IColumn): JSX.Element => {
    const fieldValue = item[column.key];
    if (column.key === 'name') {
      return <strong style={{ fontSize: 14 }}>{fieldValue}</strong>;
    } else if (column.key === 'flag') {
      return <Image src={fieldValue} width={120} height={80} imageFit={ImageFit.cover} />;
    }
    return <span>{fieldValue}</span>;
  };

  private _bootstrapData = () => {
    const items: IItem[] = this._getItems();
    const columns: IColumn[] = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
      { key: 'flag', name: 'Flag', fieldName: 'flag', minWidth: 100, maxWidth: 200 },
      { key: 'color', name: 'Color', fieldName: 'color', minWidth: 100, maxWidth: 200 }
    ];
    return { items, columns };
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
    if (this.state) {
      const { items } = this.state;
      if (items) {
        return items.sort(this._sortItems);
      }
    }

    return this._locations
      .map((location, index) => {
        const { name, flag } = location;
        const { color, code } = this._colors[Math.floor(Math.random() * this._colors.length)];
        return {
          key: `item_key_${index}`,
          name,
          flag,
          code,
          color: color.toUpperCase()
        };
      })
      .sort(this._sortItems);
  };

  private _sortItems = (item1: IItem, item2: IItem) => {
    return item1.color === item2.color ? 0 : item1.color < item2.color ? 1 : -1;
  };
}
