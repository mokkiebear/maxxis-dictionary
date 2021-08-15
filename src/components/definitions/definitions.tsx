import React from "react";
import { useTranslation } from "react-i18next";

import { ELanguageCode } from "../../common/enums";
import { IWordDefinition } from "../../common/types";

import "./definitions.css";

interface IProps {
    lang: string;
    word: string;
    meanings: IWordDefinition[];
}

export const Definitions: React.FC<IProps> = ({ word, lang, meanings }) => {
    const { t } = useTranslation();

    return !!meanings.length ? (
        <div className="definitions">
            {meanings[0] && word && lang === ELanguageCode.EN && (
                <audio
                    src={meanings[0].phonetics?.[0]?.audio}
                    controls
                    style={{ borderRadius: "10px" }}
                >
                    Your browser doesn't support audio.
                </audio>
            )}

            {meanings.map((meaning: IWordDefinition) =>
                meaning.meanings.map((item) =>
                    item.definitions.map((def) => (
                        <div className="single-mean" key={def.definition}>
                            <div style={{ fontWeight: "bold" }}>{item.partOfSpeech}</div>
                            <div style={{ fontWeight: "bold" }}>{t("definition")}: {def.definition}</div>
                            {def.example && (
                                <div>
                                    <b>{t("example")}:</b> {def.example}
                                </div>
                            )}
                            {!!def.synonyms?.length && (
                                <div>
                                    <b>{t("synonyms")}:</b> {def.synonyms.join(", ")}
                                </div>
                            )}
                        </div>
                    ))
                )
            )}
        </div>
    ) : null;
};
