import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SplitLayout,
  Textarea,
  Button,
  Snackbar,
  FormItem,
} from '@vkontakte/vkui';
import { useRouteNavigator, useFirstPageCheck } from '@vkontakte/vk-mini-apps-router';
import { Icon28CheckCircleOutline } from '@vkontakte/icons';
import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

export const FaqFive = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const [report, setReport] = useState('');
  const [snackbar, setSnackbar] = useState(null);

  const openSuccessSnackbar = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
        offsetY={40}
      >
        Сообщение отправлено
      </Snackbar>,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'messages.send',
        params: {
          user_id: 551802191, // ID пользователя, которому отправляется сообщение
          message: report,
          random_id: Math.floor(Math.random() * 1000000), // Обязательно указывайте random_id для предотвращения повторной отправки
          access_token: 'vk1.a.x-tP0QYYhqRNi9Ixf8_py3CPFigf0m7o5SNWFprw1Bb6frTSomwAiNxAbKBR39u2rD-v-CUo6MohMo4P7TBFeDUCmJlHbEPsA5yMJuZF2ynnNnnZA66bxQieJ9pQf3iodCsev9lab7uBnf27hk03WpHJaG5gjRqbV9G7mqk3DYqegYAvQ8jTsbtmxacW-t6HzDbX3vLPAIoomvmtXmisKw', // Ваш токен доступа
          v: '5.131',
        },
      });

      if (response.response) {
        openSuccessSnackbar();
        setReport(''); // Очищаем поле ввода после успешной отправки
      }
    } catch (error) {
      console.error('Ошибка во время отправки сообщения:', error);
      // Реализуйте обработку ошибок, если это необходимо
    }
  };

  return (
    <SplitLayout>
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => isFirstPage ? routeNavigator.replace('/guide') : routeNavigator.back()} />}
        >
          Сообщить об ошибке
        </PanelHeader>
        <form onSubmit={handleSubmit}>
          <FormItem
            htmlFor="report"
            top="Сообщение об ошибке"
            required
          >
            <Textarea
              id="report"
              name="report"
              value={report}
              required
              onChange={(e) => setReport(e.target.value)}
              placeholder="Введите ваше сообщение"
            />
          </FormItem>
          <Button type="submit" size="l" stretched>
            Отправить
          </Button>
        </form>
        {snackbar}
      </Panel>
    </SplitLayout>
  );
};
