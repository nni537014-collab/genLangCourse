// To parse this data:
//
//   import { Convert } from "./file";
//
//   const courseDataNode = Convert.toCourseDataNode(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CourseDataNode {
    word:             string;
    pos:              Pos;
    pos_title?:       string;
    lang_code:        string;
    lang:             string;
    senses:           Sense[];
    categories:       string[];
    sounds?:          Sound[];
    translations?:    Translation[];
    etymology_texts?: string[];
    idioms?:          Compound[];
    synonyms?:        Antonym[];
    forms?:           Form[];
    hyphenations?:    Hyphenation[];
    tags?:            CourseDataNodeTag[];
    related?:         Antonym[];
    raw_tags?:        CourseDataNodeRawTag[];
    hyponyms?:        Antonym[];
    proverbs?:        Compound[];
    hypernyms?:       Antonym[];
    antonyms?:        Antonym[];
    compounds?:       Compound[];
    meronyms?:        Antonym[];
    descendants?:     Descendant[];
    derived?:         Antonym[];
    attestations?:    Attestation[];
}

export interface Antonym {
    word:                  string;
    sense_index?:          string;
    sense?:                string;
    note?:                 string;
    alternative_spelling?: string;
}

export interface Attestation {
    date: string;
}

export interface Compound {
    word:   string;
    sense?: string;
}

export interface Descendant {
    word:      string;
    lang_code: string;
    lang:      string;
    tags?:     string[];
}

export interface Form {
    form:      string;
    tags?:     FormTag[];
    raw_tags?: FormRawTag[];
}

export enum FormRawTag {
    Artículo = "Artículo",
    Base = "Base",
    DePreposiciónConjugada = "de (preposición conjugada)",
    Diminutivo = "diminutivo",
    Du = "du",
    Ecuativo = "ecuativo",
    Ello = "(ello)",
    ErSieEs = "er, sie, es",
    Exclamativo = "exclamativo",
    HeSheIt = "he, she, it",
    I = "I",
    ICH = "ich",
    Ihr = "ihr",
    Impersonal = "IMPERSONAL",
    Nosotros = "nosotros",
    Oblicuo = "Oblicuo",
    Persona = "Persona",
    PluraleTantum = "Plurale tantum",
    PronombrePersonal = "Pronombre personal",
    QueEllo = "(que ello)",
    QueNosotros = "que nosotros",
    QueTú = "que tú",
    QueUstedesQueEllos = "que ustedes, que ellos",
    QueVos = "que vos",
    QueVosotros = "que vosotros",
    QueYo = "que yo",
    QueÉlQueEllaQueUsted = "que él, que ella, que usted",
    RawTagDiminutivo = "Diminutivo",
    RawTagDu = "(du)",
    RawTagIhr = "(ihr)",
    RawTagNosotros = "(nosotros)",
    RawTagSie = "(Sie)",
    RawTagTú = "(tú)",
    RawTagVos = "(vos)",
    RawTagVosotros = "(vosotros)",
    RawTagWir = "(wir)",
    Sie = "sie",
    The1ªPl = "1ª pl.",
    The1ªSg = "1ª sg.",
    The2ªPl = "2ª pl.",
    The2ªSg = "2ª sg.",
    The3ªPl = "3ª pl.",
    The3ªSgF = "3ª sg. f.",
    The3ªSgM = "3ª sg. m.",
    Tú = "tú",
    Uk = "UK",
    Us = "US",
    Usted = "(usted)",
    Ustedes = "(ustedes)",
    UstedesEllos = "ustedes, ellos",
    Vos = "vos",
    Vosotros = "vosotros",
    We = "(we)",
    WeYouThey = "we, you, they",
    Wir = "wir",
    X = "x",
    Yo = "yo",
    You = "you",
    YouThou = "you (thou)",
    ÉlEllaUsted = "él, ella, usted",
}

