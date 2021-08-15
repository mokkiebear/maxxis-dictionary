import {
  Container,
  createTheme,
  CssBaseline,
  Switch,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";

import { Header } from "./components/header/header";
import { Definitions } from "./components/definitions/definitions";
import { IWordDefinition } from "./common/types";
import { ELanguageCode } from "./common/enums";

import "./App.css";
import i18n from "./locales/i18n";
import { useTranslation } from "react-i18next";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDataExists, setIsDataExists] = useState(false);

  const [word, setWord] = useState<string>("");
  const [lang, setLang] = useState<ELanguageCode>(ELanguageCode.EN);
  const [wordDefinitions, setWordDefinitions] = useState<IWordDefinition[]>([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: isDarkMode ? "#EBEBEB" : "#1D2D50",
      },
      secondary: {
        main: "#FF4C29",
      },
      background: {
        default: isDarkMode ? "#1D2D50" : "#EBEBEB",
      },
      text: {
        primary: isDarkMode ? "#EBEBEB" : "#1D2D50",
        secondary: isDarkMode ? "#EBEBEB" : "#1D2D50",
      },
      type: isDarkMode ? "dark" : "light",
    },
  });

  const invokeDebounced = useDebounce(() => {
    setWordDefinitions([]);
    dictionaryApi(lang, word);
  }, 1000);

  useEffect(() => {
    invokeDebounced();
  }, [invokeDebounced, word, lang]);

  const dictionaryApi = async (lang: string, word: string) => {
    if (!word) {
      return;
    }

    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`
      );

      setWordDefinitions(data.data);
      setIsDataExists(true);
    } catch (error) {
      console.log(error);
      setIsDataExists(false);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(
      lang === ELanguageCode.RU ? ELanguageCode.RU : ELanguageCode.EN
    );
  }, [lang]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container className="container" maxWidth="md">
          <div style={{ position: "absolute", top: 10, right: 15 }}>
            <span style={{ fontWeight: "bold" }}>{t("darkMode")}</span>
            <Switch
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
          </div>
          <Header
            word={word}
            lang={lang}
            onWordChange={(value) => setWord(value)}
            onLangChange={(value) => setLang(value)}
          />
          {!isDataExists && word ? "Не найдено." : null}
          <Definitions word={word} lang={lang} meanings={wordDefinitions} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
