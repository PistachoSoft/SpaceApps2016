import pymongo
import Constants
import requests

client = pymongo.MongoClient(Constants.MONGOURL)
db = client.DisastersDateSpaceApps2016
col = db.disasters
col.ensure_index([("loc", pymongo.GEOSPHERE)])


class Properties(object):
    def __init__(self):
        self.id = ''
        self.title = ''
        self.description = ''
        self.links = []
        self.featured = False
        self.status = 'past'


class Geometry(object):
    def __init__(self):
        self.type = 'Point'
        self.coordinates = []


class Disaster(object):
    def __init__(self):
        self.type = 'Feature'
        self.geometry = Geometry()
        self.properties = Properties()


class _Api(object):
    _BASE = "http://api.rwlabs.org/v1"
    DISASTERS = _BASE + "/disasters"


def _my_dict(obj):
    if not hasattr(obj, "__dict__"):
        return obj
    result = {}
    for key, val in obj.__dict__.items():
        if key.startswith("_"):
            continue
        if isinstance(val, list):
            elements = []
            for item in val:
                elements.append(_my_dict(item))
        else:
            elements = _my_dict(val)
        result[key] = elements
    return result


def findAll(absoluteUrl=None):
    if absoluteUrl is None:
        url = _Api.DISASTERS + '?limit=1000&offset=2000'
    else:
        url = absoluteUrl
    return requests.get(url).json()


def findById(id):
    url = _Api.DISASTERS + '/' + id
    return requests.get(url).json()


def geoJsonFindAll():
    disasters = findAll()

    results = _parseResult(disasters)

    while 'next' in disasters['links']:
        disasters = findAll(disasters['links']['next'])

        results = results + _parseResult(disasters)

    result = map(lambda x: _my_dict(x), results)

    return result


def _parseResult(disasters):
    spatialArray = []

    for item in disasters["data"]:
        register = Disaster()

        id = item['id']
        register.properties.id = id

        disaster = findById(id)

        if 'data' in disaster and len(disaster['data']) > 0:
            fields = disaster['data'][0]['fields']

            if 'primary_country' in fields and 'location' in fields['primary_country']:
                filters = {}

                loc = fields['primary_country']['location']
                register.geometry.coordinates = loc

                # Other fields
                register.properties.title = fields['name']
                register.properties.links.append(fields['url'])

                if 'description-html' in fields:
                    register.properties.description = fields['description-html']
                elif 'description' in fields:
                    register.properties.description = fields['description']

                spatialArray.append(register)

                filters['country'] = fields['primary_country']['iso3']
                filters['eventType'] = []
                for event in fields['type']:
                    filters['eventType'].append(event)
                filters['status'] = fields['status']
                filters['featured'] = fields['featured']
                filters['date'] = fields['date']['created']

                saveToMongo(register, filters)

    return spatialArray


# Endpoint: Lista de eventos (id + name)
#           Lista de status
# geolocation, eventos, dates
def saveToMongo(disaster, filters):
    dir = {}
    dir['loc'] = disaster.geometry.__dict__
    dir['data'] = _my_dict(disaster)
    dir['country'] = filters['country']
    dir['eventType'] = filters['eventType']
    dir['status'] = filters['status']
    dir['featured'] = filters['featured']
    dir['date'] = filters['date']

    col.insert(dir)
