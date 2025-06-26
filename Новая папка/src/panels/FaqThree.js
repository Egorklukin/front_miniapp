import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, Link,PanelHeaderContent,PanelHeaderContext,SimpleCell,Snackbar,
    useScrollLock,
    SplitLayout
  } from '@vkontakte/vkui';
  import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
  import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
  import React, { useState } from 'react';
  import bridge from '@vkontakte/vk-bridge';
  import PropTypes from 'prop-types';
  
  export const FaqThree = ({ id }) => {
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
    link: 'https://vk.com/app52702816#/guide/faqthree'
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
          text: 'https://vk.com/app52702816#/guide/faqthree'
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
        <Group separator='hide'>
                        <CardGrid size='l'>
                        <ContentCard
                  header="Компенсировать недосып полноценным сном на выходных нельзя"
                  text="Это приведёт к ещё большей подавленности, снижению концентрации и работоспособности"
                  mode="tint"
                />
                <ContentCard
                          text="По мнению президента Российского общества сомнологов, доктора медицинских наук, профессора Романа Бузунова, даже если накопился дефицит сна, долго спать в субботу и воскресенье не стоит.
                          Лучше всего просыпаться не позже чем на два часа по сравнению с привычным графиком"
                          mode="tint"
                        />
                <ContentCard
                  text="Чтобы компенсировать недосып, рекомендуется оптимизировать цикл «сон — бодрствование, работа — отдых», ввести в жизнь больше активности,
                  а на дневной сон, если очень хочется, тратить не больше 40–60 минут"
                  mode="tint"
                />
                <ContentCard
                  text="Для определения индивидуального режима сна и разработки мер по его улучшению рекомендуется обратиться к специалисту"
                  mode="tint"
                />
                        </CardGrid>
                        </Group>
      </Panel>
      {snackbar}
      </SplitLayout>
    );
  };
