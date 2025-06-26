import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group,PanelHeaderContent,useScrollLock,Snackbar,
  PanelHeaderContext, SimpleCell,
  SplitLayout} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';
import {Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import React from 'react';

export const EightPage = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [contextOpened, setContextOpened] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(null);
  const toggleContext = () => {
    setContextOpened((prev) => !prev);
  };
  useScrollLock(contextOpened);
  const Share = async () => {
    try {
      const result = await bridge.send('VKWebAppShare', {
  link: 'https://vk.com/app52702816#/guide/eightpage'
  });
      if (result.result) {
        console.log('');
      } else {
        console.log('Ошибка',error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Copy = async () => {
    try {
      const result = await bridge.send('VKWebAppCopyText', {
        text: 'https://vk.com/app52702816#/guide/eightpage'
        })
      if (result.result) {
        console.log('');
        openSuccess();
      } else {
        console.log('Ошибка',error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openSuccess = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
        offsetY={40}
      >
       Ссылка скопирована
      </Snackbar>,
    );
  };
  return (
    <SplitLayout>
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => isFirstPage ? routeNavigator.replace('/guide') : routeNavigator.back()} />}
        >
<PanelHeaderContent
                aside={
                  <Icon16Dropdown
                    style={{
                      transform: `rotate(${contextOpened ? '180deg' : '0'})`,
                    }}
                  />
                }
                onClick={toggleContext}
              >
                Нарколепсия
              </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={contextOpened} onClose={toggleContext}>
              <SimpleCell
                before={<Icon28CopyOutline />}
                onClick={Copy}
                data-mode="all"
              >
                Скопировать ссылку
              </SimpleCell>
              <SimpleCell
                before={<Icon28ShareOutline />}
                onClick={Share}
                data-mode="managed"
              >
                Поделиться
              </SimpleCell>
            </PanelHeaderContext>
      <Group header={<Header mode="secondary">Некоторые симптомы</Header>}
      separator='hide'
      >
        <CardGrid size='l'>
        <ContentCard
          header='Катаплексия'
          text='Внезапная кратковременная потеря тонуса мышц, которая возникает под воздействием эмоциональных реакций: чувства страха, волнения, сильного потрясения, гнева, удивления и других эмоций'
          mode='tint'
          />
          <ContentCard
          header='Паралич сна'
          text='Выражается в неспособности двигаться, говорить. Состояние может сопровождаться сильным страхом и вегетативной симптоматикой'
          mode='tint'
          />
          <ContentCard
          header='Гипногогические явления'
          text='Возникают во время засыпания или после пробуждения: обманы восприятия, часто угрожающего характера, реалистичные переживания, яркие видения, ощущения, звуки и прочие'
          mode='tint'
          />
          <ContentCard
          header='Автоматизм'
          text='Человек может заснуть, но при этом продолжать делать то, что делал до наступления сна. Позднее пациент может не помнить о совершаемых действиях'
          mode='tint'
          />
        </CardGrid>
        </Group>
        <Group separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        text='Причины нарколепсии неизвестны, хотя установлено, что свою роль играет фактор наследственности, а также нехватка нейромедиатора орексина, который отвечает за бодрствование'
        mode="outline-tint"
        />
        </CardGrid>
        </Group>  
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};