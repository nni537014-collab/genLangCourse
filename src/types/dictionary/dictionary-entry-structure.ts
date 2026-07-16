import * as z from "zod";


export const FormRawTagSchema = z.enum([
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
]);
export type FormRawTag = z.infer<typeof FormRawTagSchema>;


export const FormTagSchema = z.enum([
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
]);
export type FormTag = z.infer<typeof FormTagSchema>;


export const PosSchema = z.enum([
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
]);
export type Pos = z.infer<typeof PosSchema>;


export const DictionaryEntryStructureRawTagSchema = z.enum([
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
]);
export type DictionaryEntryStructureRawTag = z.infer<typeof DictionaryEntryStructureRawTagSchema>;


export const SoundTagSchema = z.enum([
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
]);
export type SoundTag = z.infer<typeof SoundTagSchema>;


export const DictionaryEntryStructureTagSchema = z.enum([
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
]);
export type DictionaryEntryStructureTag = z.infer<typeof DictionaryEntryStructureTagSchema>;


export const TranslationTagSchema = z.enum([
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
]);
export type TranslationTag = z.infer<typeof TranslationTagSchema>;

export const AntonymSchema = z.object({
    "word": z.string(),
    "sense_index": z.string().optional(),
    "sense": z.string().optional(),
    "note": z.string().optional(),
    "alternative_spelling": z.string().optional(),
});
export type Antonym = z.infer<typeof AntonymSchema>;

export const AttestationSchema = z.object({
    "date": z.string(),
});
export type Attestation = z.infer<typeof AttestationSchema>;

export const CompoundSchema = z.object({
    "word": z.string(),
    "sense": z.string().optional(),
});
export type Compound = z.infer<typeof CompoundSchema>;

export const DescendantSchema = z.object({
    "word": z.string(),
    "lang_code": z.string(),
    "lang": z.string(),
    "tags": z.array(z.string()).optional(),
});
export type Descendant = z.infer<typeof DescendantSchema>;

export const FormSchema = z.object({
    "form": z.string(),
    "tags": z.array(FormTagSchema).optional(),
    "raw_tags": z.array(FormRawTagSchema).optional(),
});
export type Form = z.infer<typeof FormSchema>;

export const HyphenationSchema = z.object({
    "parts": z.array(z.string()),
});
export type Hyphenation = z.infer<typeof HyphenationSchema>;

export const ExampleSchema = z.object({
    "text": z.string(),
    "bold_text_offsets": z.array(z.array(z.number())).optional(),
    "ref": z.string().optional(),
    "translation": z.string().optional(),
});
export type Example = z.infer<typeof ExampleSchema>;

export const FormOfSchema = z.object({
    "word": z.string(),
});
export type FormOf = z.infer<typeof FormOfSchema>;

export const SoundSchema = z.object({
    "ipa": z.string().optional(),
    "raw_tags": z.array(z.string()).optional(),
    "other": z.string().optional(),
    "alternative": z.string().optional(),
    "note": z.string().optional(),
    "rhymes": z.string().optional(),
    "audio": z.string().optional(),
    "wav_url": z.string().optional(),
    "ogg_url": z.string().optional(),
    "mp3_url": z.string().optional(),
    "tags": z.array(SoundTagSchema).optional(),
    "homophone": z.string().optional(),
    "flac_url": z.string().optional(),
    "not_same_pronunciation": z.boolean().optional(),
    "oga_url": z.string().optional(),
    "roman": z.string().optional(),
});
export type Sound = z.infer<typeof SoundSchema>;

export const TranslationSchema = z.object({
    "word": z.string(),
    "lang_code": z.string(),
    "lang": z.string(),
    "sense_index": z.string().optional(),
    "tags": z.array(TranslationTagSchema).optional(),
    "roman": z.string().optional(),
    "sense": z.string().optional(),
    "raw_tags": z.array(z.string()).optional(),
});
export type Translation = z.infer<typeof TranslationSchema>;

export const SenseSchema = z.object({
    "glosses": z.array(z.string()).optional(),
    "categories": z.array(z.string()).optional(),
    "sense_index": z.string().optional(),
    "raw_tags": z.array(z.string()).optional(),
    "topics": z.array(z.string()).optional(),
    "tags": z.array(z.string()).optional(),
    "examples": z.array(ExampleSchema).optional(),
    "form_of": z.array(FormOfSchema).optional(),
});
export type Sense = z.infer<typeof SenseSchema>;

export const DictionaryEntryStructureElementSchema = z.object({
    "word": z.string(),
    "pos": PosSchema,
    "pos_title": z.string().optional(),
    "lang_code": z.string(),
    "lang": z.string(),
    "senses": z.array(SenseSchema),
    "categories": z.array(z.string()),
    "sounds": z.array(SoundSchema).optional(),
    "translations": z.array(TranslationSchema).optional(),
    "etymology_texts": z.array(z.string()).optional(),
    "idioms": z.array(CompoundSchema).optional(),
    "synonyms": z.array(AntonymSchema).optional(),
    "forms": z.array(FormSchema).optional(),
    "hyphenations": z.array(HyphenationSchema).optional(),
    "tags": z.array(DictionaryEntryStructureTagSchema).optional(),
    "related": z.array(AntonymSchema).optional(),
    "raw_tags": z.array(DictionaryEntryStructureRawTagSchema).optional(),
    "hyponyms": z.array(AntonymSchema).optional(),
    "proverbs": z.array(CompoundSchema).optional(),
    "hypernyms": z.array(AntonymSchema).optional(),
    "antonyms": z.array(AntonymSchema).optional(),
    "compounds": z.array(CompoundSchema).optional(),
    "meronyms": z.array(AntonymSchema).optional(),
    "descendants": z.array(DescendantSchema).optional(),
    "derived": z.array(AntonymSchema).optional(),
    "attestations": z.array(AttestationSchema).optional(),
});
export type DictionaryEntryStructureElement = z.infer<typeof DictionaryEntryStructureElementSchema>;
