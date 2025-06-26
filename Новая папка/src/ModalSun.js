import React,{useState} from 'react';
import { ModalCard, Spacing, Button } from '@vkontakte/vkui';
import {Icon16Sun} from '@vkontakte/icons'
import {useSearchParams,useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';


export const ModalSun = (id) => {
  const [searchParams] = useSearchParams();
  const routeNavigator = useRouteNavigator();
  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };
 
return (
    <ModalCard
                id={id}
                onClose={onClose}
                icon={<Icon16Sun />}
                header="Во сколько мне ложиться спать?"
                subheader="Укажите время, в которое вы хотели бы встать, нажмите Рассчитать.Этот рассчет учитывает фазы сна и позволит вам проснуться в идеальное время."
                actions={
                  <React.Fragment>
                    <Spacing size={16} />
                  </React.Fragment>
                }
              />
)}
  ModalSun.propTypes = {
    id: PropTypes.string.isRequired,
  };