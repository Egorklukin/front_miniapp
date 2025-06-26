import { Panel, PanelHeader, Header, Button, Group, SplitLayout, Switch, Avatar, Placeholder, CellButton, ModalRoot,PanelHeaderBack,View,
  Snackbar,ModalCard,Spacing,Image,usePlatform,Link,SelectionControl,Alert,Div,Caption,IconButton,FormLayoutGroup,
  FormItem,ScreenSpinner,
  Accordion
 } from '@vkontakte/vkui';
 import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
 import PropTypes from 'prop-types';
 import {Icon28ShareOutline, Icon28FavoriteOutline, Icon28ThumbsUpOutline,Icon28CheckCircleOutline,Icon28Users3Outline,Icon28EditOutline,
  Icon28AddSquareOutline,Icon28BugOutline,Icon24MinusSquareOutline,
   Icon28DeleteOutline 
 } from '@vkontakte/icons'
 import bridge from '@vkontakte/vk-bridge';
 import React,{useState,useEffect} from 'react';
 const MODAL_CARD = 'modal-card1';
 const MODAL_CARD2 = 'modal-card2';
 const MODAL_CARD3 = 'modal-card3';
 const KEY_STORAGE_FAVORITES = 'isAddedToFavorites';
 const KEY_STORAGE_RECOMMEND = 'isRecommend';
 const KEY_STORAGE_ADD_SCRIN='isAddScrin';
 const KEY_STORAGE_ADD_PROFILE='isAddProfile';
 const STORAGE_KEY_NOTIFICATIONS = 'notificationsEnabled';
 const STORAGE_KEY_MESSAGES_FROM_GROUP = 'messagesFromGroupAllowed';
 const KEY_ONBOARDING1 = 'onboarding_shown';
 const STORAGE_KEY_MOON_WAKE_UP = 'wakeUpTime1';
const STORAGE_KEY_MOON_OTHER_1 = 'otherTime1_2';
const STORAGE_KEY_MOON_OTHER_2 = 'otherTime1_3';
const STORAGE_KEY_MOON_ENTERED_TIME = 'enteredWakeUpTime';
const STORAGE_KEY_MOON_SAVED_TIMES = 'savedTimes';
const STORAGE_KEY_SUN_WAKE_UP = 'wakeUpTime2';
const STORAGE_KEY_SUN_OTHER_1 = 'otherTime2_2';
const STORAGE_KEY_SUN_OTHER_2 = 'otherTime2_3';
const STORAGE_KEY_SUN_ENTERED_TIME = 'enteredWakeUpTime2';
const STORAGE_KEY_SUN_SAVED_TIMES = 'savedTimes2';
 export const Profile = ({ id, fetchedUser }) => {
  const [activePanel, setActivePanel] = useState(id);
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const noop = () => {};
  const [snackbar, setSnackbar] = React.useState(null);
  const [inputValue, setInputValue] = useState('');
  const platform = usePlatform();
  const [activeModal, setActiveModal] = useState(null);
  const [modalHistory, setModalHistory] = useState([]);
  const [communityToken, setCommunityToken] = useState(null);
  const [isRecommend, setIsRecommend] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddScrin, setIsAddScrin] = useState(false);
  const [isAddProfile, setIsAddProfile] = useState(false);
  const [notificationsEnabled1, setNotificationsEnabled1] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [popout, setPopout] = React.useState(null);
  const [messagesFromGroupAllowed, setMessagesFromGroupAllowed] = useState(false);
  const [isSubscribed, setSubscribed] = React.useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [savedTimes, setSavedTimes] = useState([]);
  const [enteredWakeUpTime, setEnteredWakeUpTime] = useState('');
  const [otherTime1_2, setOtherTime1_2] = useState('');
    const [otherTime1_3, setOtherTime1_3] = useState('');
    const [wakeUpTime1, setWakeUpTime1] = useState('');
  const infoStyle = { color: 'var(--vkui--color_text_subhead)' };
    // Получение данных из хранилища при монтировании компонента
