import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  FormLayoutGroup,
  Input,
  FormItem,
  Button,
  NativeSelect,
  Alert,
  Group,
  Link,
  Div,
  Headline,
  Footnote,
  IconButton,
  Header,
  SplitLayout,
  CardGrid,
  Placeholder,
  ScreenSpinner,
  ContentCard,
  Popover,
  Card
} from '@vkontakte/vkui';
import { Icon16ArrowTriangleUp,Icon28SunOutline,Icon16HelpOutline, Icon20FavoriteOutline, Icon56FavoriteOutline,
  Icon16ArrowTriangleDown
 } from '@vkontakte/icons';
 import bridge from '@vkontakte/vk-bridge';
 import { RouterLink } from '@vkontakte/vk-mini-apps-router';
const STORAGE_KEY_SUN_WAKE_UP = 'wakeUpTime2';
const STORAGE_KEY_SUN_OTHER_1 = 'otherTime2_2';
const STORAGE_KEY_SUN_OTHER_2 = 'otherTime2_3';
const STORAGE_KEY_SUN_ENTERED_TIME = 'enteredWakeUpTime2';
const STORAGE_KEY_SUN_SAVED_TIMES = 'savedTimes2';
export const TabSun = ({ id }) => {
    const [sleepHours2, setSleepHours2] = useState('');
    const [sleepMinutes2, setSleepMinutes2] = useState('');
    const [wakeUpTime2, setWakeUpTime2] = useState('');
    const [otherTime2, setOtherTime2] = useState('');
    const [otherTime2_2, setOtherTime2_2] = useState('');
    const [otherTime2_3, setOtherTime2_3] = useState('');
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isButtonDisabled2, setIsButtonDisabled2] = useState(true);
    const [showElement2, setShowElement2] = useState(false);
    const [savedTimes2, setSavedTimes2] = useState([]); // Состояние для хранения сохраненных времен
    const [enteredWakeUpTime2, setEnteredWakeUpTime2] = useState('');
    const [popout, setPopout] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('0');
    const [selectedAgeRange, setSelectedAgeRange] = useState('n');
    const [subtitleMessage, setSubtitleMessage] = useState("Если нужно проснуться раньше");
    const [isWakeUpTimeChild4to6Selected, setIsWakeUpTimeChild4to6Selected] = useState(false);
    const [isWakeUpTimeChild7to13Selected, setIsWakeUpTimeChild7to13Selected] = useState(false);
    const toggleVisibility2 = () => {
      setIsVisible2(!isVisible2);
    };
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  const [visibleElement, setVisibleElement] = useState({
    first: false,
    second: true,
  });
  const closePopout = () => {
    setPopout(null);
  };
  const isTimeSaved2 = wakeUpTime2 && otherTime2_2 && otherTime2_3 && enteredWakeUpTime2;
  const toggleElements = () => {
    setVisibleElement(prevState => ({
      first: !prevState.first,
      second: !prevState.second
    }));
  };
  const handleStartChange2 = (event) => {
    setSleepHours2(event.target.value);
  };
  const handleEndChange2 = (event) => {
    setSleepMinutes2(event.target.value);
    setIsButtonDisabled2(sleepMinutes2.trim() === ''&& sleepHours2.trim() === '');
  };
  // Загрузка сохраненных данных
  useEffect(() => {
    setIsLoading(true);
    bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEY_SUN_WAKE_UP, STORAGE_KEY_SUN_OTHER_1, STORAGE_KEY_SUN_OTHER_2, STORAGE_KEY_SUN_ENTERED_TIME, STORAGE_KEY_SUN_SAVED_TIMES] })
      .then(data => {
        const values = data.keys;
        if (values[0]?.value) setWakeUpTime2(values[0].value);
        if (values[1]?.value) setOtherTime2_2(values[1].value);
        if (values[2]?.value) setOtherTime2_3(values[2].value);
        if (values[3]?.value) setEnteredWakeUpTime2(values[3].value);
        if (values[4]?.value) {
          const times = JSON.parse(values[4].value) || [];
          setSavedTimes2(times);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveTimes2 = () => {
    const newTime2 = { wakeUpTime_2: wakeUpTime2, otherTime_2: otherTime2_2, otherTime_3: otherTime2_3, enteredWakeUpTime2 };
    const updatedTimes2 = [...savedTimes2, newTime2];

    setSavedTimes2(updatedTimes2);

    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_WAKE_UP, value: wakeUpTime2 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_1, value: otherTime2_2 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_2, value: otherTime2_3 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_ENTERED_TIME, value: enteredWakeUpTime2 });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_SAVED_TIMES, value: JSON.stringify(updatedTimes2) });
  };
  const clearStorage = () => {
    // Очистка сохраненных времен
    setSavedTimes2([]);
    setWakeUpTime2('');
    setOtherTime2_2('');
    setOtherTime2_3('');
    setEnteredWakeUpTime2('');
    // Очистка данных в хранилище
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_WAKE_UP, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_1, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_OTHER_2, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_ENTERED_TIME, value: '' });
    bridge.send('VKWebAppStorageSet', { key: STORAGE_KEY_SUN_SAVED_TIMES, value: JSON.stringify([]) }); // Пустой массив
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
  const calculateWakeUpTime2 = () => {
    let hours1 = parseInt(sleepHours2, 10);
    let minutes1 = parseInt(sleepMinutes2, 10);
    let other_hours = parseInt(sleepHours2, 10);
    let other_minutes = parseInt(sleepMinutes2, 10);
    let other_hours2 = parseInt(sleepHours2, 10);
    let other_minutes2 = parseInt(sleepMinutes2, 10);
    let other_hours3 = parseInt(sleepHours2, 10);
    let other_minutes3 = parseInt(sleepMinutes2, 10);
    // Преобразовать выбранное время засыпания в минуты
    let additionalSleepTime = 0; // минуты, которые прибавляем в зависимости от выбранного времени
    switch (selectedOption) {
      case '10':
        additionalSleepTime = 10;
        break;
      case '15':
        additionalSleepTime = 15;
        break;
      case '20':
        additionalSleepTime = 20;
        break;
      case '30':
        additionalSleepTime = 30;
        break;
      case '40':
        additionalSleepTime = 40;
        break;
      default:
        additionalSleepTime = 0;
    }
    
    // Добавляем время засыпания к минутам
    minutes1 += additionalSleepTime;
  
    if (minutes1 == 0) {
      minutes1 += 60;
    }else if (minutes1 == 20) {
      minutes1 += 60;
    }
    else if (minutes1 == 30) {
      minutes1 += 60;
    }
    else if (minutes1 == 40) {
      minutes1 += 60;
    }
    else if (minutes1 == 50) {
      minutes1 += 60;
    }
    for ( ; minutes1 < 60; minutes1+1) {
      minutes1 += 60;
    }
    for ( ; hours1 < 17; hours1-1) {
      hours1+=23;
      minutes1 += 60;
    }
    hours1 -= 17;
    minutes1 -= 10;
    
    // Если минуты больше 60, переносим их в часы
    if (minutes1 >= 60) {
      hours1 += Math.floor(minutes1 / 60);
      minutes1 %= 60;
    }
    other_hours=hours1-4
    other_minutes=minutes1-10
    other_hours2=hours1+20
    other_minutes2=minutes1+18
    other_hours3=other_hours2+3
    other_minutes3=minutes1+26
    if (other_minutes >= 60) {
      other_minutes %= 60;
    }
    if (other_minutes2 >= 60) {
      other_minutes2 %= 60;
    }
    if (other_minutes3 >= 60) {
      other_minutes3 %= 60;
    }
    if (minutes1 == 0) {
      other_hours2 -= 1;
    }
    if (minutes1 == 0) {
      other_hours3 -= 1;
    }
    if (other_hours2 >= 24) {
      other_hours2 -= 24;
    }
    if (other_hours3 >= 24) {
      other_hours3 -= 24;
    }
    if (hours1 > 23) {
      hours1 -= 24;
    }
    // Приводим к правильному формату (чтобы было два символа)
    hours1 = (`0${hours1}`).slice(-2);
    minutes1 = (`0${minutes1}`).slice(-2);
    other_hours = (`0${other_hours}`).slice(-2);
    other_minutes = (`0${other_minutes}`).slice(-2);
    other_hours2 = (`0${other_hours2}`).slice(-2);
    other_minutes2 = (`0${other_minutes2}`).slice(-2);
    other_hours3 = (`0${other_hours3}`).slice(-2);
    other_minutes3 = (`0${other_minutes3}`).slice(-2);
    setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
    setWakeUpTime2(`${hours1}:${minutes1}`);
    setOtherTime2(`${other_hours}:${other_minutes}`)
    setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
    setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
    if (!showElement2) {
      setShowElement2(true);
    }
  };
  
  const calculateWakeUpTime0_3mes = (fallAsleepTime) => {
    let hours = parseInt(sleepHours2, 10);
    let minutes = parseInt(sleepMinutes2, 10);
    let other_hours2 = parseInt(sleepHours2, 10);
    let other_minutes2 = parseInt(sleepMinutes2, 10);
    let other_hours3 = parseInt(sleepHours2, 10);
    let other_minutes3 = parseInt(sleepMinutes2, 10);
    // Рассчитываем время пробуждения
    hours += 8;
    minutes -= 15;
    other_hours2=hours-3
    other_minutes2=minutes+45
    other_hours3=other_hours2-1
    other_minutes3=minutes+45
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
    // Учитываем время засыпания
    minutes += fallAsleepTime;
    // Приводим часы к нормальному виду
    hours = (`0${hours}`).slice(-2);
    minutes = (`0${minutes}`).slice(-2);
    other_hours2 = (`0${other_hours2}`).slice(-2);
    other_minutes2 = (`0${other_minutes2}`).slice(-2);
    other_hours3 = (`0${other_hours3}`).slice(-2);
    other_minutes3 = (`0${other_minutes3}`).slice(-2);
    setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
    setWakeUpTime2(`${hours}:${minutes}`);
    setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
    setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
    setSubtitleMessage("Дневной сон");
    if (!showElement2) {
      setShowElement2(true);
    }
};
const calculateWakeUpTime4_11mes = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 10;
  minutes -= 15;
  other_hours2=hours-6
  other_minutes2=minutes+45
  other_hours3=other_hours2-2
  other_minutes3=minutes+45
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
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  setSubtitleMessage("Дневной сон");
  if (!showElement2) {
    setShowElement2(true);
  }
};
const calculateWakeUpTimeChild1to3 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 10;
  minutes -= 15;
  other_hours2=hours-8
  other_minutes2=minutes+45
  other_hours3=other_hours2-1
  other_minutes3=minutes+45
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
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  setSubtitleMessage("Дневной сон");
  if (!showElement2) {
    setShowElement2(true);
  }
};

