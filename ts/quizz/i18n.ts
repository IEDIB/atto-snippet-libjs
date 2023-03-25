const I18n = {
    "ca": {
        "check": "Comprova",
        "chooseone": "Tria una opció",
        "right": "Ben fet!",
        "wrong": "Ho sento. Intentau-ho de nou",
        "error": "Hi ha hagut un error processant la resposta",
        "random_msg": "Aquestes activitats contenen preguntes aleatòries que es generen cada vegada que es carrega la pàgina.",
        "open_editor": "Obrir l'editor matemàtic",
        "math_editor": "Editor matemàtic"
    },
    "es": {
        "check": "Comprueba",
        "chooseone": "Elige una opción",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Abrir el editor matemático",
        "math_editor": "Editor matemático"
    },
    "en": {
        "check": "Check",
        "chooseone": "Choose one",
        "right": "Well done!",
        "wrong": "Try it again.",
        "error": "There has been an error processing the answer",
        "random_msg": "These activities contain random questions that are generated at every page load.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor"
    },
    "fr": {
        "check": "Vérifier",
        "chooseone": "Choisis une option",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor"
    },
    "de": {
        "check": "Prüfen",
        "chooseone": "Wähle eine option",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor"
    }
} as unknown as {[key:string]:{[key:string]:string}} ;

export default function getI18n(lang: string, key: string): string {
    let locale: {[key:string]:string} = I18n[lang];
    if(!locale) {
        locale = I18n["ca"];
    }
    return locale[key] || key;
}