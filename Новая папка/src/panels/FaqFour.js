import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, Link,PanelHeaderContent,PanelHeaderContext,SimpleCell,Snackbar,
    useScrollLock,
    SplitLayout
  } from '@vkontakte/vkui';
  import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
  import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
  import React, { useState } from 'react';
  import bridge from '@vkontakte/vk-bridge';
  import PropTypes from 'prop-types';
  
  export const FaqFour = ({ id }) => {
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
    link: 'https://vk.com/app52702816#/guide/faqfour'
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
          text: 'https://vk.com/app52702816#/guide/faqfour'
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
        <Group separator='hide' header={<Header mode="secondary">Некоторые продукты, которые могут положительно влиять на сон</Header>}>
                        <CardGrid size='l'>
                        <ContentCard
                  header="Яйца"
                  text="Из-за высокого содержания белка варёные яйца положительно влияют на
                  сон и помогают бороться с кислотным рефлюксом"
                  mode="tint"
                />
                <ContentCard
                  header="Миндаль"
                  text="Миндаль богат белком, а также содержит магний, способствующий хорошему сну и мышечной релаксации"
                  mode="tint"
                />
                <ContentCard
                  header="Рыба"
                  text="Большинство сортов рыбы (особенно лосось) содержит витамин B6, необходимый
                  для синтезирования мелатонина в организме"
                  mode="tint"
                />
                <ContentCard
                  header="Молоко"
                  text="Стакан тёплого молока содержит кальций и аминокислоту триптофан, необходимую для выработки мелатонина"
                  mode="tint"
                />
                <ContentCard
                  header="Вишня"
                  text="Вишня — один из немногих природных источников мелатонина"
                  mode="tint"
                />
                <ContentCard
                  header="Овсяная каша"
                  text="В одной порции овсяной каши содержится кальций, магний, фосфор, кремний и калий — вещества, способствующие хорошему сну"
                  mode="tint"
                />
                <ContentCard
                  header="Мед"
                  text="Сахар, содержащийся в мёде, слегка поднимает уровень инсулина, что позволяет аминокислоте триптофан, также содержащейся в
                  этом продукте, лучше проникать в мозг и способствовать хорошему сну"
                  mode="tint"
                />
                        </CardGrid>
                        </Group>
                        <Group separator='hide ' header={<Header mode="secondary">Некоторые напитки, которые могут повлиять на сон</Header>}>
                        <CardGrid size='l'>
                        <ContentCard
                  header="Вода"
                  text="Вода комнатной температуры — лучшее питьё, которое можно употреблять перед сном"
                  mode="tint"
                />
                <ContentCard
                  header="Кефир"
                  text="Этот напиток содержит микробы, вырабатывающие гормон мелатонин — он способствует засыпанию"
                  mode="tint"
                />
                <ContentCard
                  header="Тёплое молоко"
                  text="Содержит триптофан, аминокислоту, которая способствует засыпанию"
                  mode="tint"
                />
                </CardGrid>
                </Group>
                <Group separator='hide'>
                  <CardGrid size='l'>
                    <ContentCard
                    text="Важно помнить, что влияние продуктов и напитков на сон индивидуально и может отличаться у разных людей"
                    mode="tint"
                    />
                    </CardGrid>
                </Group>
      </Panel>
      {snackbar}
      </SplitLayout>
    );
  };
  FaqFour.propTypes = {
      id: PropTypes.string.isRequired,
    };