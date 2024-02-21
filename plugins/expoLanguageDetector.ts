import { LanguageDetectorModule } from "i18next";
import { getLocales } from "expo-localization";

const expoLanguageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},
  detect: () => {
    return getLocales()[0].languageCode;
  },
  cacheUserLanguage: () => {},
};

export default expoLanguageDetector;