useEffect(() => {
  const fetchData = async () => {
    try {
      const storageResult = await bridge.send("VKWebAppStorageGet", { keys: [ STORAGE_KEY_MESSAGES_FROM_GROUP] });
      if (storageResult.keys.find(key => key.key === STORAGE_KEY_MESSAGES_FROM_GROUP)?.value === 'true') {
        setMessagesFromGroupAllowed(true);
      }if (storageResult.keys.find(key => key.key === STORAGE_KEY_MESSAGES_FROM_GROUP)?.value === 'false') {
        setMessagesFromGroupAllowed(false);
      }
    } catch (error) {
      console.error('Error getting data from storage:', error);
    }
  };
  fetchData();
}, []);
  const AccordionVKID = () => {
    const data = [
      {
        id: 1,
        title: 'Уведомления',
      }
    ];
    // Состояние для отслеживания открытого элемента аккордеона
    const [openId, setOpenId] = React.useState(2);
    const handleAccordionToggle = (id) => {
      if (openId !== id) {
        setOpenId(id);
      } else {
        setOpenId(null);
      }
    };
  // Рендеринг элементов аккордеона
  return data.map((item) => (
    <Accordion
      key={item.id}
      expanded={openId === item.id}
      onChange={() => handleAccordionToggle(item.id)}
    >
      <Accordion.Summary>{item.title}</Accordion.Summary>
      <Accordion.Content>
      <div style={infoStyle}>
          <SelectionControl disabled={messagesFromGroupAllowed}>
            <SelectionControl.Label description={
              <div>
              <Caption hidden={messagesFromGroupAllowed} level="1">
                Чтобы ложиться или засыпать вовремя
              </Caption>
              <Caption hidden={!messagesFromGroupAllowed} level="1">
                Чтобы запретить отправлять сообщения-перейдите на
                <Link href="https://vk.com/club228493170" target="_blank">
                  страницу сообщества
                </Link>
                и запретите отправку вручную
              </Caption>
              </div>}>
              Разрешить получение сообщений от сообщества
            </SelectionControl.Label>
            <Switch
              checked={messagesFromGroupAllowed}
              onChange={(e) => {
                e.preventDefault();
                requestMessagePermission(e.target.checked);
              }}
            />
          </SelectionControl>
          <SelectionControl>
            <SelectionControl.Label>Разрешить получение уведомлений</SelectionControl.Label>
            <Switch
              checked={notificationsEnabled1}
              onChange={(e) => {
                e.preventDefault();
                toggleNotifications(e.target.checked);
              }}
            />
          </SelectionControl>
        </div>
      </Accordion.Content>
    </Accordion>
  ));
};
const openSuccess = () => {
  if (snackbar) return;
  setSnackbar(
    <Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
      offsetY={40}
    >
      Данные сброшены
    </Snackbar>,
  );
};
  const closePopout = () => {
    setPopout(null);
  };
  
  const showAlert = () => {
    setPopout(
      <Alert
      actions={[
        {
          title: 'Отмена',
          mode: 'cancel',
        },
        {
          title: 'Удалить',
          mode: 'destructive',
          action: () => resetStorage(),
        },
      ]}
      actionsLayout="horizontal"
      dismissButtonMode="inside"
      onClose={closePopout}
      header="Сброс сохраненных данных"
      text="Вы уверены, что хотите удалить все сохраненные данные?"
    />);
  };
  const resetStorage = async () => {
    try {
      await bridge.send("VKWebAppStorageSet", { key: KEY_STORAGE_ADD_SCRIN, value: 'false' });
      await bridge.send("VKWebAppStorageSet", { key: KEY_STORAGE_ADD_PROFILE, value: 'false' });
      await bridge.send("VKWebAppStorageSet", { key: KEY_ONBOARDING1, value: 'false' });
      clearStorage();
      openSuccess()
    } catch (error) {
      console.error('Произошла ошибка при сбросе значения:', error);
    }
  };
  const clearStorage = () => {
    // Очистка сохраненных времен
    setSavedTimes([]);
    setWakeUpTime1('');
    setOtherTime1_2('');
    setOtherTime1_3('');
    setEnteredWakeUpTime('');

    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_WAKE_UP, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_1, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_2, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_ENTERED_TIME, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_SAVED_TIMES, value: JSON.stringify([]) }); // Пустой массив
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_WAKE_UP, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_1, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_2, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_ENTERED_TIME, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_SAVED_TIMES, value: JSON.stringify([]) }); // Пустой массив
  };
   useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        const storageResult2 = await bridge.send("VKWebAppStorageGet", { keys: [KEY_STORAGE_RECOMMEND] });
        const storageResult3 = await bridge.send("VKWebAppStorageGet", { keys: [KEY_STORAGE_ADD_SCRIN] });
        const storageResult4 = await bridge.send("VKWebAppStorageGet", { keys: [KEY_STORAGE_ADD_PROFILE] });
        if (storageResult2.keys[0].value === 'true') {
          setIsRecommend(true);
        }
        if (storageResult2.keys[0].value === 'false') {
          setIsRecommend(false);
        }
        if (storageResult3.keys[0].value === 'true') {
          setIsAddScrin(true);
        }
        if (storageResult3.keys[0].value === 'false') {
          setIsAddScrin(false);
        }
        if (storageResult4.keys[0].value === 'true') {
          setIsAddProfile(true);
        }
        if (storageResult4.keys[0].value === 'false') {
          setIsAddProfile(false);
        }
      } catch (error) {
        console.error('Error getting data from storage:', error);
      }
    };
    getDataFromStorage();
  }, []);
  // Проверка, добавлен ли сервис в избранное
  useEffect(() => {
    const checkIfFavorite = async () => {
      const launchParams = await bridge.send('VKWebAppGetLaunchParams');
      if (launchParams && launchParams.vk_is_favorite==1) {
        setIsFavorite(true);
      }
      else {
        setIsFavorite(false);
      }
    };
    checkIfFavorite();
  }, []);

  const addToFavorites = async () => {
    try {
      const result = await bridge.send('VKWebAppAddToFavorites');
      if (result && result.result) {
        setIsFavorite(true);
      } else {
        console.error('Ошибка при добавлении в избранное');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  const AppRecommend = async () => {
    try {
      const result2 = await bridge.send('VKWebAppRecommend');
      if (result2.result) {
        // Сохраняем состояние кнопки в хранилище
        await bridge.send("VKWebAppStorageSet", { key: KEY_STORAGE_RECOMMEND, value: 'true' });
        setIsRecommend(true);
        console.log('Мини-приложение рекомендуется');
      } else {
        console.log('Ошибка', error);
      }
    } catch (error) {
      console.error('Error app recommend:', error);
    }
  };
   const AddToHomeScreen = async () => {
     try {
       const result3 = await bridge.send('VKWebAppAddToHomeScreen');
       if (result3.result) {
        await bridge.send("VKWebAppStorageSet", { key: KEY_STORAGE_ADD_SCRIN, value: 'true' });
        setIsAddScrin(true);
         // Мини-приложение или игра добавлены в избранное
         console.log('Мини-приложение добавлено на главный экран');
       } else {
         console.log('Ошибка',error);
       }
     } catch (error) {
       console.log(error);
     }
   };
   const Share = async () => {
     try {
       const result4 = await bridge.send('VKWebAppShare', {
   link: 'https://vk.com/app52702816'
   });
       if (result4.result) {
         console.log('');
       } else {
         console.log('Ошибка',error);
       }
     } catch (error) {
       console.log(error);
     }
   };
   const handleChange = (e) => {
    setInputValue(e.target.value);
  };
const generateRandomId = (min, max) => {
  const range = BigInt(max) - BigInt(min) + BigInt(1);
  const rand = BigInt(Math.floor(Math.random() * Number(range)));
  return BigInt(min) + rand;
};

const sendToCommunity = async () => {
  if (!communityToken) {
    console.log('Сначала получите токен сообщества');
    ErrorSendMes()
    return;
  }
  try {
    // Генерация случайного числа в пределах int64
    const randomId = generateRandomId(BigInt(-9223372036854775808), BigInt(9223372036854775807));
    await bridge.send('VKWebAppCallAPIMethod', {
      method: 'messages.send',
      params: {
        group_id:'228493170',
        peer_id: '-228493170',
        message: inputValue,
        random_id: Number(randomId),
        access_token: communityToken,
        v: '5.131',
      },
    });
    console.log('Токен получен');
  } catch (error) {
    console.error(error);
    console.log('Ошибка при отправке сообщения');
    ErrorSendMes(error)
  }
};
// Обработчик переключения разрешения уведомлений
const toggleNotifications = async (checked) => {
  if (checked) {
    // Запрашиваем разрешение на уведомления
    try {
      const result = await bridge.send("VKWebAppAllowNotifications");
      if (result.result) {
        // Уведомления разрешены, сохраняем состояние
        setNotificationsEnabled1(true);
        await bridge.send("VKWebAppStorageSet", { key: STORAGE_KEY_NOTIFICATIONS, value: 'true' });
      } else {
        // Пользователь отклонил запрос, оставляем переключатель выключенным
        setNotificationsEnabled1(false);
      }
    } catch (error) {
      console.error('Error allowing notifications:', error);
    }
  } else {
    // Отключаем уведомления
    try {
      await bridge.send("VKWebAppDenyNotifications");
      setNotificationsEnabled1(false);
      await bridge.send("VKWebAppStorageSet", { key: STORAGE_KEY_NOTIFICATIONS, value: 'false' });
    } catch (error) {
      console.error('Error denying notifications:', error);
    }
  }
};
const requestMessagePermission = async (checked) => {
  if (checked) {
    // Запрашиваем разрешение на уведомления
    try {
      const result = await bridge.send('VKWebAppAllowMessagesFromGroup', {
        group_id: 228493170,
        key: 'dBuBKe1kFcdemzB' 
        })
      if (result.result) {
        // Уведомления разрешены, сохраняем состояние
        setMessagesFromGroupAllowed(true);
        await bridge.send("VKWebAppStorageSet", { key: STORAGE_KEY_MESSAGES_FROM_GROUP, value: 'true' });
      } else {
        // Пользователь отклонил запрос, оставляем переключатель выключенным
        setMessagesFromGroupAllowed(false);
      }
    } catch (error) {
      console.error('Error allowing notifications:', error);
    }
  }
};
const checkSubscription = async () => {
  try {
      const response = await bridge.send("VKWebAppGetGroupInfo", {"group_id": 228493170});
      if (response.groups && response.groups.length > 0) {
          const group = response.groups[0];
          setSubscribed(group.is_member === 1);
      }
  } catch (error) {
      console.error("Ошибка проверки подписки:", error);
  }finally {
    setCheckingSubscription(false);
  }
};


useEffect(() => {
checkSubscription();
}, []);
if (checkingSubscription) {
  return <ScreenSpinner size='large'/>;
}
  const changeActiveModal = (activeModal) => {
    activeModal = activeModal || null;
    let localModalHistory = modalHistory ? [...modalHistory] : [];

    if (activeModal === null) {
      localModalHistory = [];
    } else if (modalHistory.includes(activeModal)) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
    } else {
      localModalHistory.push(activeModal);
    }

    setActiveModal(activeModal);
    setModalHistory(localModalHistory);
  };
  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
  };
  const modal = (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
    <ModalCard
        id={MODAL_CARD}
        onClose={() => changeActiveModal(null)}
        header="Где найти кнопку?"
        subheader={platform === 'android' && ("Нажмите ≡ → Настройки → Приватность, перейдите к блоку Сервисы в профиле")||
          platform === 'vkcom' && ("Нажмите Мой профиль → Настройки.Перейдите на вкладку Приватность.Настройте видимость в блоке Сервисы в профил")||
          platform === 'ios' && ("Нажмите ≡ → Настройки → Приватность, перейдите к блоку Сервисы в профиле")
        }
        actions={
          <React.Fragment>
            <Spacing size={16} />
            <Button
              size="l"
              mode="primary"
              stretched
              onClick={() => changeActiveModal(MODAL_CARD2)}
            >
              Далее
            </Button>
          </React.Fragment>
        }
      />
      <ModalCard
        id={MODAL_CARD2}
        onClose={() => changeActiveModal(null)}
        header="Как удалить кнопку вручную?"
        subheader={platform === 'android' && ("Перейдите в раздел Сервисы.Откройте мини-приложение и нажмите ≡.Нажмите Удалить со страницы профиля.")||
          platform === 'ios' && ("Перейдите в раздел Сервисы.Откройте мини-приложение и нажмите ≡.Нажмите Удалить со страницы профиля.")||
          platform === 'vkcom' && ("Перейдите в раздел Сервисы.Откройте мини-приложение и нажмите Действия.Нажмите Удалить со страницы профиля.")
        }
        actions={
          <React.Fragment>
            <Spacing size={16} />
            <Button
              size="l"
              mode="primary"
              stretched
              onClick={() => changeActiveModal(MODAL_CARD3)}
            >
              Далее
            </Button>
          </React.Fragment>
        }
      />
      <ModalCard
        id={MODAL_CARD3}
        onClose={() => changeActiveModal(null)}
        header="Как редактировать видимость?"
        subheader={platform === 'android' && ("Во вкладке Сервисы нажмите Действия → Настройки → Приватность.Настройте видимость в блоке Сервисы в профиле.")||
          platform === 'ios' && ("Во вкладке Сервисы нажмите Действия → Настройки → Приватность.Настройте видимость в блоке Сервисы в профиле.")||
          platform === 'vkcom' && ("Нажмите Мой профиль → Настройки.Перейдите на вкладку Приватность.Настройте видимость в блоке Сервисы в профиле.")
        }
        actions={
          <React.Fragment>
            <Spacing size={16} />
            <Button
              size="l"
              mode="primary"
              stretched
              onClick={() => changeActiveModal(null)}
            >
              Хорошо
            </Button>
          </React.Fragment>
        }
      />
      </ModalRoot>
)
   return (
    <SplitLayout popout={popout}>
     <Panel id={id}>
       <PanelHeader>Профиль</PanelHeader>
         <Group>
           <Header
           mode='secondary'
           >
            Профиль
           </Header>
             <Placeholder
               icon={photo_200 && <Avatar src={photo_200}/>}
               header={`${first_name} ${last_name}`}
             >
             </Placeholder>
             <Header
           mode='secondary'
           >
            Другое
           </Header>
           
           <Group mode="plain">
           {!isFavorite ? (
            <CellButton onClick={addToFavorites}
            before={<Icon28FavoriteOutline/>}
            >Добавить в избранное</CellButton>
            ) : (
            <CellButton disabled mode="secondary"
            before={<Icon28FavoriteOutline/>}
            >Добавлено в избранное</CellButton>
            )}
             {!isRecommend ? (
            <CellButton onClick={AppRecommend}
            before={<Icon28ThumbsUpOutline/>}
            >Рекомендовать</CellButton>
            ) : (
            <CellButton disabled mode="secondary"
            before={<Icon28ThumbsUpOutline/>}
            >Уже рекомендуете</CellButton>
            )}
             <CellButton onClick={Share} before={<Icon28ShareOutline/>}>
               Поделиться
             </CellButton>
            
             <CellButton onClick={() => routeNavigator.push('report')} before={<Icon28BugOutline/>}
             >
               Сообщить об ошибке
             </CellButton>
             <AccordionVKID />
            <CellButton onClick={showAlert} before={<Icon28DeleteOutline/>}
             >
              Удалить
             </CellButton>
           </Group>
         </Group>
     </Panel>
     {snackbar}
    </SplitLayout>
   );
 };
 
 
 Profile.propTypes = {
   id: PropTypes.string.isRequired,
   fetchedUser: PropTypes.shape({
     photo_200: PropTypes.string,
     first_name: PropTypes.string,
     last_name: PropTypes.string,
     bdate: PropTypes.string,
     city: PropTypes.shape({
       title: PropTypes.string,
     }),
   }),
 };
 