export enum FormTag {
    Accusative = "accusative",
    Anterior = "anterior",
    Archaic = "archaic",
    Comparative = "comparative",
    Compound = "compound",
    Conditional = "conditional",
    Definite = "definite",
    Feminine = "feminine",
    FirstPerson = "first-person",
    Future = "future",
    Gerund = "gerund",
    Imperative = "imperative",
    Imperfect = "imperfect",
    Impersonal = "impersonal",
    Indefinite = "indefinite",
    Indicative = "indicative",
    Infinitive = "infinitive",
    InfinitiveZu = "infinitive-zu",
    Invariable = "invariable",
    Masculine = "masculine",
    Neuter = "neuter",
    Nominative = "nominative",
    Participle = "participle",
    Past = "past",
    Perfect = "perfect",
    Pluperfect = "pluperfect",
    Plural = "plural",
    Present = "present",
    Preterite = "preterite",
    SecondPerson = "second-person",
    Singular = "singular",
    Subjunctive = "subjunctive",
    SubjunctiveI = "subjunctive-i",
    SubjunctiveIi = "subjunctive-ii",
    Superlative = "superlative",
    ThirdPerson = "third-person",
    VosForm = "vos-form",
}

export interface Hyphenation {
    parts: string[];
}

export enum Pos {
    Abbrev = "abbrev",
    Adj = "adj",
    Adv = "adv",
    Article = "article",
    Character = "character",
    Conj = "conj",
    Contraction = "contraction",
    Intj = "intj",
    Name = "name",
    Noun = "noun",
    Num = "num",
    Participle = "participle",
    Particle = "particle",
    Phrase = "phrase",
    Prefix = "prefix",
    Prep = "prep",
    Pron = "pron",
    Proverb = "proverb",
    Suffix = "suffix",
    Symbol = "symbol",
    Unknown = "unknown",
    Verb = "verb",
}

export enum CourseDataNodeRawTag {
    Corto = "corto",
    CortoIrregular = "corto, irregular",
    CortoYLargo = "corto y largo",
    Incomparable = "incomparable",
    Incontable = "incontable",
    Largo = "largo",
    NoCopulativa = "no copulativa",
    PluraliaTantum = "pluralia tantum",
    SinComparativoNISuperlativo = "sin comparativo ni superlativo",
    SinDiminutivo = "sin diminutivo",
    SinPluralSinDiminutivo = "sin plural, sin diminutivo",
    SingulariaTantum = "singularia tantum",
}

export interface Sense {
    glosses?:     string[];
    categories?:  string[];
    sense_index?: string;
    raw_tags?:    string[];
    topics?:      string[];
    tags?:        string[];
    examples?:    Example[];
    form_of?:     FormOf[];
}

export interface Example {
    text:               string;
    bold_text_offsets?: Array<number[]>;
    ref?:               string;
    translation?:       string;
}

export interface FormOf {
    word: string;
}

export interface Sound {
    ipa?:                    string;
    raw_tags?:               string[];
    other?:                  string;
    alternative?:            string;
    note?:                   string;
    rhymes?:                 string;
    audio?:                  string;
    wav_url?:                string;
    ogg_url?:                string;
    mp3_url?:                string;
    tags?:                   SoundTag[];
    homophone?:              string;
    flac_url?:               string;
    not_same_pronunciation?: boolean;
    oga_url?:                string;
    roman?:                  string;
}

export enum SoundTag {
    America = "America",
    Argentina = "Argentina",
    Australia = "Australia",
    Balearic = "Balearic",
    Bearn = "Bearn",
    Brazil = "Brazil",
    Brazilian = "Brazilian",
    California = "California",
    Canada = "Canada",
    Central = "Central",
    Chile = "Chile",
    Colombia = "Colombia",
    CostaRica = "Costa-Rica",
    Ecclesiastical = "Ecclesiastical",
    European = "European",
    France = "France",
    GeneralAmerican = "General-American",
    Germany = "Germany",
    India = "India",
    Ireland = "Ireland",
    Jamaica = "Jamaica",
    London = "London",
    Mexico = "Mexico",
    NewZealand = "New-Zealand",
    Peru = "Peru",
    Portugal = "Portugal",
    ReceivedPronunciation = "Received-Pronunciation",
    Scotland = "Scotland",
    SouthernBrazil = "Southern-Brazil",
    Spain = "Spain",
    StandardCanadian = "Standard-Canadian",
    Uk = "UK",
    Us = "US",
    Valencian = "Valencian",
    Venezuela = "Venezuela",
}

