/**
 * Presentation - Image Gallery Component
 *
 * High-performance image gallery.
 * Uses expo-image when available, falls back to React Native Image.
 */

import React, { useCallback, useRef, useMemo } from 'react';
import { Modal, View, Image as RNImage, StyleSheet, FlatList, useWindowDimensions, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ImageViewerItem, ImageGalleryOptions } from '../../domain/entities/ImageTypes';
import { GalleryHeader } from './GalleryHeader';

// Lazy-load expo-image (optional peer dep)
let ExpoImage: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ExpoImage = require('expo-image').Image;
} catch {
  // expo-image not installed — using React Native Image fallback
}

// Memoized image component (outside main component to avoid dependency issues)
const GalleryImage = React.memo<{ item: ImageViewerItem; style: any }>(({ item, style }) => (
  <View style={style.imageWrapper}>
    {ExpoImage ? (
      <ExpoImage
        source={{ uri: item.uri }}
        style={style.fullImage}
        contentFit="contain"
        cachePolicy="memory-disk"
        onError={() => { if (__DEV__) console.warn('[ImageGallery] Failed to load image:', item.uri); }}
      />
    ) : (
      <RNImage
        source={{ uri: item.uri }}
        style={style.fullImage}
        resizeMode="contain"
        onError={() => { if (__DEV__) console.warn('[ImageGallery] Failed to load image:', item.uri); }}
      />
    )}
  </View>
));
GalleryImage.displayName = 'GalleryImage';

export interface ImageGalleryProps extends ImageGalleryOptions {
  images: ImageViewerItem[];
  visible: boolean;
  onDismiss: () => void;
  index?: number;
  onImageChange?: (uri: string, index: number) => void | Promise<void>;
  enableEditing?: boolean;
  title?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  visible,
  onDismiss,
  index = 0,
  backgroundColor = '#000000',
  onIndexChange,
  onImageChange,
  enableEditing = false,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const currentIndexRef = useRef(index);

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1 },
    list: { flex: 1 },
    imageWrapper: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullImage: { width: '100%', height: '100%' },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
  }), [SCREEN_WIDTH, SCREEN_HEIGHT]);

  if (visible) {
    currentIndexRef.current = index;
  }

  const handleEdit = useCallback(async () => {
    const currentImage = images[currentIndexRef.current];
    if (!currentImage || !onImageChange) return;
    await onImageChange(currentImage.uri, currentIndexRef.current);
  }, [images, onImageChange]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const rawIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    const nextIndex = Math.max(0, Math.min(rawIndex, images.length - 1));
    if (nextIndex !== currentIndexRef.current) {
      currentIndexRef.current = nextIndex;
      onIndexChange?.(nextIndex);
    }
  }, [onIndexChange, SCREEN_WIDTH, images.length]);

  const renderItem = useCallback(({ item }: { item: ImageViewerItem }) => (
    <GalleryImage item={item} style={{ imageWrapper: styles.imageWrapper, fullImage: styles.fullImage }} />
  ), [styles.imageWrapper, styles.fullImage]);

  const getItemLayout = useCallback((_: unknown, i: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * i,
    index: i,
  }), [SCREEN_WIDTH]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={[styles.container, { backgroundColor }]}>
        <GalleryHeader
          onClose={onDismiss}
          onEdit={enableEditing ? handleEdit : undefined}
          title={title || `${currentIndexRef.current + 1} / ${images.length}`}
        />
        <FlatList
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={index}
          getItemLayout={getItemLayout}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, i) => `${item.uri}-${i}`}
          style={styles.list}
        />
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]} />
      </View>
    </Modal>
  );
};
