import { COLORS } from "@/design/tokens";
import { Chirp, useChirpFont } from "@/hooks/use-chrip-font";
import { formatDate } from "@/utils/format-date";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { IPostCardActionRow } from "./interface";

const PostCardActionRow: React.FC<IPostCardActionRow> = ({
  date,
  time,
  views,
  style,
}: IPostCardActionRow): React.ReactNode &
  React.JSX.Element &
  React.ReactElement => {
  const { fontLoaded } = useChirpFont();

  return (
    <View style={[styles.actionRowContainer, style]}>
      <View>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.bullet} />
      <View>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <View style={styles.bullet} />

      <View>
        <Text style={styles.views}>
          <Text
            style={[
              styles.viewsCount,
              {
                fontFamily: fontLoaded ? Chirp.Bold : undefined,
              },
            ]}
          >
            {views}
          </Text>{" "}
          Views
        </Text>
      </View>
    </View>
  );
};

export { PostCardActionRow };

const styles = StyleSheet.create({
  actionRowContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingHorizontal: 3,
    alignItems: "center",
    gap: 6,
  },
  time: {
    fontSize: 15,
    color: COLORS.MUTED_FOREGROUND,
    fontWeight: "400",
  },
  date: {
    fontSize: 14,
    color: COLORS.MUTED_FOREGROUND,
    fontWeight: "400",
  },
  bullet: {
    height: 2,
    width: 2,
    borderRadius: 99,
    backgroundColor: COLORS.MUTED_FOREGROUND,
  },
  views: {
    color: COLORS.MUTED_FOREGROUND,
  },
  viewsCount: {
    color: COLORS.PRIMARY_FOREGROUND,
  },
});
