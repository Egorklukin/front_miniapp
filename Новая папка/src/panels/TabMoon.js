import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  FormLayoutGroup,
  Input,
  FormItem,
  Button,
  NativeSelect,
  Group,
  Link,
  Div,
  Headline,
  ScreenSpinner,
  IconButton,
  Alert,
  Popover,
  SplitLayout,
  CardGrid,
  Placeholder,
  Footnote,
  ContentCard,
  Header,
  Card
} from '@vkontakte/vkui';
import { Icon16ArrowTriangleUp, Icon56MoonOutline, Icon16HelpOutline, Icon20FavoriteOutline, Icon56FavoriteOutline,Icon20Favorite,
  Icon16ArrowTriangleDown
} from '@vkontakte/icons';
import { RouterLink,useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from '@vkontakte/vk-bridge';
import { useTime } from './TimeContext';

const STORAGE_KEY_MOON_WAKE_UP = 'wakeUpTime1';
const STORAGE_KEY_MOON_OTHER_1 = 'otherTime1_2';
const STORAGE_KEY_MOON_OTHER_2 = 'otherTime1_3';
const STORAGE_KEY_MOON_ENTERED_TIME = 'enteredWakeUpTime';
const STORAGE_KEY_MOON_SAVED_TIMES = 'savedTimes';

export const TabMoon = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [sleepHours1, setSleepHours1] = useState('');
  const [sleepMinutes1, setSleepMinutes1] = useState('');
  const [wakeUpTime1, setWakeUpTime1] = useState('');
  const [otherTime1, setOtherTime1] = useState('');
  const [otherTime1_2, setOtherTime1_2] = useState('');
  const [otherTime1_3, setOtherTime1_3] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  const [showElement, setShowElement] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]); // Состояние для хранения сохраненных времен
  const [enteredWakeUpTime, setEnteredWakeUpTime] = useState('');
  const [popout, setPopout] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('0');
  const [selectedAgeRange, setSelectedAgeRange] = useState('n')
  const { setWakeUpTime, setOtherTimes } = useTime(); 
  const [subtitleMessage, setSubtitleMessage] = useState("Если нужно проснуться раньше");
  const [isWakeUpTimeChild4to6Selected, setIsWakeUpTimeChild4to6Selected] = useState(false);
  const [isWakeUpTimeChild7to13Selected, setIsWakeUpTimeChild7to13Selected] = useState(false);
  const [isWakeUpTimeChild14to17Selected, setIsWakeUpTimeChild14to17Selected] = useState(false);
  const closePopout = () => {
    setPopout(null);
  };
  const isTimeSaved = wakeUpTime1 && otherTime1_2 && otherTime1_3 && enteredWakeUpTime;
  const handleKeyPress = (event) => {
    const invalidChars = ['.', ',','-'];
    const keyPressed = String.fromCharCode(event.charCode || event.keyCode);
  
    if (invalidChars.includes(keyPressed)) {
      event.preventDefault();
    }
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };
  // Загрузка сохраненных данных
  useEffect(() => {
    setIsLoading(true);
    bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEY_MOON_WAKE_UP, STORAGE_KEY_MOON_OTHER_1, STORAGE_KEY_MOON_OTHER_2, STORAGE_KEY_MOON_ENTERED_TIME, STORAGE_KEY_MOON_SAVED_TIMES] })
      .then(data => {
        const values = data.keys;
        if (values[0]?.value) setWakeUpTime1(values[0].value);
        if (values[1]?.value) setOtherTime1_2(values[1].value);
        if (values[2]?.value) setOtherTime1_3(values[2].value);
        if (values[3]?.value) setEnteredWakeUpTime(values[3].value);
        if (values[4]?.value) {
          const times = JSON.parse(values[4].value) || [];
          setSavedTimes(times);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveTimes = () => {
    const newTime = { wakeUpTime: wakeUpTime1, otherTime2: otherTime1_2, otherTime3: otherTime1_3, enteredWakeUpTime };
    const updatedTimes = [...savedTimes, newTime];

    setSavedTimes(updatedTimes);
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_WAKE_UP, value: wakeUpTime1 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_1, value: otherTime1_2 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_2, value: otherTime1_3 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_ENTERED_TIME, value: enteredWakeUpTime });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_SAVED_TIMES, value: JSON.stringify(updatedTimes) });
  };
  const clearStorage = () => {
    // Очистка сохраненных времен
    setSavedTimes([]);
    setWakeUpTime1('');
    setOtherTime1_2('');
    setOtherTime1_3('');
    setEnteredWakeUpTime('');

    // Очистка данных в хранилище
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_WAKE_UP, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_1, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_OTHER_2, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_ENTERED_TIME, value: '' });
     bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_MOON_SAVED_TIMES, value: JSON.stringify([]) }); // Пустой массив
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
          action: () => clearStorage(),
        },
      ]}
      actionsLayout="horizontal"
      dismissButtonMode="inside"
      onClose={closePopout}
      header="Удаление сохраненного времени"
      text="Вы уверены, что хотите удалить сохраненное время?"
    />);
  };
  const calculateWakeUpTime1 = () => {
    let hours = parseInt(sleepHours1, 10);
    let minutes = parseInt(sleepMinutes1, 10);
    if (minutes < 0) {
      minutes += 60;
    }
    // Рассчитываем время пробуждения
    if (hours >= 8) {
      hours -= 24;
    }
    if (hours < 8) {
      hours += 16;
      minutes += 10; // Время на засыпание, если требуется
    }
  
    let other1_hours = hours + 1;
    let other1_minutes = minutes + 34;
    let other1_hours2 = hours + 3;
    let other1_minutes2 = minutes + 8;
    let other1_hours3 = other1_hours2 + 1;
    let other1_minutes3 = minutes + 42;
  
    // Проверка на перенос минут в часы
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }
    if (other1_minutes2 >= 60) {
      other1_hours2 += Math.floor(other1_minutes2 / 60);
      other1_minutes2 %= 60;
    }
    if (other1_minutes3 >= 60) {
      other1_hours3 += Math.floor(other1_minutes3 / 60);
      other1_minutes3 %= 60;
    }
  
    // Форматируем время
    hours = (hours + 24) % 24;
    minutes = (minutes + 60) % 60;
    other1_hours = (other1_hours + 24) % 24;
    other1_minutes = (other1_minutes + 60) % 60;
    other1_hours2 = (other1_hours2 + 24) % 24;
    other1_minutes2 = (other1_minutes2 + 60) % 60;
    other1_hours3 = (other1_hours3 + 24) % 24;
    other1_minutes3 = (other1_minutes3 + 60) % 60;
  
    const formatTime = (h, m) => (`0${h}`).slice(-2) + ':' + (`0${m}`).slice(-2);
    
    setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
    setWakeUpTime1(formatTime(hours, minutes));
    setOtherTime1(`${formatTime(other1_hours, other1_minutes)}`);
    setOtherTime1_2(`${formatTime(other1_hours2, other1_minutes2)}`);
    setOtherTime1_3(`${formatTime(other1_hours3, other1_minutes3)}`);
    setShowElement(true);
  };
  const calculateWakeUpTime0_3mes = () => {
    let hours = parseInt(sleepHours1, 10);
    let minutes = parseInt(sleepMinutes1, 10);
    let other_hours2 = parseInt(sleepHours1, 10);
    let other_minutes2 = parseInt(sleepMinutes1, 10);
    let other_hours3 = parseInt(sleepHours1, 10);
    let other_minutes3 = parseInt(sleepMinutes1, 10);
    // Рассчитываем время пробуждения
    hours += 16;
    minutes -= 10;
    other_hours2=hours+3
    other_minutes2=minutes-25
    other_hours3=other_hours2+1
    other_minutes3=minutes+45
    if (minutes < 0) {
      minutes += 60;
    }
    // Перенос минут в часы
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
    }
    if (other_minutes2 >= 60) {
      other_minutes2 %= 60;
    }
    if (other_minutes3 >= 60) {
      other_minutes3 %= 60;
    }
    if (other_hours2 >= 24) {
      other_hours2 -= 24;
    }
    if (other_hours3 >= 24) {
      other_hours3 -= 24;
    }
    if (hours > 23) {
      hours -= 24;
    }
    // Приводим часы к нормальному виду
    hours = (`0${hours}`).slice(-2);
    minutes = (`0${minutes}`).slice(-2);
    other_hours2 = (`0${other_hours2}`).slice(-2);
    other_minutes2 = (`0${other_minutes2}`).slice(-2);
    other_hours3 = (`0${other_hours3}`).slice(-2);
    other_minutes3 = (`0${other_minutes3}`).slice(-2);
    setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
    setWakeUpTime1(`${hours}:${minutes}`);
    setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
    setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
    setSubtitleMessage("Дневной сон");
    if (!showElement) {
      setShowElement(true);
    }
};
const calculateWakeUpTime4_11mes = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  // Рассчитываем время пробуждения
  hours += 14;
  minutes -= 15;
  other_hours2=hours+6
  other_minutes2=minutes+45
  other_hours3=other_hours2+2
  other_minutes3=minutes+45
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (minutes < 0) {
    minutes += 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  setSubtitleMessage("Дневной сон");
  if (!showElement) {
    setShowElement(true);
  }
};
const calculateWakeUpTimeChild1to3 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  // Рассчитываем время пробуждения
  hours += 14;
  minutes -= 15;
  other_hours2=hours+8
  other_minutes2=minutes+45
  other_hours3=other_hours2+1
  other_minutes3=minutes+45
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  setSubtitleMessage("Дневной сон");
  if (!showElement) {
    setShowElement(true);
  }
};

