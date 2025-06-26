import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Group,Div,PanelHeaderContent,useScrollLock,SplitCol,Snackbar,
  PanelHeaderContext, SimpleCell,
  SplitLayout} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const FivePage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/fivepage'
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
        text: 'https://vk.com/app52702816#/guide/fivepage'
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
                      Рекомендации по возрасту
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
          text='Врачи рекомендуют спать взрослому человеку 7–9 часов в сутки. Однако длительность сна может варьироваться в зависимости от генетики, активности, состояния здоровья и уровня стресса'
         mode="outline-tint"
          />
          <ContentCard
          header='Рекомендованная норма сна для разных возрастов'
          text={<Div>
          Новорожденные (0-3 месяца) - 14-17 часов
          <br />
          Малыши (4-11 месяцев) - 12-15 часов
          <br />
          Дети (1 год - 2года) - 11-14 часов
          <br />
          Дошкольники (3-5 лет) - 10-13 часов
          <br />
          Школьники (6-13 лет) - 9-11 часов
          <br />
          Подростки (14-17 лет) - 8-10 часов
          <br />
          Взрослые (18 лет - 64 года) - 7-9 часов
          <br />
          Пожилые люди (старше 65 лет) - 7-8 часов
        </Div>
          }
          mode='tint'
          />
          <ContentCard
          text='Оптимальный график сна — засыпание до 23 часов (примерно в 10 вечера) и пробуждение в 7 утра'
          mode="outline-tint"
          />
          <ContentCard
          text='Если качество и длительность сна нарушены уже несколько недель и без явной причины, а самочувствие страдает, нужно обратиться к врачу-сомнологу'
          mode='outline'
          />
        </CardGrid>
        </Group>  
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};