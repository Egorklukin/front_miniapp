import { Tabs, TabsItem, FixedLayout, IconButton } from '@vkontakte/vkui';
import { useSearchParams } from '@vkontakte/vk-mini-apps-router';
import { Icon16Moon, Icon16Sun, Icon20HelpOutline } from '@vkontakte/icons';
import { DEFAULT_TABS } from '../routes';
import { useState } from 'react';

export const AppTabs = ({ onMenuClick }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(DEFAULT_TABS.MOONTAB);

    return (
        <FixedLayout vertical="bottom">
            <Tabs>
                <TabsItem
                    before={<Icon16Moon />}
                    after={
                        <IconButton label="Помощь" >
                            <Icon20HelpOutline />
                        </IconButton>
                    }
                    selected={selectedTab === DEFAULT_TABS.MOONTAB}
                    onClick={() => {
                        if (selectedTab === DEFAULT_TABS.MOONTAB) {
                            onMenuClick(true);
                        }
                        setSelectedTab(DEFAULT_TABS.MOONTAB);
                    }}
                    id="tab-news"
                    aria-controls="tab-content-news"
                >
                    Лечь в
                </TabsItem>
                <TabsItem
                    before={<Icon16Sun />}
                    after={
                        <IconButton label="Помощь" >
                            <Icon20HelpOutline />
                        </IconButton>
                    }
                    selected={selectedTab === DEFAULT_TABS.SUNTAB}
                    onClick={() => {
                        onMenuClick(false);
                        setSelectedTab(DEFAULT_TABS.SUNTAB);
                    }}
                    id="tab-recommendations"
                    aria-controls="tab-content-recommendations"
                >
                    Встать в
                </TabsItem>
            </Tabs>
        </FixedLayout>
    );
};

export default AppTabs;