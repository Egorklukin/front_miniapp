import { Panel, PanelHeader, PanelHeaderBack, Group, ContentCard, CardGrid, Header, Link,PanelHeaderContent,PanelHeaderContext,SimpleCell,Snackbar,
  useScrollLock,
  SplitLayout
} from '@vkontakte/vkui';
import { useRouteNavigator,useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import {Icon28ShareOutline,Icon16Dropdown,Icon28CopyOutline,Icon28CheckCircleOutline} from '@vkontakte/icons';
import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

export const TwoPage = ({ id }) => {
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
  link: 'https://vk.com/app52702816#/guide/twopage'
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
        text: 'https://vk.com/app52702816#/guide/twopage'
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
                Фазы сна
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
          src='https://bez-sna.ru/wp-content/uploads/grafic-faz-sna-cheloveka-po-vremeni.jpg'
          alt='https://evakuatop.ru/skolko/po-vremeni-faziy-sna/'
          subtitle={<Link href='https://evakuatop.ru/skolko/po-vremeni-faziy-sna/' target="_blank"
            >Источник</Link>}
          header="Фазы сна: виды и описания"
          text="В процессе сна мы проходим через две основные стадии:
Фаза медленного сна, которая занимает примерно 75% от общей продолжительности сна и
фаза быстрого сна, на которую приходится около 25% от общего времени сна"
          mode="tint"
          />
        </CardGrid>
        <CardGrid size='l'>
          <ContentCard
          header="Медленный сон"
          text="занимает почти 75% от всей продолжительности сна. Состоит она из дремоты, лёгкой стадии и глубокой. Если на вторую стадию приходится около 20 минут, то на третью — 90 минут. Во время медленного сна синтезируются важные для работы головного мозга вещества, выводятся продукты жизнедеятельности клеток"
          mode="tint"
          />
        </CardGrid>
      </Group>
      <Group separator='hide' header={<Header mode="secondary">Виды медленного сна</Header>}>
        <CardGrid size='l'>
            <ContentCard
              header="Фаза поверхностного сна(NREM 1) длится обычно 5–10 минут"
              text="Первая фаза медленного сна — состояние между засыпанием и бодрствованием. Температура тела снижается, сердцебиение и дыхание замедляются, но человек реагирует на внешние раздражители, что позволяет легко его разбудить. Глазные яблоки медленно двигаются из стороны в сторону. В этой фазе часто наблюдаются нереальные образы и яркие мысли, возникают необычные идеи. Характерным проявлением является гипнагогия — ощущения 'рывка', 'падения' и 'вздрагивания' при засыпании"
              mode="tint"
            />
            <ContentCard
              header="Фаза неглубокого сна(NREM 2) длится обычно 10–25 минут"
              text="Во время неглубокого сна человек теряет осознание окружающего, но сохраняет реакцию на движение и звуки. Слух обостряется, что делает посторонние шумы потенциальными раздражителями. Сердечный ритм замедляется, дыхание становится более редким и может стать аритмичным, а глазные яблоки практически не двигаются"
              mode="tint"
            />
            <ContentCard
              header="Фаза глубокого сна(NREM 3) длится обычно 40 минут в начале цикла, затем она становится короче"
              text="В этот период человек крепко спит, практически не реагируя на внешние раздражители. Температура тела и артериальное давление продолжают снижаться, сердцебиение и дыхание замедляются, мышцы расслабляются.
              В организме активно вырабатываются гормоны, особенно соматотропный гормон, который у детей способствует росту, а у взрослых – обмену белков, жиров и углеводов. На энцефалограмме спящего человека видны дельта-волны, поэтому эту фазу называют дельта-фазойя"
              mode="tint"
            />
        </CardGrid>
      </Group>
      <Group separator='hide' header={<Header mode="secondary">Быстрый сон</Header>}>
      <CardGrid size='l'>
      <ContentCard
        header="Фаза быстрого сна (ФБСилиREM) длится обычно от 10 минут в первом цикле до 90 минут в последнем"
        text="ФБС-сон начинается через 1,5 часа после засыпания. В эту фазу тело расслаблено, но глазные яблоки быстро двигаются, мышцы лица и тела могут подергиваться. Дыхание и пульс учащаются, артериальное давление повышается, у мужчин может возникнуть эрекция. Головной мозг «перезаряжается», выводя продукты распада. Гиппокамп переносит информацию из краткосрочной в долгосрочную память. Разбудить человека в фазе ФБС сложно. Недостаток быстрого сна вреден для здоровья: ухудшает память и внимание, вызывает усталость и депрессию. Исследования показывают, что нарушения сна могут привести к апноэ"
        href="#rem"
        mode="tint"
      />
      </CardGrid>
      </Group>
      <Group separator='hide' header={<Header mode="secondary">Последовательность фаза</Header>}>
      <CardGrid size='l'>
      <ContentCard
        header="1 цикл"
        text="NREM 1-NREM 2-NREM 3"
        mode="tint"
      />
      <ContentCard
        header="2 цикл"
        text="NREM 2-NREM 3-NREM 2-REM"
        mode="tint"
      />
      <ContentCard
        header="3 цикл"
        text="NREM 1-NREM 2-NREM 3"
        mode="tint"
      />
      <ContentCard
        header="4 цикл"
        text="NREM 1-NREM 2-NREM 3-NREM 2-REM"
        mode="tint"
      />
      <ContentCard
        header="5 цикл"
        text="NREM 1-NREM 2-кратковременное пробуждение"
        mode="tint"
      />
      <ContentCard
        header="6 цикл"
        text="NREM 1-NREM 2-REM-NREM 2"
        mode="tint"
      />
      </CardGrid>
      </Group>
    </Panel>
    {snackbar}
    </SplitLayout>
  );
};
TwoPage.propTypes = {
    id: PropTypes.string.isRequired,
  };