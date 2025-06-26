import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group, Link,PanelHeaderContent,useScrollLock,SplitLayout,Snackbar,
  PanelHeaderContext, SimpleCell} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon24ExternalLinkOutline,Icon28ShareOutline,Icon28CopyOutline,Icon28CheckCircleOutline,
  Icon16Dropdown} from '@vkontakte/icons';
import Image from '../assets/1080h600_narusenia-sna_tablica-768x427.jpg';
import bridge from '@vkontakte/vk-bridge';
import React from 'react';

export const NinePage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/ninepage'
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
        text: 'https://vk.com/app52702816#/guide/ninepage'
        })
      if (result.result) {
        openSuccess();
        console.log('');
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
                Парасомнии
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
      <Group header={<Header mode="secondary">Некоторые проявления парасомний</Header>}
      separator='hide'
      >
        <CardGrid size='l'>
        <ContentCard
        header='Сноговорение'
        text='Пока человек спит, он довольно громко произносит различные звуки и слова, но не осознаёт их и после пробуждения не помнит ни одно из них'
        mode='tint'
        />
        <ContentCard
        header='Снохождение (лунатизм)'
        text='Во время приступа спящий может выполнять разные действия — тереть глаза, ощупывать одежду, сидеть в кровати, вставать, ходить'
        mode='tint'
        />
        <ContentCard
        header='Страхи во сне'
        text='На протяжении ночи пациенты внезапно начинают кричать, биться и выглядят испуганными и сильно возбуждённым'
        mode='tint'
        />
        <ContentCard
        header='Сонный паралич'
        text='Длится несколько минут в период засыпания или пробуждения. В это время произвольные движения невозможны, движения глаз и дыхательные акты грудной клетки сохранены'
        mode='tint'
        />
        <ContentCard
        header='Нарушение пищевого поведения'
        text='Человек не может контролировать себя и ест ночью, когда внезапно просыпается'
        mode='tint'
        />
        <ContentCard
        src={Image}
        alt='Источник: https://forma.eapteka.ru/articles/cto-delat-s-naruseniami-sna?ysclid=m487e3hf0309068522'
        subtitle={<Link href='https://forma.eapteka.ru/articles/cto-delat-s-naruseniami-sna?ysclid=m487e3hf0309068522'target="_blank"
          after={<Icon24ExternalLinkOutline width={16} height={16} />}
        >Источник</Link>}
        header='Другие виды прасомний'
        text=''
        mode='tint'
        />
        </CardGrid>
        
        </Group>
        <Group separator='hide'>
        <CardGrid size='l'>
        <ContentCard
        text='Для диагностики парасомний используют полисомнографию. Лечение может включать в себя лекарственные препараты и психотерапию'
        mode="outline-tint"
        />
        <ContentCard
        text='Если парасомния нарушает собственный сон человека или сон партнёра по постели, следует обратиться за лечением к врачу-сомнологу'
        mode="outline"
        />
        
        </CardGrid>
        </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};