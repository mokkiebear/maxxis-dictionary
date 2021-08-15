export interface IWordDefinition {
    meanings: IMeaning[];
    origin: string;
    phonetic: string;
    phonetics: IPhonetic[];
    word: string;
}

export interface IMeaning {
    partOfSpeech: string;
    definitions: IDefinition[];
}

export interface IDefinition {
    definition: string;
    example: string;
    antonyms: string[];
    synonyms: string[];
}

export interface IPhonetic {
    text: string;
    audio: string;
}