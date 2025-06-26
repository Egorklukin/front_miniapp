import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  FormLayoutGroup,
  Input,
  Headline,
  ButtonGroup,
  FormItem,
  Button,
  Group,
  CardGrid,
  Header,
  Card,
  Placeholder,
  ContentCard,
  Div,
  FixedLayout
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useTime } from './TimeContext';

import {Icon16ArrowTriangleUp,Icon56MoonOutline,
  Icon16ArrowTriangleDown
 } from '@vkontakte/icons';

export const Phases = ({ id }) => {
  const [sleepHours, setSleepHours] = useState('');
  const [sleepMinutes, setSleepMinutes] = useState('');
  const [wakeUpTime1, setWakeUpTime1] = useState('');
  const [otherTime1, setOtherTime1] = useState('');
  const [otherTime1_2, setOtherTime1_2] = useState('');
  const [otherTime1_3, setOtherTime1_3] = useState('');
  const [otherTime1_4, setOtherTime1_4] = useState('');
  const [otherTime1_5, setOtherTime1_5] = useState('');
  const [otherTime1_6, setOtherTime1_6] = useState('');
  const [otherTime1_7, setOtherTime1_7] = useState('');
  const [otherTime1_8, setOtherTime1_8] = useState('');
  const [otherTime1_9, setOtherTime1_9] = useState('');
  const [otherTime1_10, setOtherTime1_10] = useState('');
  const [otherTime1_11, setOtherTime1_11] = useState('');
  const [otherTime1_12, setOtherTime1_12] = useState('');
  const [otherTime1_13, setOtherTime1_13] = useState('');
  const [otherTime1_14, setOtherTime1_14] = useState('');
  const [otherTime1_15, setOtherTime1_15] = useState('');
  const [otherTime1_16, setOtherTime1_16] = useState('');
  const [otherTime1_17, setOtherTime1_17] = useState('');
  const [otherTime1_18, setOtherTime1_18] = useState('');
  const [otherTime1_19, setOtherTime1_19] = useState('');
  const [otherTime1_20, setOtherTime1_20] = useState('');
  const [otherTime1_21, setOtherTime1_21] = useState('');
  const [otherTime1_22, setOtherTime1_22] = useState('');
  const [otherTime1_23, setOtherTime1_23] = useState('');
  const [otherTime1_24, setOtherTime1_24] = useState('');
  const [otherTime1_25, setOtherTime1_25] = useState('');
  const [showElement, setShowElement] = useState(false);
  const [showElement1, setShowElement1] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  const { wakeUpTime } = useTime();
  const [calculatedTime, setCalculatedTime] = useState('');
  const [visibleElement, setVisibleElement] = useState({
    first: false,
    second: true,
    third: true
  });
  const toggleElements = () => {
    setVisibleElement(prevState => ({
      first: !prevState.first,
      second: !prevState.second,
      third: !prevState.third
    }));
  };
  const toggleVisibility1 = () => {
    setIsVisible(!isVisible);
  };
  const handleKeyPress = (event) => {
    const invalidChars = ['.', ',','-'];
    const keyPressed = String.fromCharCode(event.charCode || event.keyCode);
  
    if (invalidChars.includes(keyPressed)) {
      event.preventDefault();
    }
  };
  const handleStartChange = (event) => {
    setSleepHours(event.target.value);
  };
  const handleEndChange = (event) => {
    setSleepMinutes(event.target.value);
    setIsButtonDisabled1(sleepMinutes.trim() === ''|| sleepHours.trim() === '');
  };
  const calculateWakeUpTime = (wakeUpTime) => {
    let hours1 = parseInt(sleepHours, 10);
    let minutes1 = parseInt(sleepMinutes, 10);
    let other_hours = parseInt(sleepHours, 10);
    let other_minutes = parseInt(sleepMinutes, 10);
    let other_hours2 = parseInt(sleepHours, 10);
    let other_minutes2 = parseInt(sleepMinutes, 10);
    let other_hours3 = parseInt(sleepHours, 10);
    let other_minutes3 = parseInt(sleepMinutes, 10);
    let other_hours4 = parseInt(sleepHours, 10);
    let other_minutes4 = parseInt(sleepMinutes, 10);
    let other_hours5 = parseInt(sleepHours, 10);
    let other_minutes5 = parseInt(sleepMinutes, 10);
    let other_hours6 = parseInt(sleepHours, 10);
    let other_minutes6 = parseInt(sleepMinutes, 10);
    let other_hours7 = parseInt(sleepHours, 10);
    let other_minutes7 = parseInt(sleepMinutes, 10);
    let other_hours8 = parseInt(sleepHours, 10);
    let other_minutes8 = parseInt(sleepMinutes, 10);
    let other_hours9 = parseInt(sleepHours, 10);
    let other_minutes9 = parseInt(sleepMinutes, 10);
    let other_hours10 = parseInt(sleepHours, 10);
    let other_minutes10 = parseInt(sleepMinutes, 10);
    let other_hours11 = parseInt(sleepHours, 10);
    let other_minutes11 = parseInt(sleepMinutes, 10);
    let other_hours12 = parseInt(sleepHours, 10);
    let other_minutes12 = parseInt(sleepMinutes, 10);
    let other_hours13 = parseInt(sleepHours, 10);
    let other_minutes13 = parseInt(sleepMinutes, 10);
    let other_hours14 = parseInt(sleepHours, 10);
    let other_minutes14 = parseInt(sleepMinutes, 10);
    let other_hours15 = parseInt(sleepHours, 10);
    let other_minutes15 = parseInt(sleepMinutes, 10);
    let other_hours16 = parseInt(sleepHours, 10);
    let other_minutes16 = parseInt(sleepMinutes, 10);
    let other_hours17 = parseInt(sleepHours, 10);
    let other_minutes17 = parseInt(sleepMinutes, 10);
    let other_hours18 = parseInt(sleepHours, 10);
    let other_minutes18 = parseInt(sleepMinutes, 10);
    let other_hours19 = parseInt(sleepHours, 10);
    let other_minutes19 = parseInt(sleepMinutes, 10);
    let other_hours20 = parseInt(sleepHours, 10);
    let other_minutes20 = parseInt(sleepMinutes, 10);
    let other_hours21 = parseInt(sleepHours, 10);
    let other_minutes21 = parseInt(sleepMinutes, 10);
    let other_hours22 = parseInt(sleepHours, 10);
    let other_minutes22 = parseInt(sleepMinutes, 10);
    let other_hours23 = parseInt(sleepHours, 10);
    let other_minutes23 = parseInt(sleepMinutes, 10);
    let other_hours24 = parseInt(sleepHours, 10);
    let other_minutes24 = parseInt(sleepMinutes, 10);
    let other_hours25 = parseInt(sleepHours, 10);
    let other_minutes25 = parseInt(sleepMinutes, 10);
    // Если минуты больше 60, переносим их в часы
    if (minutes1 >= 60) {
      hours1 += Math.floor(minutes1 / 60);
      minutes1 %= 60;
    }
    if (other_hours10 > 20) {
      other_hours10 -=24;
    }
    other_hours=hours1+0
    other_minutes=minutes1+7
    other_hours2=hours1+0
    other_minutes2=other_minutes+20
    other_hours3=hours1+1
    other_minutes3=minutes1+4
    other_hours4=other_hours3+0
    other_minutes4=other_minutes3+20
    other_hours5=other_hours4+0
    other_minutes5=other_minutes4+10
    other_hours6=other_hours5+0
    other_minutes6=other_minutes5+7
    other_hours7=other_hours6+1
    other_minutes7=minutes1+1
    other_hours8=other_hours7+0
    other_minutes8=other_minutes7+37
    other_hours9=other_hours8+0
    other_minutes9=other_minutes8+20
    other_hours10=other_hours9+1
    other_minutes10=minutes1+8
    other_hours11=other_hours10+0
    other_minutes11=other_minutes10+7
    other_hours12=other_hours11+0
    other_minutes12=other_minutes11+20
    other_hours13=other_hours12+1
    other_minutes13=minutes1+12
    other_hours14=other_hours13+0
    other_minutes14=other_minutes13+20
    other_hours15=other_hours14+0
    other_minutes15=other_minutes14+10
    other_hours16=other_hours15+0
    other_minutes16=other_minutes15+7
    other_hours17=other_hours16+1
    other_minutes17=minutes1+9
    other_hours18=other_hours17+0
    other_minutes18=other_minutes17+37
    other_hours19=other_hours18+1
    other_minutes19=minutes1+6
    other_hours20=other_hours19+0
    other_minutes20=other_minutes19+10
    other_hours21=other_hours20+0
    other_minutes21=other_minutes20+7
    other_hours22=other_hours21+0
    other_minutes22=other_minutes21+20
    other_hours23=other_hours22+1
    other_minutes23=minutes1+20
    other_hours24=other_hours23+0
    other_minutes24=other_minutes23+20
    other_hours25=other_hours24+0
    other_minutes25=other_minutes24+10
    if (minutes1 >= 60) {
      hours1 += Math.floor(minutes1 / 60);
      minutes1 %= 60;
    }
    if (other_minutes >= 60) {
      other_hours += Math.floor(other_minutes / 60);
      other_minutes %= 60;
    }
    if (other_minutes2 >= 60) {
      other_hours2 += Math.floor(other_minutes2 / 60);
      other_minutes2 %= 60;
    }
    if (other_minutes3 >= 60) {
      other_hours3 += Math.floor(other_minutes3 / 60);
      other_minutes3 %= 60;
    }
    if (other_minutes4 >= 60) {
      other_hours4 += Math.floor(other_minutes4 / 60);
      other_minutes4 %= 60;
    }
    if (other_minutes5 >= 60) {
      other_hours5 += Math.floor(other_minutes5 / 60);
      other_minutes5 %= 60;
    }
    if (other_minutes6 >= 60) {
      other_hours6 += Math.floor(other_minutes6 / 60);
      other_minutes6 %= 60;
    }
    if (other_minutes7 >= 60) {
      other_hours7 += Math.floor(other_minutes7 / 60);
      other_minutes7 %= 60;
    }
    if (other_minutes8 >= 60) {
      other_hours8 += Math.floor(other_minutes8 / 60);
      other_minutes8 %= 60;
    }
    if (other_minutes9 >= 60) {
      other_hours9 += Math.floor(other_minutes9 / 60);
      other_minutes9 %= 60;
    }
    if (other_minutes10 >= 60) {
      other_hours10 += Math.floor(other_minutes10 / 60);
      other_minutes10 %= 60;
    }
    if (other_minutes11 >= 60) {
      other_hours11 += Math.floor(other_minutes11 / 60);
      other_minutes11 %= 60;
    }
    if (other_minutes12 >= 60) {
      other_hours12 += Math.floor(other_minutes12 / 60);
      other_minutes12 %= 60;
    }
    if (other_minutes13 >= 60) {
      other_hours13 += Math.floor(other_minutes13 / 60);
      other_minutes13 %= 60;
    }
    if (other_minutes14 >= 60) {
      other_hours14 += Math.floor(other_minutes14 / 60);
      other_minutes14 %= 60;
    }
    if (other_minutes15 >= 60) {
      other_hours15 += Math.floor(other_minutes15 / 60);
      other_minutes15 %= 60;
    }
    if (other_minutes16 >= 60) {
      other_hours16 += Math.floor(other_minutes16 / 60);
      other_minutes16 %= 60;
    }
    if (other_minutes17 >= 60) {
      other_hours17 += Math.floor(other_minutes17 / 60);
      other_minutes17 %= 60;
    }
    if (other_minutes18 >= 60) {
      other_hours18 += Math.floor(other_minutes18 / 60);
      other_minutes18 %= 60;
    }
    if (other_minutes19 >= 60) {
      other_hours19 += Math.floor(other_minutes19 / 60);
      other_minutes19 %= 60;
    }
    if (other_minutes20 >= 60) {
      other_hours20 += Math.floor(other_minutes20 / 60);
      other_minutes20 %= 60;
    }
    if (other_minutes21 >= 60) {
      other_hours21 += Math.floor(other_minutes21 / 60);
      other_minutes21 %= 60;
    }
    if (other_minutes22 >= 60) {
      other_hours22 += Math.floor(other_minutes22 / 60);
      other_minutes22 %= 60;
    }
    if (other_minutes23 >= 60) {
      other_hours23 += Math.floor(other_minutes23 / 60);
      other_minutes23 %= 60;
    }
    if (other_minutes24 >= 60) {
      other_hours24 += Math.floor(other_minutes24 / 60);
      other_minutes24 %= 60;
    }
    if (other_minutes25 >= 60) {
      other_hours25 += Math.floor(other_minutes25 / 60);
      other_minutes25 %= 60;
    }
    // Если минуты больше 60, переносим их в часы
    if (other_hours >= 24) {
      other_hours -= 24;
    }
    if (other_hours2 >= 24) {
      other_hours2 -= 24;
    }
    if (other_hours3 >= 24) {
      other_hours3 -= 24;
    }
    if (other_hours4 >= 24) {
      other_hours4 -= 24;
    }
    if (other_hours5 >= 24) {
      other_hours5 -= 24;
    }
    if (other_hours6 >= 24) {
      other_hours6 -= 24;
    }
    if (other_hours7 >= 24) {
      other_hours7 -= 24;
    }
    if (other_hours8 >= 24) {
      other_hours8 -= 24;
    }
    if (other_hours9 >= 24) {
      other_hours9 -= 24;
    }
    if (other_hours10 >= 24) {
      other_hours10 -= 24;
    }
    if (other_hours11 >= 24) {
      other_hours11 -= 24;
    }
    if (other_hours12 >= 24) {
      other_hours12 -= 24;
    }
    if (other_hours13 >= 24) {
      other_hours13 -= 24;
    }
    if (other_hours14 >= 24) {
      other_hours14 -= 24;
    }
    if (other_hours15 >= 24) {
      other_hours15 -= 24;
    }
    if (other_hours16 >= 24) {
      other_hours16 -= 24;
    }
    if (other_hours17 >= 24) {
      other_hours17 -= 24;
    }
    if (other_hours18 >= 24) {
      other_hours18 -= 24;
    }
    if (other_hours19 >= 24) {
      other_hours19 -= 24;
    }
    if (other_hours20 >= 24) {
      other_hours20 -= 24;
    }
    if (other_hours21 >= 24) {
      other_hours21 -= 24;
    }
    if (other_hours22 >= 24) {
      other_hours22 -= 24;
    }
    if (other_hours23 >= 24) {
      other_hours23 -= 24;
    }
    if (other_hours24 >= 24) {
      other_hours24 -= 24;
    }
    if (other_hours25 >= 24) {
      other_hours25 -= 24;
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
    other_hours4 = (`0${other_hours4}`).slice(-2);
    other_minutes4 = (`0${other_minutes4}`).slice(-2);
    other_hours5 = (`0${other_hours5}`).slice(-2);
    other_minutes5 = (`0${other_minutes5}`).slice(-2);
    other_hours6 = (`0${other_hours6}`).slice(-2);
    other_minutes6 = (`0${other_minutes6}`).slice(-2);
    other_hours7 = (`0${other_hours7}`).slice(-2);
    other_minutes7 = (`0${other_minutes7}`).slice(-2);
    other_hours8 = (`0${other_hours8}`).slice(-2);
    other_minutes8 = (`0${other_minutes8}`).slice(-2);
    other_hours9 = (`0${other_hours9}`).slice(-2);
    other_minutes9 = (`0${other_minutes9}`).slice(-2);
    other_hours10 = (`0${other_hours10}`).slice(-2);
    other_minutes10 = (`0${other_minutes10}`).slice(-2);
    other_hours11 = (`0${other_hours11}`).slice(-2);
    other_minutes11 = (`0${other_minutes11}`).slice(-2);
    other_hours12 = (`0${other_hours12}`).slice(-2);
    other_minutes12 = (`0${other_minutes12}`).slice(-2);
    other_hours13 = (`0${other_hours13}`).slice(-2);
    other_minutes13 = (`0${other_minutes13}`).slice(-2);
    other_hours14 = (`0${other_hours14}`).slice(-2);
    other_minutes14 = (`0${other_minutes14}`).slice(-2);
    other_hours15 = (`0${other_hours15}`).slice(-2);
    other_minutes15 = (`0${other_minutes15}`).slice(-2);
    other_hours16 = (`0${other_hours16}`).slice(-2);
    other_minutes16 = (`0${other_minutes16}`).slice(-2);
    other_hours17 = (`0${other_hours17}`).slice(-2);
    other_minutes17 = (`0${other_minutes17}`).slice(-2);
    other_hours18 = (`0${other_hours18}`).slice(-2);
    other_minutes18 = (`0${other_minutes18}`).slice(-2);
    other_hours19 = (`0${other_hours19}`).slice(-2);
    other_minutes19 = (`0${other_minutes19}`).slice(-2);
    other_hours20 = (`0${other_hours20}`).slice(-2);
    other_minutes20 = (`0${other_minutes20}`).slice(-2);
    other_hours21 = (`0${other_hours21}`).slice(-2);
    other_minutes21 = (`0${other_minutes21}`).slice(-2);
    other_hours22 = (`0${other_hours22}`).slice(-2);
    other_minutes22 = (`0${other_minutes22}`).slice(-2);
    other_hours23 = (`0${other_hours23}`).slice(-2);
    other_minutes23 = (`0${other_minutes23}`).slice(-2);
    other_hours24 = (`0${other_hours24}`).slice(-2);
    other_minutes24 = (`0${other_minutes24}`).slice(-2);
    other_hours25 = (`0${other_hours25}`).slice(-2);
    other_minutes25 = (`0${other_minutes25}`).slice(-2);
    setWakeUpTime1(`${sleepHours}:${sleepMinutes}`);
    setOtherTime1(`${other_hours}:${other_minutes}`)
    setOtherTime1_2(`${other_hours2}:${other_minutes2}`)
    setOtherTime1_3(`${other_hours3}:${other_minutes3}`)
    setOtherTime1_4(`${other_hours4}:${other_minutes4}`)
    setOtherTime1_5(`${other_hours5}:${other_minutes5}`)
    setOtherTime1_6(`${other_hours6}:${other_minutes6}`)
    setOtherTime1_7(`${other_hours7}:${other_minutes7}`)
    setOtherTime1_8(`${other_hours8}:${other_minutes8}`)
    setOtherTime1_9(`${other_hours9}:${other_minutes9}`)
    setOtherTime1_10(`${other_hours10}:${other_minutes10}`)
    setOtherTime1_11(`${other_hours11}:${other_minutes11}`)
    setOtherTime1_12(`${other_hours12}:${other_minutes12}`)
    setOtherTime1_13(`${other_hours13}:${other_minutes13}`)
    setOtherTime1_14(`${other_hours14}:${other_minutes14}`)
    setOtherTime1_15(`${other_hours15}:${other_minutes15}`)
    setOtherTime1_16(`${other_hours16}:${other_minutes16}`)
    setOtherTime1_17(`${other_hours17}:${other_minutes17}`)
    setOtherTime1_18(`${other_hours18}:${other_minutes18}`)
    setOtherTime1_19(`${other_hours19}:${other_minutes19}`)
    setOtherTime1_20(`${other_hours20}:${other_minutes20}`)
    setOtherTime1_21(`${other_hours21}:${other_minutes21}`)
    setOtherTime1_22(`${other_hours22}:${other_minutes22}`)
    setOtherTime1_23(`${other_hours23}:${other_minutes23}`)
    setOtherTime1_24(`${other_hours24}:${other_minutes24}`)
    setOtherTime1_25(`${other_hours25}:${other_minutes25}`)
    if (!showElement) {
      setShowElement(true);
    }
    if (!showElement1) {
      setShowElement1(false);
    }
  };
  const handleWakeUpHoursChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 23) {
      setSleepHours(inputValue);
    } else {
      e.target.value = '';
    }
  };
  const handleWakeUpMinChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && Number(inputValue) <= 59) {
      setSleepMinutes(inputValue);
    } else {
      e.target.value = '';
    }
  };
  return (
    <Panel id={id}>
      <PanelHeader>Фазы сна</PanelHeader>
      <Group>{visibleElement.first && (
      <Group mode="plain"
      header={<Header mode="secondary">1 фаза</Header>}
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Медленный сон"
              header={<div>
                <Headline level="2">{wakeUpTime1}</Headline>
                <Headline level="2">{otherTime1}</Headline>
                <Headline level="2">{otherTime1_2}</Headline>
                <Headline level="2">{otherTime1_3}</Headline>
                </div>}
            />
            <ContentCard
              mode="outline"
              subtitle="Быстрый сон"
              header={
              <Headline level="2">{otherTime1_4}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>)}
        {visibleElement.second && showElement &&(
          <CardGrid size="l">
          <ContentCard
              subtitle="1 цикл"
              header={<div>
                <Headline level="2">{otherTime1_4}</Headline>
              </div>}
              mode="outline"
            />
            <ContentCard
              subtitle="2 цикл"
              header={<div>
                <Headline level="2">{otherTime1_9}</Headline>
              </div>}
              mode="outline"
            />
            <ContentCard
              subtitle="3 цикл"
              header={<div>
                <Headline level="2">{otherTime1_14}</Headline>
              </div>}
              mode="outline"
            />
            <ContentCard
              subtitle="4 цикл"
              header={<div>
                <Headline level="2">{otherTime1_19}</Headline>
              </div>}
              mode="outline"
            />
            <ContentCard
              subtitle="5 цикл"
              header={<div>
                <Headline level="2">{otherTime1_24}</Headline>
              </div>}
              mode="outline"
            />
          </CardGrid>)}
      {visibleElement.third &&(
      <Placeholder
      icon={<Icon56MoonOutline width={50} height={50}/>}
        title="Уведомления от сообществ"
      >
        Здесь появятся все фазы сна в зависимости от указанного Вами времени, в которое Вы засыпаете
      </Placeholder>)}
      {visibleElement.first && (
      <Group mode="plain"
      header={<Header mode="secondary">2 фаза</Header>}
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Медленный сон"
              header={<div>
                <Headline level="2">{otherTime1_5}</Headline>
                <Headline level="2">{otherTime1_6}</Headline>
                <Headline level="2">{otherTime1_7}</Headline>
                <Headline level="2">{otherTime1_8}</Headline>
                </div>}
            />
            <ContentCard
              mode="outline"
              subtitle="Быстрый сон"
              header={
              <Headline level="2">{otherTime1_9}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>
      )}
      {visibleElement.first && (
      <Group mode="plain"
      header={<Header mode="secondary">3 фаза</Header>}
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Медленный сон"
              header={<div>
                <Headline level="2">{otherTime1_10}</Headline>
                <Headline level="2">{otherTime1_11}</Headline>
                <Headline level="2">{otherTime1_12}</Headline>
                <Headline level="2">{otherTime1_13}</Headline>
                </div>}
            />
            <ContentCard
              mode="outline"
              subtitle="Быстрый сон"
              header={
              <Headline level="2">{otherTime1_14}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>
      )}
      {visibleElement.first && (
      <Group mode="plain"
      header={<Header mode="secondary">4 фаза</Header>}
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Медленный сон"
              header={<div>
                <Headline level="2">{otherTime1_15}</Headline>
                <Headline level="2">{otherTime1_16}</Headline>
                <Headline level="2">{otherTime1_17}</Headline>
                <Headline level="2">{otherTime1_18}</Headline>
                </div>}
            />
            <ContentCard
              mode="outline"
              subtitle="Быстрый сон"
              header={
              <Headline level="2">{otherTime1_19}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>
      )}
      {visibleElement.first && (
      <Group mode="plain"
      header={<Header mode="secondary">5 фаза</Header>}
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Медленный сон"
              header={<div>
              <Headline level="2">{otherTime1_20}</Headline>
              <Headline level="2">{otherTime1_21}</Headline>
              <Headline level="2">{otherTime1_22}</Headline>
              <Headline level="2">{otherTime1_23}</Headline>
              </div>}
            />
            <ContentCard
              mode="outline"
              subtitle="Быстрый сон"
              header={
              <Headline level="2">{otherTime1_24}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>
      )}
      {visibleElement.first && (
      <Group mode="plain"
      separator='hide'
      >
        <CardGrid size="l">
          <Card mode="outline">
            <ContentCard
              mode="outline"
              subtitle="Время пробуждения"
              header={
              <Headline level="2">{otherTime1_25}</Headline>}
            />
          </Card>
        </CardGrid>
      </Group>
      )}
      {showElement && (
          <Button
            size="l"
            appearance="accent"
            mode="tertiary"
            onClick={toggleElements || showElement1(false)}
            after={visibleElement.first ? <Icon16ArrowTriangleUp/> :<Icon16ArrowTriangleDown/>}
          >
          {visibleElement.first ? 'Скрыть' : 'Показать все фазы'}
          </Button>)}
      <FormLayoutGroup mode="horizontal">
        <FormItem top="Часы" htmlFor="start">
            <Input
              id="start"
              type="number"
              min="0"
              max="23"
              onInput={handleWakeUpHoursChange}
              onKeyPress={handleKeyPress}
              value={sleepHours}
              onChange={handleStartChange}
              placeholder='21'
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
              value={sleepMinutes}
              onChange={handleEndChange}
              maxLength="2"
              placeholder='00'
            />
          </FormItem>
          </FormLayoutGroup>
          <Div>
          <Button onClick={calculateWakeUpTime||toggleElements}
          disabled={!sleepMinutes||!sleepHours}
          >Рассчитать</Button>
          </Div>
          </Group>
    </Panel>
  );
};