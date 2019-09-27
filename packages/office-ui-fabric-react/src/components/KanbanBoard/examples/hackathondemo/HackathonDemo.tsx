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
  color?: string;
  population: string;
}

interface IColumn {
  key: 'key' | 'name' | 'flag' | 'population';
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
  private _locations: { name: string; flag: string; id: string; population: string }[] = [
    {
      name: 'Alabama',
      population: '4M_5M',
      flag: '//usa.fmcdn.net/data/flags/h80/al.png'
    },
    {
      name: 'Alaska',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/ak.png'
    },
    {
      name: 'Arizona',
      population: '7M_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/az.png'
    },
    {
      name: 'Arkansas',
      population: '3M_4M',
      flag: '//usa.fmcdn.net/data/flags/h80/ar.png'
    },
    {
      name: 'California',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/ca.png'
    },
    {
      name: 'Colorado',
      population: '5M_6M',
      flag: '//usa.fmcdn.net/data/flags/h80/co.png'
    },
    {
      name: 'Connecticut',
      population: '3M_4M',
      flag: '//usa.fmcdn.net/data/flags/h80/ct.png'
    },
    {
      name: 'Delaware',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/de.png'
    },
    {
      name: 'Florida',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/fl.png'
    },
    {
      name: 'Georgia',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/ga.png'
    },
    {
      name: 'Hawaii',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/hi.png'
    },
    {
      name: 'Idaho',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/id.png'
    },
    {
      name: 'Illinois',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/il.png'
    },
    {
      name: 'Indiana',
      population: '6M_7M',
      flag: '//usa.fmcdn.net/data/flags/h80/in.png'
    },
    //*
    {
      name: 'Iowa',
      population: '3M_4M',
      flag: '//usa.fmcdn.net/data/flags/h80/ia.png'
    },
    {
      name: 'Kansas',
      population: '2M_3M',
      flag: '//usa.fmcdn.net/data/flags/h80/ks.png'
    },
    {
      name: 'Kentucky',
      population: '4M_5M',
      flag: '//usa.fmcdn.net/data/flags/h80/ky.png'
    },
    {
      name: 'Louisiana',
      population: '4M_5M',
      flag: '//usa.fmcdn.net/data/flags/h80/la.png'
    },
    {
      name: 'Maine',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/me.png'
    },
    {
      name: 'Maryland',
      population: '5M_6M',
      flag: '//usa.fmcdn.net/data/flags/h80/md.png'
    },
    {
      name: 'Massachusetts',
      population: '6M_7M',
      flag: '//usa.fmcdn.net/data/flags/h80/ma.png'
    },
    {
      name: 'Michigan',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/mi.png'
    },
    {
      name: 'Minnesota',
      population: '5M_6M',
      flag: '//usa.fmcdn.net/data/flags/h80/mn.png'
    },
    {
      name: 'Mississippi',
      population: '2M_3M',
      flag: '//usa.fmcdn.net/data/flags/h80/ms.png'
    },
    {
      name: 'Missouri',
      population: '6M_7M',
      flag: '//usa.fmcdn.net/data/flags/h80/mo.png'
    },
    {
      name: 'Montana',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/mt.png'
    },
    {
      name: 'Nebraska',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/ne.png'
    },
    {
      name: 'Nevada',
      population: '2M_3M',
      flag: '//usa.fmcdn.net/data/flags/h80/nv.png'
    },
    {
      name: 'New Hampshire',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/nh.png'
    },
    {
      name: 'New Jersey',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/nj.png'
    },
    {
      name: 'New Mexico',
      population: '2M_3M',
      flag: '//usa.fmcdn.net/data/flags/h80/nm.png'
    },
    {
      name: 'New York',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/ny.png'
    },
    {
      name: 'North Carolina',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/nc.png'
    },
    {
      name: 'North Dakota',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/nd.png'
    },
    {
      name: 'Ohio',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/oh.png'
    },
    {
      name: 'Oklahoma',
      population: '3M_4M',
      flag: '//usa.fmcdn.net/data/flags/h80/ok.png'
    },
    {
      name: 'Oregon',
      population: '4M_5M',
      flag: '//usa.fmcdn.net/data/flags/h80/or.png'
    },
    {
      name: 'Pennsylvania',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/pa.png'
    },
    {
      name: 'Rhode Island',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/ri.png'
    },
    {
      name: 'South Carolina',
      population: '5M_6M',
      flag: '//usa.fmcdn.net/data/flags/h80/sc.png'
    },
    {
      name: 'South Dakota',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/sd.png'
    },
    {
      name: 'Tennessee',
      population: '6M_7M',
      flag: '//usa.fmcdn.net/data/flags/h80/tn.png'
    },
    {
      name: 'Texas',
      population: 'GT_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/tx.png'
    },
    {
      name: 'Utah',
      population: '3M_4M',
      flag: '//usa.fmcdn.net/data/flags/h80/ut.png'
    },
    {
      name: 'Vermont',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/vt.png'
    },
    {
      name: 'Virginia',
      population: '7M_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/va.png'
    },
    {
      name: 'Washington',
      population: '7M_9M',
      flag: '//usa.fmcdn.net/data/flags/h80/wa.png'
    },
    {
      name: 'West Virginia',
      population: '1M_2M',
      flag: '//usa.fmcdn.net/data/flags/h80/wv.png'
    },
    {
      name: 'Wisconsin',
      population: '5M_6M',
      flag: '//usa.fmcdn.net/data/flags/h80/wi.png'
    },
    {
      name: 'Wyoming',
      population: '0M_1M',
      flag: '//usa.fmcdn.net/data/flags/h80/wy.png'
    } //*/
  ].map((item, idx) => {
    return { id: `index_${idx}`, ...item };
  });
  // private _colors = ['0M_1M', '1M-2M', '2M-3M', '3M-4M', '4M-5M', '5M-6M', '6M-7M', '7M-8M', '8M-9M', '9M-10M', 'GT_9M'];

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
    const dataLink = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States_by_population#State_rankings';

