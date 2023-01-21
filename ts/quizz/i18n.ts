const I18n = {
    "ca": {
        "check": "Comprova",
        "chooseone": "Tria una opció",
        "right": "Ben fet!",
        "wrong": "Ho sento. Intentau-ho de nou",
        "error": "Hi ha hagut un error processant la resposta"
    },
    "es": {
        "check": "Comprueba",
        "chooseone": "Elige una opción",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta"
    },
    "en": {
        "check": "Check",
        "chooseone": "Choose one",
        "right": "Well done!",
        "wrong": "Try it again.",
        "error": "There has been an error processing the answer"
    },
    "fr": {
        "check": "Vérifier",
        "chooseone": "Choisis une option",
        "right": "",
        "wrong": "",
        "error": ""
    },
    "de": {
        "check": "Prüfen",
        "chooseone": "Wähle eine option",
        "right": "",
        "wrong": "",
        "error": ""
    }
} as unknown as {[key:string]:{[key:string]:string}} ;

export default function getI18n(lang: string, key: string): string {
    let locale: {[key:string]:string} = I18n[lang];
    if(!locale) {
        locale = I18n["en"];
    }
    return locale[key] || key;
}