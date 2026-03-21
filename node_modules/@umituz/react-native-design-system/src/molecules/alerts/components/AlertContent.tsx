/**
 * AlertContent Component
 *
 * Shared title + message layout for alert variants.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AtomicText } from '../../../atoms';

interface AlertContentProps {
  title: string;
  message?: string;
  titleColor: string;
  messageColor: string;
  titleType?: 'bodyMedium' | 'titleLarge';
  messageType?: 'bodySmall' | 'bodyMedium';
  messageMarginTop?: number;
  titleNumberOfLines?: number;
  messageNumberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export function AlertContent({
  title,
  message,
  titleColor,
  messageColor,
  titleType = 'bodyMedium',
  messageType = 'bodySmall',
  messageMarginTop = 0,
  titleNumberOfLines = 2,
  messageNumberOfLines = 3,
  textAlign = 'left',
}: AlertContentProps) {
  return (
    <View style={styles.container}>
      <AtomicText
        type={titleType}
        style={[
          styles.title,
          { color: titleColor, textAlign },
        ]}
        numberOfLines={titleNumberOfLines}
      >
        {title}
      </AtomicText>

      {message && (
        <AtomicText
          type={messageType}
          style={[
            styles.message,
            {
              color: messageColor,
              marginTop: messageMarginTop,
              textAlign,
            },
          ]}
          numberOfLines={messageNumberOfLines}
        >
          {message}
        </AtomicText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
  },
  message: {
    opacity: 0.9,
  },
});
