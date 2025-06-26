import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group,PanelHeaderContent,useScrollLock,SplitLayout,Snackbar,
  PanelHeaderContext, SimpleCell} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import { Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const ElevenPage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/elevenpage'
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
        text: 'https://vk.com/app52702816#/guide/elevenpage'
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
                Лунатизм
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
        header='Лунатизм'
        text='это особое расстройство сна, при котором спящий человек совершает неосознанные автоматизированные действия. Обычно проявляется в первые два часа после засыпания и может длиться от нескольких минут до часа. После пробуждения пациент не помнит произошедшее и сам факт снохождения'
        mode='tint'
        />
        </CardGrid>
      </Group>
      <Group header={<Header mode="secondary">Причины лунатизма</Header>}separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        header='Наследственную предрасположенность'
        text='Нарушение чаще встречается у однояйцевых близнецов и у людей, чьи родственники страдают лунатизмом или аффективными расстройствами'
        mode='tint'
        />
        <ContentCard
        header='Нервное перенапряжение'
        text='Встречается у подростков, связанное с особенностями биоэлектрических процессов в коре головного мозга и активностью эндокринной системы'
        mode='tint'
        />
        <ContentCard
        header='Психические патологии'
        text='Такие как эпилепсия, паркинсонизм, неврозы, навязчивые состояния, зависимость от психоактивных веществ'
        mode='tint'
        />
         <ContentCard
        header='Опухоли мозга'
        text='Они могут быть доброкачественными (не раковыми) или злокачественными (раковыми). Опухоли мозга могут возникать из различных типов клеток, включая глиальные клетки, нейроны, оболочки мозга, кровеносные сосуды и гипофиз'
        mode='tint'
        />
         <ContentCard
        header='Психологические проблемы'
        text='Переутомление, эмоциональная возбудимость, тревожность, стресс'
        mode='tint'
        />
        </CardGrid>
        </Group>  
        <Group separator='hide'>
        <CardGrid size='l'>
          <ContentCard
        text='При появлении тревожных симптомов следует обратиться к специалисту-сомнологу для проведения обследования. Кроме сомнолога, диагностикой и лечением расстройства занимаются невролог и психотерапевт'
        mode='outline'
        />
        </CardGrid>
      </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};