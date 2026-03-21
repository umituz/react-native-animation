import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "../theme";
import { AtomicText } from "../atoms/AtomicText";
import { AtomicIcon } from "../atoms/icon/AtomicIcon";
import { Carousel } from "./Carousel";
import type { CarouselItem as CarouselItemType } from "./types";

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  action: () => void;
}

interface BannerCarouselProps {
  items: BannerItem[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ items }) => {
  const tokens = useAppDesignTokens();

  const renderBannerItem = (
    item: CarouselItemType<BannerItem>,
    _index: number,
  ) => {
    const bannerData = item.data;
    const spacing = tokens.spacing;

    return (
      <View
        style={[
          styles.banner,
          {
            backgroundColor: bannerData.backgroundColor,
            padding: spacing.xl,
            minHeight: 240,
            borderRadius: 28,
          },
        ]}
      >
        <View style={styles.bannerContent}>
          <View
            style={[styles.bannerTextContainer, { marginRight: spacing.lg }]}
          >
            <AtomicText
              type="headlineLarge"
              style={[
                styles.bannerTitle,
                {
                  color: tokens.colors.textInverse,
                  marginBottom: spacing.sm,
                  fontSize: 32,
                  lineHeight: 40,
                  letterSpacing: -0.5,
                },
              ]}
            >
              {bannerData.title}
            </AtomicText>
            <AtomicText
              type="bodyLarge"
              style={[
                styles.bannerSubtitle,
                {
                  color: tokens.colors.textInverse,
                  opacity: 0.95,
                  fontSize: 16,
                  lineHeight: 24,
                },
              ]}
            >
              {bannerData.subtitle}
            </AtomicText>
          </View>
          <View style={styles.bannerIconContainer}>
            <View
              style={[
                styles.bannerIconCircle,
                {
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              ]}
            >
              <AtomicIcon
                name="arrow-forward-outline"
                size="xl"
                color="onSurface"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const carouselItems: CarouselItemType<BannerItem>[] = items.map((item) => ({
    id: item.id,
    data: item,
    onPress: item.action,
  }));

  return (
    <Carousel
      items={carouselItems}
      renderItem={renderBannerItem}
      spacing={16}
      showDots={true}
      pagingEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  banner: {
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontWeight: "800",
  },
  bannerSubtitle: {
    fontWeight: "500",
  },
  bannerIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bannerIconCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
