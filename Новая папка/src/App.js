import React, { useState, useEffect,useLocation } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, TabbarItem, Tabbar, Snackbar, Spacing, usePlatform, useAdaptivityConditionalRender, PanelHeader,Panel,Button,
  ModalRoot,ModalCard,ModalPage,Tabs,TabsItem,PanelHeaderButton,PanelHeaderClose,ModalPageHeader,
  Group,Cell, Epic
} from '@vkontakte/vkui';
import {Icon16Moon,Icon16Sun,Icon16Help
} from '@vkontakte/icons'
import { useActiveVkuiLocation,useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Persik, Home,Profile,Phases,OnePage,TwoPage,ThreePage,FourPage,FivePage,SixPage,SevenPage,ReportPage,
  EightPage,NinePage,TenPage,ElevenPage,FaqTwo, FaqThree, FaqFour, FaqFive,
  FaqOne,
  Chat
 } from './panels';
 import { Pro } from './Pro';
import { DEFAULT_VIEW_PANELS,DEFAULT_VIEW } from './/routes';
import {AppTabBar} from './AppTabBar';
import Modal from './ModalRoot';
const MODAL_PAGE_PRO = 'modal_page_pro';
const MODAL_CARD_Moon = 'modal-card1';
const MODAL_CARD_Sun = 'modal-card2';
const MODAL_CARD_Help = 'modal-card3';
const KEY_ONBOARDING1 = 'onboarding_shown';
export const App = ({id}) => {
  const [fetchedUser, setUser] = useState();
  const routeNavigator = useRouteNavigator();
  const {view: activeView, panel: activePanel = DEFAULT_VIEW_PANELS.HOME} = useActiveVkuiLocation();
  const [fetchedCases, setCases, cases] = useState();
  const [popout, setPopout] = useState();
  const platform = usePlatform();
  const { sizeX } = useAdaptivityConditionalRender();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [snackbar, setSnackbar] = React.useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalHistory, setModalHistory] = useState([]);
  const [isOnboardingShown, setIsOnboardingShown] = useState(false);
  const [selected, setSelected] = useState('news');
  const [menuOpened, setMenuOpened] = useState(false);
  const modalBack = () => {
    if (modalHistory.length > 1) {
      const newHistory = modalHistory.slice(0, -1);
      setActiveModal(newHistory[newHistory.length - 1]);
      setModalHistory(newHistory);
    } else {
      setActiveModal(null);
      setModalHistory([]);
    }
  };
