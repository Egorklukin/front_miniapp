import React, { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const [wakeUpTime, setWakeUpTime] = useState('');
    const [otherTimes, setOtherTimes] = useState([]);

    return (
        <TimeContext.Provider value={{ wakeUpTime, setWakeUpTime, otherTimes, setOtherTimes }}>
            {children}
        </TimeContext.Provider>
    );
};

export const useTime = () => useContext(TimeContext);
