import React from 'react';
import { StyleSheet, View } from 'react-native';

// Compatible with expo-video VideoSource (optional peer dep)
type VideoSource = string | { uri: string; [key: string]: unknown };

interface BackgroundVideoProps {
  source: VideoSource;
  overlayOpacity?: number;
}

// Try to build the video component only when expo-video is available
let BackgroundVideoImpl: React.FC<BackgroundVideoProps> | null = null;

try {
  const { useVideoPlayer, VideoView } = require('expo-video'); // eslint-disable-line @typescript-eslint/no-require-imports

  BackgroundVideoImpl = ({ source, overlayOpacity = 0.5 }: BackgroundVideoProps) => {
    const player = useVideoPlayer(source, (p: any) => {
      p.loop = true;
      p.play();
      p.muted = true;
    });

    return (
      <View style={StyleSheet.absoluteFill}>
        <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]} />
      </View>
    );
  };
} catch {
  // expo-video not installed — BackgroundVideoImpl stays null
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = (props) => {
  if (BackgroundVideoImpl) {
    return React.createElement(BackgroundVideoImpl, props);
  }
  // Fallback: dark overlay only
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${props.overlayOpacity ?? 0.5})` }]}
    />
  );
};
