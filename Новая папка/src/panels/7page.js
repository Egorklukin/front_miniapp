import { Panel, PanelHeader, PanelHeaderBack, ContentCard, CardGrid, Header, Group} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React from 'react';

export const SevenPage = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
      Рекомендации Рекомендации по возрасту
      </PanelHeader>
      <Group separator='hide'>
        <CardGrid size='l'>
          <ContentCard
          text='Врачи рекомендуют спать взрослому человеку 7–9 часов в сутки. Однако длительность сна может варьироваться в зависимости от генетики, активности, состояния здоровья и уровня стресса.'
          mode='tint'
          />
          <ContentCard
          header='Рекомендованная норма сна для разных возрастов'
          text='новорождённые (0–3 месяца) — 14–17 часов; 2
младенцы (4–11 месяцев) — 12–15 часов; 2
малыши (1–2 года) — 11–14 часов; 2
дошкольники (3–5 лет) — 10–13 часов; 2
дети младшего и среднего школьного возраста (6–13 лет) — 9–11 часов; 2
подростки (14–17 лет) — 8–10 часов; 2
молодые люди (18–25 лет) — 7–9 часов; 2
взрослые (26–64 года) — 7–9 часов; 2
пожилые люди (старше 65 лет) — 7–8 часов. '
          mode='tint'
          />
          <ContentCard
          text='Оптимальный график сна — засыпание до 23 часов (примерно в 10 вечера) и пробуждение в 7 утра.'
          mode='tint'
          />
          <ContentCard
          text='Если качество и длительность сна нарушены уже несколько недель и без явной причины, а самочувствие страдает, нужно обратиться к врачу-сонологу.'
          mode='tint'
          />
        </CardGrid>
        </Group>  
    </Panel>
  );
};