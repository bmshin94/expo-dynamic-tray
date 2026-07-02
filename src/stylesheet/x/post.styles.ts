import { COLORS, SPACING } from "@/design/tokens";
import { StyleSheet } from "react-native";

const postStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  glassButtonText: {
    color: COLORS.SURFACE,
    fontWeight: "700",
    fontSize: 13,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.XS,
  },
  labelGap: {
    gap: 4,
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
  },
  icon: {
    top: 1.5,
  },
  commentRow: {
    flexDirection: "row",
    paddingTop: 12,
  },
  commentHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.XS,
    paddingHorizontal: 12,
  },
  commentContentHeading: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  commentContent: {
    color: COLORS.FOREGROUND,
  },
  commentActions: { paddingHorizontal: 6, gap: 40 },
  postCommentActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.SM,
    paddingTop: 4,
    left: 8,
  },
});

export { postStyles };
