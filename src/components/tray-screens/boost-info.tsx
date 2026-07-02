import { COLORS } from "@/design/tokens";
import { useTray } from "@/hooks/use-tray";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Text, View } from "react-native";
import { SheetHeader } from "./boost-shared";

export default function BoostInfoView() {
  const { goBack } = useTray();

  const player = useVideoPlayer(
    require("@/assets/videos/boost-info.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  return (
    <View style={{}}>
      <SheetHeader title="How it works" onBack={goBack} />

      <View style={styles.videoWrap}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
        />
      </View>

      <Text style={styles.description}>
        Select your boost tier and watch your post go viral. Boosted posts will
        be labeled as boosted.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 420 },
  videoWrap: {
    marginTop: 20,
    height: 250,
    borderRadius: 24,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: 250,
  },
  description: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",

    color: COLORS.MUTED_FOREGROUND,
  },
});
