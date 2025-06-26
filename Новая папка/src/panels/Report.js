import { Panel, PanelHeader, Header, Button, Group, CellButton, PanelHeaderBack, Div, Textarea, FormItem,
    IconButton
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon28Users3Outline, Icon28EditOutline, Icon28AddSquareOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import React, { useState, useEffect } from 'react';

export const ReportPage = ({ id }) => {
    const routeNavigator = useRouteNavigator();
    const [isSubscribed, setSubscribed] = useState(false);
    const [checkingSubscription, setCheckingSubscription] = useState(true);

    const checkSubscription = async () => {
        try {
            const response = await bridge.send("VKWebAppGetGroupInfo", { "group_id": 228493170 });
            if (response.groups && response.groups.length > 0) {
                const group = response.groups[0];
                setSubscribed(group.is_member === 1);
            }
        } catch (error) {
            console.error("Ошибка проверки подписки:", error);
        } finally {
            setCheckingSubscription(false);
        }
    };

    const subscribeToCommunity = async () => {
        try {
            await bridge.send("VKWebAppJoinGroup", { "group_id": 228493170 });
            setSubscribed(true);
        } catch (error) {
            console.error("Ошибка подписки:", error);
        }
    };

    useEffect(() => {
        checkSubscription();
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                Сообщить об ошибке
            </PanelHeader>
            <Group separator='hide'>
                <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CellButton before={<Icon28Users3Outline />} href='https://vk.me/club228493170' target='_blank'>
                        Перейти в сообщения сообщества
                    </CellButton>
                    {!isSubscribed && (
                        <IconButton
                            label="Подписаться"
                            onClick={subscribeToCommunity}
                        >
                            <Icon28AddSquareOutline />
                        </IconButton>
                    )}
                </Div>
            </Group>
            <Group header={<Header mode="secondary">Или</Header>} separator='hide'>
            <FormItem>
            <Textarea placeholder="Оставте предложение или сообщите об ошибке" />
            <CellButton mode='primary'>
            Отправить
            </CellButton>
          </FormItem>
            </Group>
        </Panel>
    );
};