export enum CourseDataNodeTag {
    Ablative = "ablative",
    Accusative = "accusative",
    Adjectival = "adjectival",
    Adjective = "adjective",
    Adverbial = "adverbial",
    Adversative = "adversative",
    Affirmative = "affirmative",
    Animate = "animate",
    Auxiliary = "auxiliary",
    Cardinal = "cardinal",
    Contraction = "contraction",
    Copulative = "copulative",
    Countable = "countable",
    Demonstrative = "demonstrative",
    Determinate = "determinate",
    Feminine = "feminine",
    FormOf = "form-of",
    Impersonal = "impersonal",
    Inanimate = "inanimate",
    Indefinite = "indefinite",
    Indeterminate = "indeterminate",
    Interjection = "interjection",
    Interrogative = "interrogative",
    Intransitive = "intransitive",
    Invariable = "invariable",
    Irregular = "irregular",
    Locative = "locative",
    Masculine = "masculine",
    Modal = "modal",
    Mood = "mood",
    Negative = "negative",
    Neuter = "neuter",
    Numeral = "numeral",
    Ordinal = "ordinal",
    Participle = "participle",
    Partitive = "partitive",
    Personal = "personal",
    Place = "place",
    Plural = "plural",
    Possessive = "possessive",
    Pronominal = "pronominal",
    Quantitative = "quantitative",
    Relative = "relative",
    Singular = "singular",
    Substantive = "substantive",
    Transitive = "transitive",
    Uncountable = "uncountable",
}

export interface Translation {
    word:         string;
    lang_code:    string;
    lang:         string;
    sense_index?: string;
    tags?:        TranslationTag[];
    roman?:       string;
    sense?:       string;
    raw_tags?:    string[];
}

export enum TranslationTag {
    Acaxochitlán = "Acaxochitlán",
    Amecameca = "Amecameca",
    Chipilo = "Chipilo",
    Cholula = "Cholula",
    Common = "common",
    Feminine = "feminine",
    Germany = "Germany",
    Masculine = "masculine",
    MilpaAlta = "Milpa Alta",
    Neuter = "neuter",
    Plural = "plural",
    Positive = "positive",
    Singular = "singular",
    Texcoco = "Texcoco",
    Tlaxcala = "Tlaxcala",
    Us = "US",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCourseDataNode(json: string): CourseDataNode[] {
        return cast(JSON.parse(json), a(r("CourseDataNode")));
    }

