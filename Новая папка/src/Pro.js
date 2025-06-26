import React, { useState } from 'react';
import {
  MiniInfoCell
} from '@vkontakte/vkui';
import { Icon24ListAdd } from '@vkontakte/icons';

export const Pro = ({ id }) => {

  return (
    <MiniInfoCell before={<Icon24ListAdd />} textWrap="full"
    mode='more'
    >
      Команда вконтакте
    </MiniInfoCell>
  );
};