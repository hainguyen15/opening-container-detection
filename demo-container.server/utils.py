import os
import urllib.request
from constants import ROOT_PATH
from keras_retinanet import models

def dwnld_img_from_url(link, dest):
    cmd = 'wget {} -P {}'.format(link, dest)
    os.system(cmd)

def load_model():
    model_path = os.path.join(ROOT_PATH,'resource/model.h5')
    return models.load_model(model_path, backbone_name='resnet50')

def get_dest_with_fname(org_path):
    filename = os.path.basename(org_path)
    dest = os.path.join('static', filename)
    return dest