const calculateWakeUpTimeChild4to6 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  // Рассчитываем время пробуждения
  hours += 15;
  minutes += 30;
  other_hours2=hours+8
  other_minutes2=minutes+10
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`);
  setIsWakeUpTimeChild4to6Selected(true);
  setSubtitleMessage("Дневной сон");
  if (!showElement) {
    setShowElement(true);
  }
};

const calculateWakeUpTimeChild7to13 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  if (minutes < 0) {
    minutes += 60;
  }
  // Рассчитываем время пробуждения
  hours += 14;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2+1
  other_minutes3=minutes+45
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement) {
    setShowElement(true);
  }
};
const calculateWakeUpTimeTeenager14to17 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  if (minutes < 0) {
    minutes += 60;
  }
  // Рассчитываем время пробуждения
  hours += 15;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2+1
  other_minutes3=minutes+45
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement) {
    setShowElement(true);
  }
};
const calculateWakeUpTimeSenior18to24 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  if (minutes < 0) {
    minutes += 60;
  }
  // Рассчитываем время пробуждения
  hours += 16;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2+2
  other_minutes3=minutes+45
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement) {
    setShowElement(true);
  }
};
const calculateWakeUpTimeSenior25to60 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  if (minutes < 0) {
    minutes += 60;
  }
  // Рассчитываем время пробуждения
  hours += 17;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2+2
  other_minutes3=minutes+25
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  if (!showElement) {
    setShowElement(true);
  }
};
const calculateWakeUpTime60 = () => {
  let hours = parseInt(sleepHours1, 10);
  let minutes = parseInt(sleepMinutes1, 10);
  let other_hours2 = parseInt(sleepHours1, 10);
  let other_minutes2 = parseInt(sleepMinutes1, 10);
  let other_hours3 = parseInt(sleepHours1, 10);
  let other_minutes3 = parseInt(sleepMinutes1, 10);
  if (minutes < 0) {
    minutes += 60;
  }
  // Рассчитываем время пробуждения
  hours += 18;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2+2
  other_minutes3=minutes+15
  if (minutes < 0) {
    minutes += 60;
  }
  // Перенос минут в часы
  if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
  }
  if (other_minutes2 >= 60) {
    other_minutes2 %= 60;
  }
  if (other_minutes3 >= 60) {
    other_minutes3 %= 60;
  }
  if (other_hours2 >= 24) {
    other_hours2 -= 24;
  }
  if (other_hours3 >= 24) {
    other_hours3 -= 24;
  }
  if (hours > 23) {
    hours -= 24;
  }
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime(`${sleepHours1}:${sleepMinutes1}`);
  setWakeUpTime1(`${hours}:${minutes}`);
  setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
  if (!showElement) {
    setShowElement(true);
  }
};
const handleAgeRangeChange = (event) => {
  const ageRange = event.target.value;
  setSelectedAgeRange(ageRange);
};
const calculateAndDisplayTimes = () => {
  // Выполняем расчет времени в зависимости от выбранного возрастного диапазона
  switch (selectedAgeRange) {
    case '0-3mes':
        calculateWakeUpTime0_3mes();
        break;
    case '4-11mes':
        calculateWakeUpTime4_11mes();
        break;
    case '1-3':
        calculateWakeUpTimeChild1to3();
        break;
    case '4-6':
        calculateWakeUpTimeChild4to6();
        break;
    case '7-13':
        calculateWakeUpTimeChild7to13();
        break;
    case '14-17':
        calculateWakeUpTimeTeenager14to17();
        break;
    case '18-24':
        calculateWakeUpTimeSenior18to24();
        break;
    case '25-60':
        calculateWakeUpTimeSenior25to60();
        break;
    case '60+':
        calculateWakeUpTime60();
        break;
    default: // Если ничего не выбрано, выполняем стандартный расчет
        calculateWakeUpTime1();
}
};
  const handleWakeUpMinChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 59) {
      setSleepMinutes1(inputValue);
    } else {
      e.target.value = '';
    }
  };
  const handleWakeUpHoursChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 23){
      setSleepHours1(inputValue);
    } else {
      e.target.value = '';
    }
  };
  const contentStyles = {
  paddingBottom: 50,
  };
  return (
    <SplitLayout popout={popout} style={contentStyles}>
      
    <Group>
          <Placeholder
          icon={<Icon56MoonOutline width={50} height={50}/>}
            title="Встать в"
          >
            Здесь появится рекомендованное время, в которое Вам нужно встать, просто укажите время, в которое ложитесь спать, и нажмите кнопку Рассчитать
          </Placeholder>
            {showElement && (
            <Group mode="plain"
            separator='hide'
          >
            <CardGrid size="l">
              <Card mode="outline">
                <ContentCard
                  mode="outline"
                  subtitle="Нужно лечь в"
                  header={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
            <Headline level="2">{wakeUpTime1}</Headline>
            <Popover
          trigger="click"
          role="tooltip"
          aria-describedby="tooltip-1"
          restoreFocus="anchor-element"
          content={
            <Div>
              <Footnote>Время пробуждения. Конец ФБС 5 цикла. <RouterLink to='/guide/twopage'>Справочник</RouterLink>
              </Footnote>
            </Div>
          }
        >
          <IconButton
          style={{
            borderRadius: '50%',
          }}
          label='about'
          >
                  <Icon16HelpOutline />
                  </IconButton>
        </Popover>
        {isWakeUpTimeChild7to13Selected && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
            <Headline level="2">{otherTime1_2}</Headline>
            <Popover
            trigger="click"
            role="tooltip"
            aria-describedby="tooltip-1"
            restoreFocus="anchor-element"
            content={
            <Div>
              {isWakeUpTimeChild7to13Selected && (
              <Footnote>Время пробуждения. Конец ФБС 5 цикла. <RouterLink to='/guide/twopage'>Справочник</RouterLink></Footnote>
              )}
            </Div>
            }
            >
            <IconButton style={{ borderRadius: '50%' }} label='about'>
            <Icon16HelpOutline />
            </IconButton>
            </Popover>
            </div>)}
        </div>
        <div>
        
        <IconButton
          style={{
            borderRadius: '50%',
            color: '#008cff'
          }}
          onClick={saveTimes}
          label='about'
          >
          <Icon20FavoriteOutline />
          </IconButton>
          </div>
          </div>
          }
                />
              </Card>
            </CardGrid>
          </Group>)}
            <Group mode="plain"
            hidden={!isVisible}
            separator='hide'
          >
            <CardGrid size="l">
              <Card mode="outline">
                <ContentCard
                  mode="outline"
                  subtitle={subtitleMessage}
                  header={<div>
                    {!isWakeUpTimeChild7to13Selected && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
            <Headline level="2">{otherTime1_2}</Headline>
            <Popover
            trigger="click"
            id="menupopup"
            role="dialog"
            aria-labelledby="menubutton"
            placement='right'
            content={
            <Div>
              <Footnote>3 цикл.Медленный сон. <RouterLink to='/guide/twopage'>Справочник</RouterLink></Footnote>
            </Div>
            }
            >
              <IconButton
              style={{
                borderRadius: '50%',
              }}
              label='about'
              >
                  <Icon16HelpOutline />
                  </IconButton>
            </Popover>
                  </div>
                    )}
                  {!isWakeUpTimeChild4to6Selected && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Headline level="2">{otherTime1_3}</Headline>
    <Popover
          trigger="click"
          id="menupopup"
          role="dialog"
          aria-labelledby="menubutton"
          placement='right'
          content={
            <Div>
              <Footnote>5 цикл. Медленный сон. <RouterLink to='/guide/twopage'>Справочник</RouterLink></Footnote>
            </Div>
          }
        >
          <IconButton
          style={{
            borderRadius: '50%',
          }}
          label='about'
          >
                  <Icon16HelpOutline />
                  </IconButton>
        </Popover>
                  </div>)}
                    
                    </div>}
                />
              </Card>
            </CardGrid>
          </Group>
            {showElement && (
                    <Div mode="plain">
                  <Button
                    size="l"
                    appearance="accent"
                    mode="tertiary"
                    onClick={toggleVisibility}
                    after={isVisible ? <Icon16ArrowTriangleUp/> :<Icon16ArrowTriangleDown/>}
                  >
                  {isVisible ? 'Скрыть' : 'Показать'}
                  </Button>
                  </Div>)}
      <FormLayoutGroup mode="horizontal">
        <FormItem top="Часы" htmlFor="start">
          <Input
            id="start"
            type="number"
            min="0"
            max="23"
            onInput={handleWakeUpHoursChange}
            onKeyPress={handleKeyPress}
            value={sleepHours1}
            placeholder='07'
          />
        </FormItem>
        <FormItem top="Минуты" htmlFor="end">
          <Input
            id="end"
            type="number"
            min="0"
            max="59"
            onInput={handleWakeUpMinChange}
            onKeyPress={handleKeyPress}
            value={sleepMinutes1}
            placeholder='00'
          />
        </FormItem>
      </FormLayoutGroup>
      <Div mode="plain">
        <Button
          onClick={calculateAndDisplayTimes}
          disabled={!sleepMinutes1 || !sleepHours1}
        >
          Рассчитать
        </Button>
      </Div>
      <Group hidden={!isVisible2} separator='hide'>
        <FormItem
                top="Выберите возрастной диапазон"
                htmlFor="age-range-select-id"
            >
                <NativeSelect
                                    id="age-range-select-id"
                                    placeholder="Не выбрано"
                                    value={selectedAgeRange}
                                    onChange={handleAgeRangeChange}
                                >
                                    <option value="0-3mes">От 0 до 3 месяцев</option>
                                    <option value="4-11mes">От 4 до 11 месяцев</option>
                                    <option value="1-3">От 1 до 3 лет</option>
                                    <option value="4-6">От 4 до 6 лет</option>
                                    <option value="7-13">От 7 до 13 лет</option>
                                    <option value="14-17">От 14 до 17 лет</option>
                                    <option value="18-24">От 18 лет до 24</option>
                                    <option value="25-60">От 24 до 60 лет</option>
                                    <option value="60+">От 60 лет</option>
                                </NativeSelect>
            </FormItem>
            </Group>
      <Div mode="plain">
                  <Button
                    size="l"
                    appearance="accent"
                    mode="tertiary"
                    onClick={toggleVisibility2}
                    after={isVisible2 ? <Icon16ArrowTriangleUp/> :<Icon16ArrowTriangleDown/>}
                  >
                  {isVisible2 ? 'Скрыть' : 'Дополнительные настройки'}
                  </Button>
                  </Div>
                  <Group mode="plain" separator='hide' header={
        <Header size="s" mode='secondary'>
          Сохраненное время
          {savedTimes.length > 0 && (
            <Link onClick={showAlert} style={{ marginLeft: 'auto', color: 'red' }}>
              Удалить
            </Link>
          )}
        </Header>
      }>
        {savedTimes.length > 0 ? (
          <CardGrid size="l">
            {savedTimes.map((time, index) => (
              <Card mode="outline" key={index}>
                <ContentCard
                  mode="outline"
                  subtitle="Нужно лечь спать в"
                  header={<Headline level="1">{time.wakeUpTime}</Headline>}
                />
                <ContentCard
                  mode="outline"
                  subtitle="Если времени осталось мало, засыпайте в"
                  header={<div><Headline level="1">{time.otherTime2}</Headline>
                          <Headline level="1">{time.otherTime3}</Headline>
                    </div>}
                />
                <ContentCard
                  mode="outline"
                  subtitle="Указанное время для пробуждения"
                  header={<Headline level="1">{time.enteredWakeUpTime}</Headline>}
                />
              </Card>
            ))}
          </CardGrid>
        ) : (
          <Placeholder
            icon={<Icon56FavoriteOutline />}
            title="История"
          >
            Сохраните время, чтобы получать быстрый доступ к нему
          </Placeholder>
        )}
      </Group>

    </Group>
    </SplitLayout>
  );
};
