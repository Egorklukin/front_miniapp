import { Panel, PanelHeader, Div, Group,CardGrid, usePlatform,Header,ContentCard,View,PanelHeaderButton,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {Icon28ReportOutline} from '@vkontakte/icons'
import PropTypes from 'prop-types';
import React from 'react';

export const Persik = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [activePanel, setActivePanel] = React.useState('persik');
  const platform = usePlatform();
  const noop = () => {};
  return (
    <View activePanel={activePanel}>
    <Panel id={id}>
      <PanelHeader before={platform === 'ios' && (
            <PanelHeaderButton href='https://vk.com/im?media=&sel=-228493170' target='_blank' aria-label='report'>
              <Icon28ReportOutline />
            </PanelHeaderButton>) || platform === 'android' && (<PanelHeaderButton href='https://vk.me/club228493170' target='_blank' aria-label='report'>
              <Icon28ReportOutline />
            </PanelHeaderButton>)|| platform === 'vkcom' && (<PanelHeaderButton href='https://vk.me/club228493170' target='_blank' aria-label='report'>
              <Icon28ReportOutline />
            </PanelHeaderButton>)
          }
>Справочник</PanelHeader>
      <Group mode="plain"
      header={<Header mode="secondary">Основы сна</Header>}
      separator='hide'
      >
        <CardGrid size="l">
        <ContentCard
        onClick={() => routeNavigator.push('onepage')}
        header="Что такое сон"
        text='Сон — естественное состояние с минимальной активностью сознания и сниженной реакцией на раздражители, необходимое для восстановления сил'
            />
        <ContentCard
        onClick={() => routeNavigator.push('twopage')}
        header="Фазы сна"
        text='Сон состоит из двух основных фаз - медленной и быстрой, которые сменяют друг друга поочерёдно'
            />
        <ContentCard
        onClick={() => routeNavigator.push('threepage')}
        header="Циркадные ритмы"
        text='Циркадные ритмы - циклические колебания интенсивности различных биологических процессов, связанные со сменой дня и ночи'
        />
        <ContentCard
        onClick={() => routeNavigator.push('fourpage')}
        header="Значение сна для здоровья"
        text='Сон важен для здоровья человека по нескольким причинам'
            />
        </CardGrid>
      </Group>
      <Group mode="plain"
      header={<Header mode="secondary">Продолжительность сна</Header>}
      separator='hide'
      >
        <CardGrid size="l">
        <ContentCard
        onClick={() => routeNavigator.push('fivepage')}
        header="Рекомендации по возрасту"
        text='Рекомендуемое время сна в различный возрастной период'
            />
        </CardGrid>
      </Group>
      <Group mode="plain"
      header={<Header mode="secondary">Проблемы со сном</Header>}
      separator='hide'
      >
        <CardGrid size="l">
        <ContentCard
        onClick={() => routeNavigator.push('sixpage')}
        header="Бессонница"
        text='Бессонница- это расстройство сна, при котором пациент испытывает трудности с засыпанием, поддержанием сна или преждевременным пробуждением'
            />
        <ContentCard
        onClick={() => routeNavigator.push('eightpage')}
        header="Нарколепсия"
        text='Это заболевание центральной нервной системы, которое проявляется хронической дневной сонливостью, вплоть до приступов внезапного засыпания, и утратой мышечного тонуса'
        />
        <ContentCard
        onClick={() => routeNavigator.push('ninepage')}
        header="Парасомнии"
        text='Это двигательные, поведенческие или вегетативные феномены, возникающие в специфической связи с процессом сна'
            />
        <ContentCard
        onClick={() => routeNavigator.push('tenpage')}
        header="Ночные кошмары и ночные ужасы"
        text='Это парасомническое расстройство сна, возникающее в фазу быстрого сна, при котором снятся тревожные или устрашающие сны, вызывающие страх, ужас или отвращение'
            />
        <ContentCard
        onClick={() => routeNavigator.push('elevenpage')}
        header="Лунатизм"
        text='Это расстройство сна, при котором человек ходит во сне, выполняет другие движения, а на утро не помнит ничего происходящего'
            />
        </CardGrid>
      </Group>
      <Group mode="plain"
      header={<Header mode="secondary">Часто задаваемые вопросы</Header>}
      separator='hide'
      >
        <CardGrid size="l">
        <ContentCard
        onClick={() => routeNavigator.push('faqone')}
        header="Почему я чувствую усталость, несмотря на достаточный сон?"
        text='Некоторые возможные причины'
            />
        <ContentCard
        onClick={() => routeNavigator.push('faqtwo')}
        header="Как справиться с бессонницей?"
        text='Некоторые советы'
            />
        <ContentCard
        onClick={() => routeNavigator.push('faqthree')}
        header="Можно ли компенсировать недосып на выходных?"
        text='Компенсировать недосып полноценным сном на выходных нельзя'
            />
        <ContentCard
        onClick={() => routeNavigator.push('faqfour')}
        header="Какие продукты и напитки влияют на сон?"
        text='Некоторые продукты и напитки, которые могут положительно влиять на сон'
            />
        </CardGrid>
      </Group>
    </Panel>
    </View>
  );
};
Persik.propTypes = {
  id: PropTypes.string.isRequired,
};