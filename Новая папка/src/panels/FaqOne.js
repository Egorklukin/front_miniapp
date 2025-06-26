import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, Link,PanelHeaderContent,PanelHeaderContext,SimpleCell,Snackbar,
    useScrollLock,
    SplitLayout
  } from '@vkontakte/vkui';
  import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
  import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
  import React, { useState } from 'react';
  import bridge from '@vkontakte/vk-bridge';
  import PropTypes from 'prop-types';
  
  export const FaqOne = ({ id }) => {
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
    link: 'https://vk.com/app52702816#/guide/faqone'
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
          text: 'https://vk.com/app52702816#/guide/faqone'
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
        <Group separator='hide' header={<Header mode="secondary">Некоторые возможные причины</Header>}>
        <CardGrid size='l'>
        <ContentCard
          header="Недостаток сна"
          text="Это может быть связано с нехваткой глубокого или качественного сна, проблемами с бессознательными процессами
          во время сна или нарушениями режима сна"
          mode="tint"
        />
        <ContentCard
          header="Сонные нарушения"
          text="Например, апноэ сна (прекращение дыхания во время сна), беспокойные ноги или ночные кошмары могут приводить к нарушению качества сна и вызывать чувство усталости после сна"
          mode="tint"
        />
        <ContentCard
          header="Психологические факторы"
          text="Стресс, тревога, депрессия и другие эмоциональные проблемы могут влиять на качество сна и приводить к ощущению усталости"
          mode="tint"
        />
        <ContentCard
          header="Медицинские причины"
          text="которые медицинские состояния, такие как анемия, щитовидная дисфункция, хроническая усталость, диабет и другие, могут вызывать усталость, несмотря на нормальный сон"
          mode="tint"
        />
        <ContentCard
          header="Побочные эффекты лекарств"
          text="Некоторые лекарства, включая антидепрессанты, антигистаминные препараты и другие, могут вызывать сонливость и усталость."
          mode="tint"
        />
        <ContentCard
          header="Образ жизни"
          text="Неправильное питание, недостаток физической активности, чрезмерное потребление кофеина или алкоголя, неправильный режим дня и другие
          факторы образа жизни могут оказывать негативное влияние на энергию и ощущение усталости"
          mode="tint"
        />
        </CardGrid>
        </Group>
        <Group separator='hide'>
        <CardGrid size='l'>
        <ContentCard
          text="Для выяснения точной причины чувства усталости, несмотря на достаточный сон, рекомендуется обратиться к врачу"
          mode="tint"
        />
        </CardGrid>
        </Group>
      </Panel>
      {snackbar}
      </SplitLayout>
    );
  };
FaqOne.propTypes = {
    id: PropTypes.string.isRequired,
};