import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group,PanelHeaderContent,useScrollLock,SplitCol,Snackbar,
  PanelHeaderContext, SimpleCell,
  SplitLayout} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const SixPage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/sixpage'
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
        text: 'https://vk.com/app52702816#/guide/sixpage'
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
                Бессонница
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
          header='Причины бессонницы:'
          text='неблагоприятные условия засыпания, нарушения гигиены сна, психосоциальные стрессы, приём некоторых лекарств или наркотиков, различные болезни'
          mode='tint'
          />
        </CardGrid>
        </Group>
        <Group header={<Header mode="secondary">Несколько основных степеней бессонницы</Header>}
      separator='hide'
      >
        <CardGrid size='l'><ContentCard
          header='Легкая'
          text='Нарушение сна происходит не чаще 3-х раз в неделю и не сильно влияет на дневную активность. Обычно проходит самостоятельно или с помощью простых мер, таких как соблюдение гигиены сна, релаксация, травяные чаи'
          mode='tint'
          />
          <ContentCard
          header='Средняя'
          text='Проблемы с ночным отдыхом возникают от 3-х до 5 раз в неделю и умеренно влияют на дневную активность. Расстройство развивается под влиянием хронических факторов: психологические проблемы, соматические заболевания, лекарственные препараты. Заболевание требует консультации специалиста и индивидуального подбора лечения'
          mode='tint'
          />
          <ContentCard
          header='Тяжелая'
          text='Пациент сталкивается с нарушением почти каждую ночь. В основе патологии лежат серьёзные факторы: неврологические или психические заболевания, злоупотребление снотворными или алкоголем. Является опасным состоянием, требующим немедленной медицинской помощи и комплексного лечения'
          mode='tint'
          />
          </CardGrid>
        </Group>
        <Group separator='hide'>
        <CardGrid size='l'>
        <ContentCard
          header='Для диагностики и выявления причины бессонницы нужно обратиться к врачу'
          text=' Сперва стоит обратиться к терапевту. При необходимости врач может порекомендовать обратиться за консультацией к неврологу или психотерапевту. Если причина нарушения сна неочевидна, может потребоваться консультация узкого специалиста — сомнолога'
          mode='tint'
          />
        </CardGrid>
        </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};