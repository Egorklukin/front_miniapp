import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, useScrollLock, Link, PanelHeaderContent, Snackbar, Div,
  PanelHeaderContext, SimpleCell, PanelHeaderButton, Checkbox,
  SplitLayout
} from '@vkontakte/vkui';
import { useRouteNavigator, useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline, Icon28CopyOutline, Icon28CheckCircleOutline, Icon24MagicWandOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const OnePage = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [contextOpened, setContextOpened] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(null);
  const [showCheckboxes, setShowCheckboxes] = React.useState(false);
  
  const toggleContext = () => {
    setContextOpened((prev) => !prev);
  };
  
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
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
  
  useScrollLock(contextOpened);
  
  const Share = async () => {
    try {
      const result = await bridge.send('VKWebAppShare', {
        link: 'https://vk.com/app52702816#/guide/onepage'
      });
      if (result.result) {
        console.log('');
      } else {
        console.log('Ошибка', error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const Copy = async () => {
    try {
      const result = await bridge.send('VKWebAppCopyText', {
        text: 'https://vk.com/app52702816#/guide/onepage'
      });
      if (result.result) {
        console.log('');
        openSuccess();
      } else {
        console.log('Ошибка', error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SplitLayout>
      <Panel id={id}>
        <PanelHeader 
          before={<PanelHeaderBack onClick={() => isFirstPage ? routeNavigator.replace('/guide') : routeNavigator.back()} />}
          after={
            <PanelHeaderButton aria-label="answer_ai" onClick={toggleCheckboxes}>
              <Icon24MagicWandOutline />
            </PanelHeaderButton>
          }
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
            Что такое сон
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
        
        <Group separator='hide'>
          <CardGrid size='l'>
            <ContentCard
              src='https://farm.tatarstan.ru/file/news/2341_n2047680_big.jpg'
              alt='Источник: https://uleoparda.ru/sleep/tomorrow/'
              subtitle={<Link href='https://uleoparda.ru/sleep/tomorrow/' target="_blank">Источник</Link>}
              header="Что такое сон"
              text="Сон - это особое состояние, когда наше взаимодействие с внешним миром практически прекращается. Во сне мы отдыхаем и восстанавливаем силы, но при этом наш мозг продолжает активно работать. Сон жизненно необходим: если не спать в течение трех суток, то человек не сможет выполнять повседневные задачи, будет постоянно чувствовать усталость"
              mode="tint"
              after={showCheckboxes ? <Checkbox /> : undefined}
            />
          </CardGrid>
        </Group>
        
        <Group header={<Header mode="secondary">Функции</Header>} separator='hide'>
          <CardGrid size="l">
            <ContentCard
              header="Восстановление организма"
              text="Ночью мозг переключается с режима внешнего реагирования в режим сканирования тела. Он изучает и сверяет с нормой все показатели физического здоровья: состояние сосудов, органов, клеточных стенок, состав жидкостей и многое другое. Обнаруженные неполадки устраняются"
              mode="tint"
              after={showCheckboxes ? <Checkbox /> : undefined}
            />
            <ContentCard
              header="Восстановление психики"
              text="За психическую составляющую отвечает быстрый сон. Во время него консолидируется память, формируются долгосрочные воспоминания, обновляется эмоциональное восприятие, закрепляются полученные навыки"
              mode="tint"
              after={showCheckboxes ? <Checkbox /> : undefined}
            />
          </CardGrid>
        </Group>
        
        <Group>
          <CardGrid size='l'>
            <ContentCard
              text="Недостаток сна в течение семи дней может привести к проблемам с психикой, а если не спать две недели, то это может привести к смерти. Другими словами, без еды человек может прожить дольше, чем без сна"
              mode="outline"
              after={showCheckboxes ? <Checkbox /> : undefined}
            />
          </CardGrid>
        </Group>
      </Panel>
      {snackbar}
    </SplitLayout>
  );
};