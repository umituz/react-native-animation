/**
 * Presentation - Image Gallery Hook
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { ImageViewerService } from '../../infrastructure/services/ImageViewerService';
import type {
  ImageViewerItem,
  ImageGalleryOptions,
} from '../../domain/entities/ImageTypes';

export interface UseImageGalleryReturn {
  visible: boolean;
  currentIndex: number;
  images: ImageViewerItem[];
  open: (images: ImageViewerItem[] | string[], startIndex?: number, options?: ImageGalleryOptions) => void;
  close: () => void;
  setIndex: (index: number) => void;
  options: ImageGalleryOptions;
}

export const useImageGallery = (
  defaultOptions?: ImageGalleryOptions
): UseImageGalleryReturn => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageViewerItem[]>([]);
  const [galleryOptions, setGalleryOptions] = useState<ImageGalleryOptions>(
    defaultOptions || ImageViewerService.getDefaultOptions()
  );

  // Use ref to track latest options and avoid stale closures
  const optionsRef = useRef(galleryOptions);

  useEffect(() => {
    optionsRef.current = galleryOptions;
  }, [galleryOptions]);

  const open = useCallback(
    (
      imageData: ImageViewerItem[] | string[],
      startIndex: number = 0,
      options?: ImageGalleryOptions
    ) => {
      const preparedImages =
        typeof imageData[0] === 'string'
          ? ImageViewerService.prepareImages(imageData as string[])
          : ImageViewerService.prepareImagesWithMetadata(imageData as ImageViewerItem[]);

      setImages(preparedImages);
      setCurrentIndex(options?.index ?? startIndex);

      if (options) {
        setGalleryOptions(prev => ({
          ...prev,
          ...options,
        }));
      }

      setVisible(true);
    },
    []
  );

  const close = useCallback(() => {
    setVisible(false);

    if (optionsRef.current.onDismiss) {
      optionsRef.current.onDismiss();
    }
  }, []);

  const setIndex = useCallback((index: number) => {
    setCurrentIndex(index);

    if (optionsRef.current.onIndexChange) {
      optionsRef.current.onIndexChange(index);
    }
  }, []);

  const options = useMemo(() => ({
    backgroundColor: galleryOptions.backgroundColor || '#000000',
    swipeToCloseEnabled: galleryOptions.swipeToCloseEnabled ?? true,
    doubleTapToZoomEnabled: galleryOptions.doubleTapToZoomEnabled ?? true,
  }), [galleryOptions]);

  return {
    visible,
    currentIndex,
    images,
    open,
    close,
    setIndex,
    options,
  };
};