    return (
      <React.Fragment>
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
        <div style={{ margin: 20 }}>
          <a href={dataLink} target="_blank">
            data source (wiki)
          </a>
        </div>
      </React.Fragment>
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
    const _colors = ['#AAF1F0', '#0078D42B', '#BAD80A4D', '#FFB90033', '#EA430033', 'WHITE', 'PINK', 'ORANGE', '#0078D45E', 'VIOLET'];
    let _colorCounter = -1;
    const items: IItem[] = this._getItems();
    for (let i = 0; i < items.length; i++) {
      if (i === 0 || items[i - 1].population !== items[i].population) {
        _colorCounter++;
        _colorCounter %= _colors.length;
      }
      items[i].color = _colors[_colorCounter];
    }
    const columns: IColumn[] = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
      { key: 'flag', name: 'Flag', fieldName: 'flag', minWidth: 100, maxWidth: 200 }
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
      if (!_group || _group !== item.population) {
        if (_group) {
          groups.push({
            key: `group_key_${index}`,
            startIndex: _startIndex,
            count: _count,
            name: _group
          });
          _startIndex = index;
        }
        _count = 1;
        _group = item.population;
      } else {
        _count++;
      }
    });
    groups.push({
      key: `group_key_last`,
      startIndex: _startIndex,
      count: _count,
      name: items[items.length - 1].population
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
        return {
          key: `item_key_${index}`,
          id: `index_${index}`,
          name: location.name,
          flag: location.flag,
          population: location.population
        };
      })
      .sort(this._sortItems);
  };

  private _sortItems = (item1: IItem, item2: IItem) => {
    return item1.population === item2.population ? 0 : item1.population < item2.population ? 1 : -1;
  };
}
