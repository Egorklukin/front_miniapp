import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group, PanelHeaderContent,useScrollLock,SplitLayout,Snackbar,
  PanelHeaderContext, SimpleCell} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';
import React from 'react';

export const TenPage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/tenpage'
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
        text: 'https://vk.com/app52702816#/guide/tenpage'
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
              Ночные кошмары и ужасы
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
        header='Ночные кошмары'
        text='Это расстройство сна, возникающее в фазу быстрого сна и характеризующееся сновидениями тревожного или устрашающего характера, связанными с переживаниями страха, ужаса или отвращения. Кошмар заканчивается резким пробуждением, как правило, с криком или плачем'
        mode='tint'
        />
        <ContentCard
        header='Ночные ужасы'
        text='Это резкое пробуждение в состоянии сильного страха, с двигательным возбуждением, криками, тахикардией. Наступает, как правило, в фазе глубокого сна, поэтому воспоминания о приснившемся сне отсутствуют'
        mode='tint'
        />
        </CardGrid>
        </Group>
        <Group header={<Header mode="secondary">Отличия ночных кошмаров и ужасов</Header>} separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        header='Время наступления'
        text='Ужас возникает в фазе глубокого сна и никак не связан со сновидениями, кошмар происходит в фазе быстрого сна, обычно в утренние часы'
        mode='tint'
        />
        <ContentCard
        header='Способ завершения'
        text='После ночного ужаса человек всегда спокойно засыпает, ночной кошмар, как правило, нарушает дальнейший сон, и человек боится уснуть'
        mode='tint'
        />
        <ContentCard
        header='Воспоминания об эпизоде'
        text='Испытавшие ночной кошмар обычно могут рассказать об увиденном, а жертвы ночного ужаса утром не помнят о том, что произошло несколько часов назад'
        mode='tint'
        />
        </CardGrid>
        </Group>
        <Group header={<Header mode="secondary">Для профилактики ночных кошмаров и ужасов рекомендуется</Header>}separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        header='Придерживаться светового режима дня'
        text='Днём нужно больше находиться на ярком свету, а ночью максимально уменьшить световой поток'
        mode='tint'
        />
        <ContentCard
        header='Соблюдать требования к помещению для сна'
        text='Спать в затемнённом и хорошо проветриваемом помещении, поддерживать комфортную температуру и влажность'
        mode='tint'
        />
        <ContentCard
        header='Выполнять ритуалы подготовки ко сну'
        text='Они подбираются индивидуально и помогают снять излишнее нервное напряжение и обеспечить плавный переход ко сну'
        mode='tint'
        />
        <ContentCard
        text='Исключить использование гаджетов перед сном'
        mode='tint'
        />
        </CardGrid>
        </Group>
        <Group separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        text='Для точной диагностики и назначения лечения следует обратиться к врачу'
        mode="outline"
        />
        </CardGrid>
        </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};
TenPage.propTypes = {
  id: PropTypes.string.isRequired,
};