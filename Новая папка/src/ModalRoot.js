import React,{useState} from 'react';
import { ModalCard, ModalRoot, Spacing, Button } from '@vkontakte/vkui';
import {Icon16Moon,Icon16Sun} from '@vkontakte/icons'
import {useSearchParams,useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { DEFAULT_MODALS } from './routes';
import { ModalMoon } from './ModalMoon';
import { ModalSun } from './ModalSun';

export const Modals = (id) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalHistory, setModalHistory] = useState([]);
  const [searchParams] = useSearchParams();
  const routeNavigator = useRouteNavigator();
  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };

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
 
return (
      <ModalRoot activeModal={activeModal} onClose={onClose}>
         <ModalMoon onClose={onClose} id={DEFAULT_MODALS.MODAL_CARD_Moon} />
         <ModalSun onClose={onClose} id={DEFAULT_MODALS.MODAL_CARD_Sun} />
      </ModalRoot>
  )}

export default Modals;