import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, Link,PanelHeaderContent,PanelHeaderContext,SimpleCell,Snackbar,
    useScrollLock,
    SplitLayout
  } from '@vkontakte/vkui';
  import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
  import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
  import React, { useState } from 'react';
  import bridge from '@vkontakte/vk-bridge';
  import PropTypes from 'prop-types';
  
  export const FaqTwo = ({ id }) => {
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
    link: 'https://vk.com/app52702816#/guide/faqtwo'
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
          text: 'https://vk.com/app52702816#/guide/faqtwo'
          })
        if (result.result) {
          console.log('');
          openSuccess()
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
                  Ответ
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
        <Group separator='hide' header={<Header mode="secondary">Некоторые советы</Header>}>
                <CardGrid size='l'>
                <ContentCard
          header="Установить регулярный график сна"
          text="Ложиться спать и просыпаться в одно и то же время"
          mode="tint"
        />
        <ContentCard
          header="Создать комфортные условия для сна"
          text="В комнате должно быть прохладно, темно и тихо. Оптимальная температура для ночного отдыха — 17-20 градусов"
          mode="tint"
        />
        <ContentCard
          header="Отказаться от позднего ужина"
          text="Важно построить режим дня так, чтобы между ужином и отходом ко сну оставалось не менее трёх часов"
          mode="tint"
        />
        <ContentCard
          header="Принять ванну вечером"
          text="Расслабляющим действием обладает ванна с магниевой солью"
          mode="tint"
        />
        <ContentCard
          header="Освоить техники релаксации"
          text="Глубокое дыхание, медитация и точечный массаж помогут преодолеть тревожность и улучшить сон"
          mode="tint"
        />
        <ContentCard
          header="Освоить ритуалы сна"
          text="Если выбирать для этого одно и то же время и совершать определённый перечень действий (ужин, проветривание комнаты, гигиена перед сном), то при каждой
          такой подготовке организм будет настраиваться на быстрое засыпание"
          mode="tint"
        />
                </CardGrid>
                </Group>
                <Group separator='hide'>
                <CardGrid size='l'>
                <ContentCard
                  text="Если проблемы с бессонницей сохраняются и беспокоят регулярно, необходимо обратиться к врачу"
                  mode="tint"
                />
                </CardGrid>
                </Group>
      </Panel>
      {snackbar}
      </SplitLayout>
    );
  };