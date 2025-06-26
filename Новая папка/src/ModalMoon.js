import React,{useState} from 'react';
import { ModalCard, Spacing, Button } from '@vkontakte/vkui';
import {Icon16Moon} from '@vkontakte/icons'
import {useSearchParams,useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';


export const ModalMoon = (id) => {
  const [searchParams] = useSearchParams();
  const routeNavigator = useRouteNavigator();
  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };
 
return (
    <ModalCard
                id={id}
                onClose={onClose}
                icon={<Icon16Moon />}
                header="Во сколько мне ложиться спать?"
                subheader="Укажите время, в которое вы хотели бы лечь спать, нажмите Рассчитать.Этот рассчет учитывает фазы сна и позволит вам проснуться в идеальное время."
                actions={
                  <React.Fragment>
                    <Spacing size={16} />
                  </React.Fragment>
                }
              />
)}
  ModalMoon.propTypes = {
    id: PropTypes.string.isRequired,
  };