import { Panel, PanelHeader, PanelHeaderBack,Group,CardGrid,ContentCard, useScrollLock,PanelHeaderContent,SplitCol,Snackbar,
  PanelHeaderContext, SimpleCell,
  SplitLayout} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const ThreePage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/threepage'
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
        text: 'https://vk.com/app52702816#/guide/threepage'
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
                Циркадные ритмы
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
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Biological_clock_human-ru.svg/1920px-Biological_clock_human-ru.svg.png'
          alt='Источник:Biological clock human.svg'
          header="Циркадные ритмы"
              text="Циркадные ритмы — это «биологические часы». Они отвечают за включение и отключение определенных жизненных процессов в организме человека. Управляются они по большей части с помощью генов"
              mode="tint"
            />
            <ContentCard
              text="Они регулируют периоды отдыха и бодрствования, поддерживают здоровье, позволяя организму нормально функционировать. Ритмы воздействуют на обмен веществ, температуру тела, кровяное давление и когнитивные функции"
              mode="outline-tint"
            />
          <ContentCard
              header="Гипоталамус"
              text="Главный регулятор ритмов в мозге — гипоталамус, точнее его супрахиазматическое ядро, которое взаимодействует с внешними раздражителями (свет и темнота) и регулирует производство гормонов, особенно мелатонина. Этот гормон отвечает за подготовку организма ко сну, его выработка увеличивается в тёмное время суток — примерно с девяти вечера"
              mode="tint"
            />
            <ContentCard
              header="Свет"
              text="Главный фактор, влияющий на циркадные ритмы. Внутренние часы настраиваются благодаря воздействию солнечного света, который через сетчатку глаз передаёт сигналы в мозг. Яркий утренний свет будит организм, запускает выработку кортизола, который стимулирует активность. С наступлением темноты уровень кортизола падает, а мелатонина — увеличивается, что и готовит организм ко сну"
              mode="tint"
            />
            <ContentCard
          header='Метод для восстановления циркадных ритмов'
          text='Для восстановления циркадных ритмов могут использоваться различные методы, например, светотерапия. Человек подвергается воздействию яркого света утром, чтобы «перенастроить» внутренние часы'
          mode='tint'
          />
        </CardGrid>
        </Group>  
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};