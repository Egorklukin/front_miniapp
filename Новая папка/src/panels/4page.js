import { Panel, PanelHeader, PanelHeaderBack, Group,CardGrid,ContentCard,useScrollLock,PanelHeaderContent,SplitCol,Snackbar,
  PanelHeaderContext, SimpleCell,
  Header,
  SplitLayout
} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck,useHref } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon28CopyOutline,Icon16Dropdown,Icon28CheckCircleOutline} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';
import PropTypes from 'prop-types';

export const FourPage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/fourpage'
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
        text: 'https://vk.com/app52702816#/guide/fourpage'
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
                Значение сна
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
          header="Значение"
          text="Сон важен для здоровья человека, так как во время него происходит восстановление и подготовка к новому рабочему дню всех систем и органов"
          mode="tint"
            />
        </CardGrid>
        </Group>
        <Group separator='hide' header={<Header mode="secondary">Некоторые преимущества полноценного сна</Header>}>
        <CardGrid size='l'>
          <ContentCard
          header="Регенерация организма"
          text="Происходит очищение от старых отживших клеток и замена их новыми, здоровыми"
          mode="tint"/>
          <ContentCard
          header="Выработка гормонов"
          text="Во время ночного отдыха в организме вырабатываются дофамин и серотонин, отвечающие за рост и передачу нервных импульсов в структурах головного мозга"
          mode="tint"/>
          <ContentCard
          header="Расслабление мозга"
          text="Это приводит к сохранению психического и умственного здоровья"
          mode="tint"/>
          <ContentCard
          header="Правильная работа иммунной системы"
          text="Во сне вырабатываются иммуноглобулины, необходимые для борьбы с инфекциями"
          mode="tint"/>
        </CardGrid>
        </Group>
        <Group separator='hide' header={<Header mode="secondary">Различные негативные последствия</Header>}>
        <CardGrid size='l'>
          <ContentCard
          header="Ухудшение когнитивных функций"
          text="Недостаток сна влияет на память, внимание, концентрацию и способность принимать решения"
          mode="tint"/>
          <ContentCard
          header="Эмоциональные проблемы"
          text="Недостаток сна связан с увеличением стресса, раздражительности и негативного эмоционального состояния"
          mode="tint"/>
          <ContentCard
          header="Физические заболевания"
          text="Длительный недосып может повысить риск развития сердечно-сосудистых заболеваний, диабета и других хронических заболеваний"
          mode="tint"/>
          <ContentCard
          header="Ослабление иммунитета"
          text="Недостаток сна может сделать организм более уязвимым перед инфекциями и уменьшить способность бороться с болезнями"
          mode="tint"/>
        </CardGrid>
        </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};
