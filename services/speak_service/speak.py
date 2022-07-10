from sanic import Sanic
from sanic import response
from gtts import gTTS
import hashlib
from os.path import exists

app = Sanic(__name__)


@app.route("/api/speak")
async def speak(request):
    if not 't' in request.args or not 'l' in request.args:
        return response.json(
        {'message': 'Missing t or l args'}, 
        status=400
    )
    print(request.args)
    text = request.args['t']
    lang = request.args['l']

    if isinstance(text, list):
        text = text[0]
    if isinstance(lang, list):
        lang = lang[0]

    text = text.strip()
    lang = lang.strip()

    codi = hashlib.sha256((text+'_'+lang).encode('utf8')).hexdigest()
    filename = './'+codi+'.mp3'
    if exists(filename):
        return await response.file(filename)

    
    tts = gTTS(text, lang=lang, tld='com')
    tts.save(filename)
    if exists(filename):
        return await response.file(filename)
   

    return response.json(
        {'message': 'Unable to generate mp3'}, 
        status=400
    )


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)