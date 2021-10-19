# iedib-atto-snippets-dynamic

Equip de millora de l'IEDIB curs 2021-22

## Estructura de directoris

Cada component snippet dinàmic vindrà definit per un nom identificador, per exemple `dynamic_sample`

Dins del directori src/ ubicam el fitxer js que defineix cada snippet dinàmic (amb nom `sample.js`).

Una vegada establerta l'estructura de `sample.js`, tots els altres snippets seguiran exactament la mateixa forma.

Dins de la carpeta build un script anomenat `build.js` s'encarregarà de minificar tots els fitxers de dins la carpeta src. Així, doncs, en el llibre moodle, l'usuari apuntarà a `<script src="https://servidor/arrel/sample.min.js"></script>`

El markup HTML junt amb la meta-informació associada amb l'snippet anirà dins la carpeta presets. Cada snippet tindrà un fitxer de configuració yaml amb nom `dynamic_sample.yaml`. Aquest fitxer és el que s'empra a posteriori per ésser importat dins el plugin "iedib-atto-snippets" de Moodle.

En el markup HTML, `class="iedib-sd"` permetrà donar una aparença uniforme a tots els contenidors dels snippets dinàmics. D'altra banda `role="dynamic_sample"` identifica el tipus de component dinàmic que ha d'ésser processat.

## Instal·lar per desenvolupament

Requisits nodejs + npm
`npm install`

Per compilar les font `npm run build`