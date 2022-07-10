from xml import dom
from sanic import Sanic
from sanic import response
from gtts import gTTS
import hashlib
from os.path import exists

app = Sanic(__name__)

BASE_URL = '/api/gtts'

@app.route(BASE_URL+"/speak")
async def speak(request):
    if not 't' in request.args or not 'l' in request.args:
        return response.json(
        {'message': 'Missing t or l args'}, 
        status=400
    ) 
    skip_cache = False
    if 'c' in request.args and request.args['c']=='false':
        skip_cache = True

    text = request.args['t']
    lang = request.args['l']

    if isinstance(text, list):
        text = text[0]
    if isinstance(lang, list):
        lang = lang[0]

    text = text.strip()
    lang = lang.strip()

    codi = hashlib.sha256((text+'_'+lang).encode('utf8')).hexdigest()
    filename = './cached/'+codi+'.mp3'
    if not skip_cache and exists(filename):
        return await response.file(filename)

    errMsg = ''
    try:
        plang = lang.split('-')
        domain = 'com'
        rlang = plang[0].strip()
        if len(plang) > 1:
            accent = plang[1].strip().lower()
            if accent == 'gb':
                domain = 'co.uk' 
            elif accent == 'de':
                domain = 'de'
            elif accent == 'fr':
                domain = 'fr'
            elif accent == 'ca':
                domain = 'ca'
            elif accent == 'es':
                domain = 'es'
        tts = gTTS(text, lang=rlang, tld=domain)
        tts.save(filename)
        if exists(filename):
            return await response.file(filename)
    except Exception as ex:
        errMsg = str(ex)

    return response.json(
        {'message': 'Unable to generate mp3. '+errMsg}, 
        status=400
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3010)