import requests
import PIL
from PIL import Image
import shutil


def download_picture(url, name):
    name = 'downloads/' + name + '.jpg'
    f = open(name, 'wb')
    f.write(requests.get(url).content)
    f.close()
    img = Image.open(name)
    img = img.resize((800, 800), PIL.Image.ANTIALIAS)
    img.save(name)


shutil.make_archive('output', 'zip', 'downloads')