const calculateWakeUpTimeChild4to6 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 9;
  minutes += 30;
  other_hours2=hours-8
  other_minutes2=minutes+10
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
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`);
  setIsWakeUpTimeChild4to6Selected(true);
  setSubtitleMessage("Дневной сон");
  if (!showElement2) {
    setShowElement2(true);
  }
};
const handleAgeRangeChange = (event) => {
  const ageRange = event.target.value;
  setSelectedAgeRange(ageRange);
};
const calculateWakeUpTimeChild7to13 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 10;
  minutes -= 15;
  other_hours2=hours-1
  other_minutes2=minutes+45
  other_hours3=other_hours2-1
  other_minutes3=minutes+45
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
  if (minutes < 0) {
    minutes += 60;
  }
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement2) {
    setShowElement2(true);
  }
};
const calculateWakeUpTimeTeenager14to17 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 8;
  minutes -= 15;
  other_hours2=hours+1
  other_minutes2=minutes+45
  other_hours3=other_hours2-1
  other_minutes3=minutes+45
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
  if (minutes < 0) {
    minutes += 60;
  }
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement2) {
    setShowElement2(true);
  }
};
const calculateWakeUpTimeSenior18to24 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 8;
  minutes -= 15;
  other_hours2=hours-1
  other_minutes2=minutes+45
  other_hours3=other_hours2-2
  other_minutes3=minutes+45
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
  if (minutes < 0) {
    minutes += 60;
  }
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  setIsWakeUpTimeChild7to13Selected(true);
  if (!showElement2) {
    setShowElement2(true);
  }
};
const calculateWakeUpTimeSenior25to60 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 7;
  minutes -= 15;
  other_hours2=hours-2
  other_minutes2=minutes+45
  other_hours3=other_hours2-3
  other_minutes3=minutes+25
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
  if (minutes < 0) {
    minutes += 60;
  }
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  if (!showElement2) {
    setShowElement2(true);
  }
};
const calculateWakeUpTime60 = (fallAsleepTime) => {
  let hours = parseInt(sleepHours2, 10);
  let minutes = parseInt(sleepMinutes2, 10);
  let other_hours2 = parseInt(sleepHours2, 10);
  let other_minutes2 = parseInt(sleepMinutes2, 10);
  let other_hours3 = parseInt(sleepHours2, 10);
  let other_minutes3 = parseInt(sleepMinutes2, 10);
  // Рассчитываем время пробуждения
  hours += 7;
  minutes -= 15;
  other_hours2=hours-1
  other_minutes2=minutes+45
  other_hours3=other_hours2-3
  other_minutes3=minutes+15
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
  // Учитываем время засыпания
  minutes += fallAsleepTime;
  // Приводим часы к нормальному виду
  hours = (`0${hours}`).slice(-2);
  minutes = (`0${minutes}`).slice(-2);
  other_hours2 = (`0${other_hours2}`).slice(-2);
  other_minutes2 = (`0${other_minutes2}`).slice(-2);
  other_hours3 = (`0${other_hours3}`).slice(-2);
  other_minutes3 = (`0${other_minutes3}`).slice(-2);
  setEnteredWakeUpTime2(`${sleepHours2}:${sleepMinutes2}`);
  setWakeUpTime2(`${hours}:${minutes}`);
  setOtherTime2_2(`${other_hours2}:${other_minutes2}`)
  setOtherTime2_3(`${other_hours3}:${other_minutes3}`)
  if (!showElement2) {
    setShowElement2(true);
  }
};
// Переменная, которая будет хранить время засыпания в минутах
let fallAsleepTime = 0;
const calculateAndDisplayTimes = () => {
  // Получаем время засыпания
  switch (selectedOption) {
      case '10':
          fallAsleepTime = 10;
          break;
      case '15':
          fallAsleepTime = 15;
          break;
      case '20':
          fallAsleepTime = 20;
          break;
      case '30':
          fallAsleepTime = 30;
          break;
      case '40':
          fallAsleepTime = 40;
          break;
      default:
          fallAsleepTime = 0;
  }

  // Выполняем расчет времени в зависимости от выбранного возрастного диапазона
  switch (selectedAgeRange) {
      case '0-3mes':
          calculateWakeUpTime0_3mes(fallAsleepTime);
          break;
      case '4-11mes':
          calculateWakeUpTime4_11mes(fallAsleepTime);
          break;
      case '1-3':
          calculateWakeUpTimeChild1to3(fallAsleepTime);
          break;
      case '4-6':
          calculateWakeUpTimeChild4to6(fallAsleepTime);
          break;
      case '7-13':
          calculateWakeUpTimeChild7to13(fallAsleepTime);
          break;
      case '14-17':
          calculateWakeUpTimeTeenager14to17(fallAsleepTime);
          break;
      case '18-24':
          calculateWakeUpTimeSenior18to24(fallAsleepTime);
          break;
      case '25-60':
          calculateWakeUpTimeSenior25to60(fallAsleepTime);
          break;
      case '60+':
          calculateWakeUpTime60(fallAsleepTime);
          break;
      default: // Если ничего не выбрано, выполняем стандартный расчет
          calculateWakeUpTime2(fallAsleepTime);
  }
};
  const handleWakeUpHoursChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 23){
      setSleepHours2(inputValue);
    } else {
      e.target.value = '';
    }
  };
  const handleKeyPress = (event) => {
    const invalidChars = ['.', ',','-'];
    const keyPressed = String.fromCharCode(event.charCode || event.keyCode);
  
    if (invalidChars.includes(keyPressed)) {
      event.preventDefault();
    }
  };
  const handleWakeUpMinChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 59) {
      setSleepMinutes2(inputValue);
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
      icon={<Icon28SunOutline width={50} height={50}/>}
        title="Встать в"
      >
        Здесь появится рекомендованное время, в которое Вам нужно встать, просто укажите время, в которое ложитесь спать, и нажмите кнопку Рассчитать
      </Placeholder>
        {showElement2 && (
        <Group mode="plain"
        separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Нужно встать в"
              header={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
        <Headline level="2">{wakeUpTime2}</Headline>
        <Popover
      trigger="click"
      role="tooltip"
      aria-describedby="tooltip-1"
      restoreFocus="anchor-element"
      content={
        <Div>
          {!isWakeUpTimeChild7to13Selected && (
          <Footnote>Время пробуждения. Конец ФБС 5 цикла. <RouterLink to='/guide/twopage'>Справочник</RouterLink>
          </Footnote>)}
          {isWakeUpTimeChild7to13Selected && (
          <Footnote>Время пробуждения. Конец ФБС 5 цикла. Для 7-10 возраста<RouterLink to='/guide/twopage'>Справочник</RouterLink>
          </Footnote>)}
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
        <Headline level="2">{otherTime2_2}</Headline>
        <Popover
        trigger="click"
        role="tooltip"
        aria-describedby="tooltip-1"
        restoreFocus="anchor-element"
        content={
        <Div>
          {!isWakeUpTimeChild7to13Selected && (
          <Footnote>Время пробуждения. Конец ФБС 5 цикла. <RouterLink to='/guide/twopage'>Справочник</RouterLink></Footnote>
          )}
          {isWakeUpTimeChild7to13Selected && (
          <Footnote>Время пробуждения. Конец ФБС 5 цикла. Для 11-13 возраста<br/><RouterLink to='/guide/twopage'>Справочник</RouterLink></Footnote>
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
      onClick={saveTimes2}
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
        hidden={!isVisible2}
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
        <Headline level="2">{otherTime2_2}</Headline>
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
<Headline level="2">{otherTime2_3}</Headline>
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
      {showElement2 && (
        <Div mode="plain">
      <Button
        size="l"
        appearance="accent"
        mode="tertiary"
        onClick={toggleVisibility2}
        after={isVisible2 ? <Icon16ArrowTriangleUp/> :<Icon16ArrowTriangleDown/>}
      >
      {isVisible2 ? 'Скрыть' : 'Показать'}
      </Button>
      </Div>)}
    <FormLayoutGroup mode="horizontal">
          <FormItem top="Часы" htmlFor="start">
            <Input
              id="start"
              type="number"
              min="0"
              max="23"
              name='time'
              onInput={handleWakeUpHoursChange}
              onKeyPress={handleKeyPress}
              value={sleepHours2}
              onChange={handleStartChange2}
              placeholder='23'
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
              value={sleepMinutes2}
              onChange={handleEndChange2}
              placeholder='10'
            />
          </FormItem>
        </FormLayoutGroup>
        <Div><Button onClick={calculateAndDisplayTimes||toggleElements}
      disabled={!sleepMinutes2||!sleepHours2}
      >Рассчитать</Button>
      </Div>
      <Group hidden={!isVisible} separator='hide'>
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
                    onClick={toggleVisibility}
                    after={isVisible ? <Icon16ArrowTriangleUp/> :<Icon16ArrowTriangleDown/>}
                  >
                  {isVisible ? 'Скрыть' : 'Дополнительные настройки'}
                  </Button>
                  </Div>
                  <Group mode="plain" separator='hide' header={
        <Header size="s" mode='secondary'>
          Сохраненное время
          {savedTimes2.length > 0 && (
            <Link onClick={showAlert} style={{ marginLeft: 'auto', color: 'red' }}>
              Удалить
            </Link>
          )}
        </Header>
      }>
      {savedTimes2.length > 0 ? ( // Проверка на наличие сохраненных времен
        <CardGrid size="l">
          {savedTimes2.map((time2, index2) => (
            <Card mode="outline" key={index2}>
              <ContentCard
                mode="outline"
                subtitle="Нужно лечь спать в"
                header={<Headline level="1">{time2.wakeUpTime_2}</Headline>}
              />
              <ContentCard
                mode="outline"
                subtitle="Если времени осталось мало, засыпайте в"
                header={<div><Headline level="1">{time2.otherTime_2}</Headline>
                          <Headline level="1">{time2.otherTime_3}</Headline>
                    </div>}
              />
              <ContentCard
                mode="outline"
                subtitle="Указанное время для пробуждения"
                header={<Headline level="1">{time2.enteredWakeUpTime2}</Headline>}
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
)}