import { SPACING } from "@/design/tokens";
import { formatDuration } from "@/utils/format-duration";
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { VideoView } from "expo-video";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { IPostCardVideo } from "./interface";

const _GAP = SPACING.MD - 5;

const PostCardVideo: React.FC<IPostCardVideo> = ({
  player,
}: IPostCardVideo): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.videoContainer}>
      <VideoView player={player} style={styles.video} nativeControls={false} />

      <View style={[styles.playerControls]}>
        <View style={styles.playerControlsRow}>
          <GlassView style={styles.playerControlBox}>
            <Text style={{ color: "white" }}>
              {formatDuration<number>(player?.duration ?? 0)}
            </Text>
          </GlassView>
          <GlassView style={styles.volumeBox}>
            <SymbolView name={"speaker.slash"} tintColor={"white"} size={14} />
          </GlassView>
        </View>
      </View>
    </View>
  );
};

export { PostCardVideo };

const styles = StyleSheet.create({
  videoContainer: {
    paddingTop: SPACING.MD,
    borderWidth: 0.6,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: { width: "100%", height: 200, borderRadius: 10 },
  playerControls: {
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: _GAP,
    paddingHorizontal: 12,
  },
  playerControlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerControlBox: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  volumeBox: {
    width: 30,
    height: 30,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
