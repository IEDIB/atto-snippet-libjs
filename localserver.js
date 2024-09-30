/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//sobre-escriu les routes per les dinàmiques
const express = require('express');
const port = 3000;
const app = express(); 
app.use('/test', express.static('./test/'));
app.use('/dist', express.static('./dist/'));
app.use('/dist-dev', express.static('./dist-dev/'));
 
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});