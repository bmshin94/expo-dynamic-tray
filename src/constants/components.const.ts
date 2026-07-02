import { Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");
const BUTTON_HEIGHT = 50;
const BUTTON_WIDTH = windowWidth * 0.82;
const MIN_BUTTON_WIDTH = windowWidth * 0.4;
const EXPANDED_CARD_WIDTH = windowWidth * 0.9;
const EXPANDED_CARD_HEIGHT = 300;

export {
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
  EXPANDED_CARD_HEIGHT,
  EXPANDED_CARD_WIDTH,
  MIN_BUTTON_WIDTH,
};
