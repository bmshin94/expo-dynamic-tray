// do not use, this was only for testing purposes
import { useFonts } from "expo-font";

enum Chirp {
  Heavy = "heavy",
  Bold = "bold",
  Medium = "medium",
  Regular = "regular",
}

const useChirpFont = () => {
  const [fontLoaded] = useFonts({
    [Chirp.Heavy]: require("@/assets/chirp/heavy.ttf"),
    [Chirp.Bold]: require("@/assets/chirp/bold.ttf"),
    [Chirp.Medium]: require("@/assets/chirp/medium.ttf"),
    [Chirp.Regular]: require("@/assets/chirp/regular.ttf"),
  });
  return { fontLoaded };
};

export { Chirp, useChirpFont };
