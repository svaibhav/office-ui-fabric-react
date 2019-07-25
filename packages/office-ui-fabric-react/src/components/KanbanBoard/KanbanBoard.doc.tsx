import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';
// import { KanbanBoardExample } from './examples/KanbanBoard.Example';
import { HackathonDemo } from './examples/hackathondemo/HackathonDemo';

// const KanbanExampleCode = require(
//   '!raw-loader!office-ui-fabric-react/src/components/KanbanBoard/examples/KanbanBoard.Example.tsx'
// ) as string;
const HackathonDemoCode = require('!raw-loader!office-ui-fabric-react/src/components/KanbanBoard/examples/hackathondemo/HackathonDemo.tsx') as string;

export const KanbanBoardPageProps: IDocPageProps = {
  title: 'KanbanBoard',
  componentName: 'KanbanBoardExample',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/List',
  examples: [
    {
      title: 'Hackathon Kanban Demo',
      code: HackathonDemoCode,
      view: <HackathonDemo />,
      isScrollable: false
    }
    // {
    //   title: 'Kanban of grid items',
    //   code: KanbanExampleCode,
    //   view: <KanbanBoardExample />,
    //   isScrollable: false
    // }
  ],

  allowNativeProps: true,
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/KanbanBoard/docs/KanbanBoardOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