const modal = (
    <ModalRoot activeModal={activeModal} onClose={modalBack} id={id}>
      <ModalCard
                id={MODAL_CARD_Moon}
                onClose={modalBack}
                icon={<Icon16Moon />}
                header="Во сколько мне ложиться спать?"
                subheader="Укажите время, в которое вы хотели бы встать, нажмите Рассчитать. Этот расчет учитывает фазы сна и позволит вам проснуться в идеальное время."
                actions={
                  <React.Fragment>
                    <Spacing size={16} />
                  </React.Fragment>
                }
              />
              <ModalCard
                id={MODAL_CARD_Sun}
                onClose={modalBack}
                icon={<Icon16Sun />}
                header="Во сколько мне нужно проснуться?"
                subheader="Укажите время, в которое вы ложитесь спать и нажмите Рассчитать. Учтите также примерное время, которое вам нужно для засыпания-добавьте его при вводе времени. Этот расчет учитывает фазы сна и позволит вам проснуться в идеальное время."
                actions={
                  <React.Fragment>
                    <Spacing size={16} />
                  </React.Fragment>
                }
              />
    <ModalCard
                id={MODAL_CARD_Help}
                onClose={modalBack}
                icon={<Icon16Help />}
                header="Как использовать?"
                subheader="Укажите время, в которое вы хотели бы встать, нажмите Рассчитать. Если хотите сохранить время, нажмите на кнопку Избранное"
                actions={
                  <React.Fragment>
                    <Spacing size={16} />
                  </React.Fragment>
                }
              />
              <ModalPage
              id={MODAL_PAGE_PRO}
              onClose={modalBack}
              settlingHeight={100}
              hideCloseButton={platform === 'ios'}
              header={
                <ModalPageHeader
                before={
                sizeX.compact &&
                platform === 'android' && (
                  <PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />
                )
              }
          after={
            sizeX.compact &&
            platform === 'ios' && (
              <PanelHeaderButton className={sizeX.compact.className} onClick={modalBack}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            )
          }
        >
          Подписка PRO
        </ModalPageHeader>
      }
    >
        <Pro/>
    </ModalPage>
    </ModalRoot>
)
  const openModal = (modalId) => {
    setActiveModal(modalId);
    setModalHistory(prev => [...prev, modalId]);
  };
  
  const activeStoryStyles = {
    backgroundColor: 'var(--vkui--color_background_secondary)',
    borderRadius: 8,
  };
  const hasHeader = platform !== 'vkcom';
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
      bridge.send('VKWebAppShowBannerAd', {
        banner_location: 'bottom'
      });

      // Проверка, был ли уже показан онбординг
      const storageResult = await bridge.send("VKWebAppStorageGet", { keys: [KEY_ONBOARDING1] });
      if (storageResult.keys[0].value !== 'true') {
        showOnboarding();
      } else {
        setIsOnboardingShown(true);
        console.log('Онбординг уже показан');
      }
    }
    fetchData();
  }, []);

  const showOnboarding = async () => {
    try {
      const imageUrls = [
        "https://sun9-79.userapi.com/impg/rhoYWXY9N6vJ-NI8zvDHkSaF2eBc_iDcUgkiIQ/Dy3BQYjWtQ0.jpg?size=932x1355&quality=95&sign=7d51caa3a40885d2d2f623d4037a5f83&type=album",
        "https://sun9-56.userapi.com/impg/Onzs6w4orlN7RRb_M8DSGpA8yAxHN23wEh0PYw/5Ge3zYFFltw.jpg?size=892x1346&quality=95&sign=72dc2635722f0be41cce0d79da63b1bb&type=album",
        "https://psv4.userapi.com/s/v1/d/MRHXn0wqBjxrSBkTcMYQHyDR20TqLQNo6sC43Gn197TeHoUKIkqJIFnh2jOGgau_iZPGOjfPJvdkJhdbX-d0fjpSPJjitQo2YvGeG7XtevgYkKuCCHuZPQ/Dy3BQYjWtQ0.png",
      ];

      const base64Images = await loadImages(imageUrls);

      const result = await bridge.send('VKWebAppShowSlidesSheet', {
        slides: [
          {
            media: {
              blob: base64Images[0],
              type: 'image'
            },
            title: 'Добро пожаловать!',
            subtitle: 'Здесь вы найдете удобный инструмент для расчета идеального времени сна, а также подробный пофазный расчет'
          },
          {
            media: {
              blob: base64Images[1],
              type: 'image'
            },
            title: 'Используйте справочник',
            subtitle: 'Чтобы более эффективно рассчитать время сна. В нем вы найдете все о сне, фазах и продолжительности сна для разных возрастов'
          },
          {
            media: {
              blob: base64Images[2],
              type: 'image'
            },
            title: 'Сохраняйте время',
            subtitle: 'Чтобы получать быстрый доступ к нему'
          }
        ]
      });

      if (result.result) {
        // Сохранение состояния онбординга в хранилище
        await bridge.send("VKWebAppStorageSet", { key: KEY_ONBOARDING1, value: 'true' });
        setIsOnboardingShown(true);
        console.log('Онбординг успешно пройден');
      } else {
        console.error('Произошла ошибка при показе онбординга');
      }
    } catch (error) {
      console.error('Ошибка при показе онбординга:', error);
    }
  };

  // Функция для загрузки изображений и преобразования их в Base64
  const loadImages = async (urls) => {
    const promises = urls.map(getBase64FromUrl);
    return Promise.all(promises);
  };

  const getBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Ошибка при загрузке изображения ${url}:`, error);
    }
  };
  
  return (
    <SplitLayout header={hasHeader && <PanelHeader delimiter="none" />} popout={popout} center modal={modal}>
      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        {snackbar}
        <Epic
          activeStory={activeView ?? DEFAULT_VIEW.HOME}
          tabbar={
            <AppTabBar
            activeStory={activeView}
          />
          }
        >
          <View id={DEFAULT_VIEW.HOME} activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedCases={fetchedCases} openModal={openModal}/>
          </View>
          <View id={DEFAULT_VIEW.PHASES} activePanel={activePanel}>
          <Phases id={DEFAULT_VIEW_PANELS.PHASES} />
          </View>
          <View id={DEFAULT_VIEW.CHAT} activePanel={activePanel}>
          <Chat id={DEFAULT_VIEW_PANELS.CHAT} openModal={openModal}/>
          </View>
          <View id={DEFAULT_VIEW.PERSIK} activePanel={activePanel}>
          <Persik id={DEFAULT_VIEW_PANELS.PERSIK} />
          <OnePage id={DEFAULT_VIEW_PANELS.ONEPAGE} />
          <TwoPage id={DEFAULT_VIEW_PANELS.TWOPAGE} />
          <ThreePage id={DEFAULT_VIEW_PANELS.THREEPAGE} />
          <FourPage id={DEFAULT_VIEW_PANELS.FOURPAGE} />
          <FivePage id={DEFAULT_VIEW_PANELS.FIVEPAGE} />
          <SixPage id={DEFAULT_VIEW_PANELS.SIXPAGE} />
          <SevenPage id={DEFAULT_VIEW_PANELS.SEVENPAGE} />
          <EightPage id={DEFAULT_VIEW_PANELS.EIGHTPAGE} />
          <NinePage id={DEFAULT_VIEW_PANELS.NINEPAGE} />
          <TenPage id={DEFAULT_VIEW_PANELS.TENPAGE} />
          <ElevenPage id={DEFAULT_VIEW_PANELS.ELEVENPAGE} />
          <FaqOne id={DEFAULT_VIEW_PANELS.FAQONE} />
          <FaqTwo id={DEFAULT_VIEW_PANELS.FAQTWO} />
          <FaqThree id={DEFAULT_VIEW_PANELS.FAQTHREE} />
          <FaqFour id={DEFAULT_VIEW_PANELS.FAQFOUR} />
          <FaqFive id={DEFAULT_VIEW_PANELS.FAQFIVE} />
          </View>
          <View id={DEFAULT_VIEW.PROFILE} activePanel={activePanel}>
          <Profile id={DEFAULT_VIEW_PANELS.PROFILE} fetchedUser={fetchedUser}/>
          <ReportPage id={DEFAULT_VIEW_PANELS.REPORT}/>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
