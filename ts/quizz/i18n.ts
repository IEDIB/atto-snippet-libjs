const I18n = {
    "ca": {
        "check": "Comprova",
        "chooseone": "Tria una opció",
        "right": "Ben fet!",
        "wrong": "Ho sento. Intentau-ho de nou",
        "error": "Hi ha hagut un error processant la resposta",
        "random_msg": "Aquestes activitats contenen preguntes aleatòries que es generen cada vegada que es carrega la pàgina.",
        "open_editor": "Obrir l'editor matemàtic",
        "math_editor": "Editor matemàtic",
        "sym_notallowed": "El símbol no està permès",
        "sym_once": "El símbol només es pot emprar una vegada",
        "error_cantprocess": "Error quan es processava la petició",
        "right_answer": "La resposta és correcta",
        "wrong_answer": "La resposta és incorrecta",
        "error_verifying": "Error quan es verificava la resposta",
        "expected_ans": "S'esperava la resposta"
    },
    "es": {
        "check": "Comprueba",
        "chooseone": "Elige una opción",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Abrir el editor matemático",
        "math_editor": "Editor matemático",
        "sym_notallowed": "El símbolo no esta permitido",
        "sym_once": "El símbolo solo se permite una vez",
        "error_cantprocess": "Error cuando se procesaba la petición",
        "right_answer": "Respuesta correcta",
        "wrong_answer": "Respuesta incorrecta",
        "error_verifying": "Error cuando se verificaba la respuesta",
        "expected_ans": "Se esperaba la respuesta"
    },
    "en": {
        "check": "Check",
        "chooseone": "Choose one",
        "right": "Well done!",
        "wrong": "Try it again.",
        "error": "There has been an error processing the answer",
        "random_msg": "These activities contain random questions that are generated at every page load.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor",
        "sym_notallowed": "The symbol is not allowed",
        "sym_once": "The symbol can only be used once",
        "error_cantprocess": "Error processing the request",
        "right_answer": "Right answer",
        "wrong_answer": "Wrong answer",
        "error_verifying": "Error verifying the answer",
        "expected_ans": "The expected answer is"
    },
    "fr": {
        "check": "Vérifier",
        "chooseone": "Choisis une option",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor",
        "sym_notallowed": "The symbol is not allowed",
        "sym_once": "The symbol can only be used once",
        "error_cantprocess": "Error processing the request",
        "right_answer": "Right answer",
        "wrong_answer": "Wrong answer",
        "error_verifying": "Error verifying the answer",
        "expected_ans": "The expected answer is"
    },
    "de": {
        "check": "Prüfen",
        "chooseone": "Wähle eine option",
        "right": "¡Bien hecho!",
        "wrong": "Lo siento. Inténtalo de nuevo.",
        "error": "Ha habido un error procesando la respuesta",
        "random_msg": "Estas actividades contienen preguntas aleatorias que se generan cada vez que se carga la página.",
        "open_editor": "Open math editor",
        "math_editor": "Math editor",
        "sym_notallowed": "The symbol is not allowed",
        "sym_once": "The symbol can only be used once",
        "error_cantprocess": "Error processing the request",
        "right_answer": "Right answer",
        "wrong_answer": "Wrong answer",
        "error_verifying": "Error verifying the answer",
        "expected_ans": "The expected answer is"
    }
} as unknown as {[key:string]:{[key:string]:string}} ;

export default function getI18n(lang: string, key: string, value?: any | undefined): string {
    let locale: {[key:string]:string} = I18n[lang];
    if(!locale) {
        locale = I18n["ca"];
    }
    let trans = locale[key] || key;
    if(value) {
        trans += ' ' + value;
    }
    return trans;
}
 