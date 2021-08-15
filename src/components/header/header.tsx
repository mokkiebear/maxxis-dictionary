import {
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { ELanguageCode } from "../../common/enums";

import "./header.css";

interface IProps {
    lang: ELanguageCode;
    word: string;
    onLangChange: (value: ELanguageCode) => void;
    onWordChange: (value: string) => void;
}

export const Header: React.FC<IProps> = ({
    lang,
    word,
    onLangChange,
    onWordChange,
}) => {
    const { t } = useTranslation();

    return (
        <div className="header">
            <span className="title">{word ? `${word} ${lang === ELanguageCode.RU ? "это" : "is"}...` : t("title")}</span>

            <div className="inputs">
                <TextField
                    label={t('enterWord')}
                    value={word}
                    onChange={(e) => onWordChange(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="lang-select-label">{t('selectLang')}</InputLabel>
                    <Select
                        labelId="lang-select-label"
                        value={lang}
                        onChange={(e) => onLangChange(e.target.value as ELanguageCode)}
                    >
                        {Object.values(ELanguageCode).map((languageCode) => (
                            <MenuItem key={languageCode} value={languageCode}>
                                {t(`${languageCode}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};
