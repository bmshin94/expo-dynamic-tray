import { WithSpringConfig } from "react-native-reanimated";

const HEIGHT_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 185,
  mass: 0.6,
  damping: 15,
};

const PRESENT_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 240,
  mass: 1,
  damping: 26,
};

const DRAG_RETURN_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 260,
  mass: 1,
  damping: 24,
};

export { DRAG_RETURN_SPRING_CONFIG, HEIGHT_SPRING_CONFIG, PRESENT_SPRING_CONFIG };
