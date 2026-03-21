/**
 * AlertProvider Component
 */

import React from 'react';
import { AlertContainer } from './AlertContainer';

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {children}
            <AlertContainer />
        </>
    );
};
