import React, { useState } from 'react';
import {
  Panel,
  PanelHeader,
  TabsItem,
  Tabs,
  PanelHeaderButton,
  IconButton,
  Banner,
  Button,
  FixedLayout,
  Div
} from '@vkontakte/vkui';
import { Icon16Moon, Icon16Sun, Icon20HelpOutline,Icon28HelpOutline } from '@vkontakte/icons';
import { TabMoon } from './TabMoon';
import { TabSun } from './TabSun';

const MODAL_CARD_Moon = 'modal-card1';
const MODAL_CARD_Sun = 'modal-card2';
const MODAL_CARD_Help = 'modal-card3';
export const Home = ({ id, openModal }) => {
  const [selected, setSelected] = useState('news');
  const noop = () => {};
  const DefaultInPanel = ({ selected, setSelected }) => (
    <FixedLayout filled vertical="bottom">
    <Tabs mode='default'>
      <TabsItem
        selected={selected === 'news'}
        after={
          <IconButton label="Помощь" onClick={() => openModal(MODAL_CARD_Moon)}>
            <Icon20HelpOutline />
          </IconButton>
        }
        before={<Icon16Moon />}
        onClick={() => setSelected('news')}
        id="tab-news"
        aria-controls="tab-content-news"
      >
        Лечь в
      </TabsItem>
      <TabsItem
        selected={selected === 'recommendations'}
        after={
          <IconButton label="Помощь" onClick={() => openModal(MODAL_CARD_Sun)}>
            <Icon20HelpOutline />
          </IconButton>
        }
        before={<Icon16Sun />}
        onClick={() => setSelected('recommendations')}
        id="tab-recommendations"
        aria-controls="tab-content-recommendations"
      >
        Встать в
      </TabsItem>
    </Tabs>
    </FixedLayout>
  );

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderButton onClick={() => openModal(MODAL_CARD_Help)} aria-label='help'>
              <Icon28HelpOutline />
            </PanelHeaderButton>}>Калькулятор сна</PanelHeader>
      {selected === 'news' && <TabMoon />}
      {selected === 'recommendations' && <TabSun />}
      <DefaultInPanel selected={selected} setSelected={setSelected} />
    </Panel>
  );
};