    public static courseDataNodeToJson(value: CourseDataNode[]): string {
        return JSON.stringify(uncast(value, a(r("CourseDataNode"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "CourseDataNode": o([
        { json: "word", js: "word", typ: "" },
        { json: "pos", js: "pos", typ: r("Pos") },
        { json: "pos_title", js: "pos_title", typ: u(undefined, "") },
        { json: "lang_code", js: "lang_code", typ: "" },
        { json: "lang", js: "lang", typ: "" },
        { json: "senses", js: "senses", typ: a(r("Sense")) },
        { json: "categories", js: "categories", typ: a("") },
        { json: "sounds", js: "sounds", typ: u(undefined, a(r("Sound"))) },
        { json: "translations", js: "translations", typ: u(undefined, a(r("Translation"))) },
        { json: "etymology_texts", js: "etymology_texts", typ: u(undefined, a("")) },
        { json: "idioms", js: "idioms", typ: u(undefined, a(r("Compound"))) },
        { json: "synonyms", js: "synonyms", typ: u(undefined, a(r("Antonym"))) },
        { json: "forms", js: "forms", typ: u(undefined, a(r("Form"))) },
        { json: "hyphenations", js: "hyphenations", typ: u(undefined, a(r("Hyphenation"))) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("CourseDataNodeTag"))) },
        { json: "related", js: "related", typ: u(undefined, a(r("Antonym"))) },
        { json: "raw_tags", js: "raw_tags", typ: u(undefined, a(r("CourseDataNodeRawTag"))) },
        { json: "hyponyms", js: "hyponyms", typ: u(undefined, a(r("Antonym"))) },
        { json: "proverbs", js: "proverbs", typ: u(undefined, a(r("Compound"))) },
        { json: "hypernyms", js: "hypernyms", typ: u(undefined, a(r("Antonym"))) },
        { json: "antonyms", js: "antonyms", typ: u(undefined, a(r("Antonym"))) },
        { json: "compounds", js: "compounds", typ: u(undefined, a(r("Compound"))) },
        { json: "meronyms", js: "meronyms", typ: u(undefined, a(r("Antonym"))) },
        { json: "descendants", js: "descendants", typ: u(undefined, a(r("Descendant"))) },
        { json: "derived", js: "derived", typ: u(undefined, a(r("Antonym"))) },
        { json: "attestations", js: "attestations", typ: u(undefined, a(r("Attestation"))) },
    ], false),
    "Antonym": o([
        { json: "word", js: "word", typ: "" },
        { json: "sense_index", js: "sense_index", typ: u(undefined, "") },
        { json: "sense", js: "sense", typ: u(undefined, "") },
        { json: "note", js: "note", typ: u(undefined, "") },
        { json: "alternative_spelling", js: "alternative_spelling", typ: u(undefined, "") },
    ], false),
    "Attestation": o([
        { json: "date", js: "date", typ: "" },
    ], false),
    "Compound": o([
        { json: "word", js: "word", typ: "" },
        { json: "sense", js: "sense", typ: u(undefined, "") },
    ], false),
    "Descendant": o([
        { json: "word", js: "word", typ: "" },
        { json: "lang_code", js: "lang_code", typ: "" },
        { json: "lang", js: "lang", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
    ], false),
    "Form": o([
        { json: "form", js: "form", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a(r("FormTag"))) },
        { json: "raw_tags", js: "raw_tags", typ: u(undefined, a(r("FormRawTag"))) },
    ], false),
    "Hyphenation": o([
        { json: "parts", js: "parts", typ: a("") },
    ], false),
    "Sense": o([
        { json: "glosses", js: "glosses", typ: u(undefined, a("")) },
        { json: "categories", js: "categories", typ: u(undefined, a("")) },
        { json: "sense_index", js: "sense_index", typ: u(undefined, "") },
        { json: "raw_tags", js: "raw_tags", typ: u(undefined, a("")) },
        { json: "topics", js: "topics", typ: u(undefined, a("")) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "examples", js: "examples", typ: u(undefined, a(r("Example"))) },
        { json: "form_of", js: "form_of", typ: u(undefined, a(r("FormOf"))) },
    ], false),
    "Example": o([
        { json: "text", js: "text", typ: "" },
        { json: "bold_text_offsets", js: "bold_text_offsets", typ: u(undefined, a(a(0))) },
        { json: "ref", js: "ref", typ: u(undefined, "") },
        { json: "translation", js: "translation", typ: u(undefined, "") },
    ], false),
    "FormOf": o([
        { json: "word", js: "word", typ: "" },
    ], false),
    "Sound": o([
        { json: "ipa", js: "ipa", typ: u(undefined, "") },
        { json: "raw_tags", js: "raw_tags", typ: u(undefined, a("")) },
        { json: "other", js: "other", typ: u(undefined, "") },
        { json: "alternative", js: "alternative", typ: u(undefined, "") },
        { json: "note", js: "note", typ: u(undefined, "") },
        { json: "rhymes", js: "rhymes", typ: u(undefined, "") },
        { json: "audio", js: "audio", typ: u(undefined, "") },
        { json: "wav_url", js: "wav_url", typ: u(undefined, "") },
        { json: "ogg_url", js: "ogg_url", typ: u(undefined, "") },
        { json: "mp3_url", js: "mp3_url", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, a(r("SoundTag"))) },
        { json: "homophone", js: "homophone", typ: u(undefined, "") },
        { json: "flac_url", js: "flac_url", typ: u(undefined, "") },
        { json: "not_same_pronunciation", js: "not_same_pronunciation", typ: u(undefined, true) },
        { json: "oga_url", js: "oga_url", typ: u(undefined, "") },
        { json: "roman", js: "roman", typ: u(undefined, "") },
    ], false),
    "Translation": o([
        { json: "word", js: "word", typ: "" },
        { json: "lang_code", js: "lang_code", typ: "" },
        { json: "lang", js: "lang", typ: "" },
        { json: "sense_index", js: "sense_index", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, a(r("TranslationTag"))) },
        { json: "roman", js: "roman", typ: u(undefined, "") },
        { json: "sense", js: "sense", typ: u(undefined, "") },
        { json: "raw_tags", js: "raw_tags", typ: u(undefined, a("")) },
    ], false),
    "FormRawTag": [
        "Artículo",
        "Base",
        "de (preposición conjugada)",
        "diminutivo",
        "du",
        "ecuativo",
        "(ello)",
        "er, sie, es",
        "exclamativo",
        "he, she, it",
        "I",
        "ich",
        "ihr",
        "IMPERSONAL",
        "nosotros",
        "Oblicuo",
        "Persona",
        "Plurale tantum",
        "Pronombre personal",
        "(que ello)",
        "que nosotros",
        "que tú",
        "que ustedes, que ellos",
        "que vos",
        "que vosotros",
        "que yo",
        "que él, que ella, que usted",
        "Diminutivo",
        "(du)",
        "(ihr)",
        "(nosotros)",
        "(Sie)",
        "(tú)",
        "(vos)",
        "(vosotros)",
        "(wir)",
        "sie",
        "1ª pl.",
        "1ª sg.",
        "2ª pl.",
        "2ª sg.",
        "3ª pl.",
        "3ª sg. f.",
        "3ª sg. m.",
        "tú",
        "UK",
        "US",
        "(usted)",
        "(ustedes)",
        "ustedes, ellos",
        "vos",
        "vosotros",
        "(we)",
        "we, you, they",
        "wir",
        "x",
        "yo",
        "you",
        "you (thou)",
        "él, ella, usted",
    ],
    "FormTag": [
        "accusative",
        "anterior",
        "archaic",
        "comparative",
        "compound",
        "conditional",
        "definite",
        "feminine",
        "first-person",
        "future",
        "gerund",
        "imperative",
        "imperfect",
        "impersonal",
        "indefinite",
        "indicative",
        "infinitive",
        "infinitive-zu",
        "invariable",
        "masculine",
        "neuter",
        "nominative",
        "participle",
        "past",
        "perfect",
        "pluperfect",
        "plural",
        "present",
        "preterite",
        "second-person",
        "singular",
        "subjunctive",
        "subjunctive-i",
        "subjunctive-ii",
        "superlative",
        "third-person",
        "vos-form",
    ],
    "Pos": [
        "abbrev",
        "adj",
        "adv",
        "article",
        "character",
        "conj",
        "contraction",
        "intj",
        "name",
        "noun",
        "num",
        "participle",
        "particle",
        "phrase",
        "prefix",
        "prep",
        "pron",
        "proverb",
        "suffix",
        "symbol",
        "unknown",
        "verb",
    ],
    "CourseDataNodeRawTag": [
        "corto",
        "corto, irregular",
        "corto y largo",
        "incomparable",
        "incontable",
        "largo",
        "no copulativa",
        "pluralia tantum",
        "sin comparativo ni superlativo",
        "sin diminutivo",
        "sin plural, sin diminutivo",
        "singularia tantum",
    ],
    "SoundTag": [
        "America",
        "Argentina",
        "Australia",
        "Balearic",
        "Bearn",
        "Brazil",
        "Brazilian",
        "California",
        "Canada",
        "Central",
        "Chile",
        "Colombia",
        "Costa-Rica",
        "Ecclesiastical",
        "European",
        "France",
        "General-American",
        "Germany",
        "India",
        "Ireland",
        "Jamaica",
        "London",
        "Mexico",
        "New-Zealand",
        "Peru",
        "Portugal",
        "Received-Pronunciation",
        "Scotland",
        "Southern-Brazil",
        "Spain",
        "Standard-Canadian",
        "UK",
        "US",
        "Valencian",
        "Venezuela",
    ],
    "CourseDataNodeTag": [
        "ablative",
        "accusative",
        "adjectival",
        "adjective",
        "adverbial",
        "adversative",
        "affirmative",
        "animate",
        "auxiliary",
        "cardinal",
        "contraction",
        "copulative",
        "countable",
        "demonstrative",
        "determinate",
        "feminine",
        "form-of",
        "impersonal",
        "inanimate",
        "indefinite",
        "indeterminate",
        "interjection",
        "interrogative",
        "intransitive",
        "invariable",
        "irregular",
        "locative",
        "masculine",
        "modal",
        "mood",
        "negative",
        "neuter",
        "numeral",
        "ordinal",
        "participle",
        "partitive",
        "personal",
        "place",
        "plural",
        "possessive",
        "pronominal",
        "quantitative",
        "relative",
        "singular",
        "substantive",
        "transitive",
        "uncountable",
    ],
    "TranslationTag": [
        "Acaxochitlán",
        "Amecameca",
        "Chipilo",
        "Cholula",
        "common",
        "feminine",
        "Germany",
        "masculine",
        "Milpa Alta",
        "neuter",
        "plural",
        "positive",
        "singular",
        "Texcoco",
        "Tlaxcala",
        "US",
    ],
};
