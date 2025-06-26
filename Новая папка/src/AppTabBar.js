import {
  Tabbar as VUITabbar,
  TabbarItem as VUITabbarItem,
  ContentBadge
} from '@vkontakte/vkui';
import {
    Icon28NewsfeedOutline, Icon28MoonOutline,Icon28Profile,Icon28MagicWandOutline,
    Icon28BookSpreadOutline
} from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW } from './routes';

export const AppTabBar = ({ activeStory }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <VUITabbar>
      <VUITabbarItem
        onClick={() => void routeNavigator.push('/')}
        selected={activeStory === DEFAULT_VIEW.HOME}
        data-story={DEFAULT_VIEW.HOME}
        text="Главная"
      >
        <Icon28NewsfeedOutline />
      </VUITabbarItem>
      <VUITabbarItem
        onClick={() => void routeNavigator.push('/chatassistant')}
        selected={activeStory === DEFAULT_VIEW.CHAT}
        data-story={DEFAULT_VIEW.CHAT}
        text="ИИ Асистент"
      >
        <Icon28MagicWandOutline />
      </VUITabbarItem>
      <VUITabbarItem
        onClick={() => void routeNavigator.push('/phases')}
        selected={activeStory === DEFAULT_VIEW.PHASES}
        data-story={DEFAULT_VIEW.PHASES}
        text="Фазы сна"
      >
        <Icon28MoonOutline />
      </VUITabbarItem>
      <VUITabbarItem
        onClick={() => void routeNavigator.push('/guide')}
        selected={activeStory === DEFAULT_VIEW.PERSIK}
        data-story={DEFAULT_VIEW.PERSIK}
        text="Справочник"
      >
        <Icon28BookSpreadOutline />
      </VUITabbarItem>
      <VUITabbarItem
        onClick={() => void routeNavigator.push('/profile')}
        selected={activeStory === DEFAULT_VIEW.PROFILE}
        data-story={DEFAULT_VIEW.PROFILE}
        text="Профиль"
      >
        <Icon28Profile />
      </VUITabbarItem>
    </VUITabbar>
  );
};
