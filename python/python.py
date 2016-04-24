from flask import Flask, Response, request
from flask.ext.cors import CORS, cross_origin
import MongoRepository
import ApiRepository
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/all', methods=['POST', 'OPTIONS'])
@cross_origin()
def all():
    params = json.loads(request.data)

    country = None
    dateFrom = None
    dateTo = None
    upperRight = None
    bottomLeft = None
    events = None

    if 'country' in params:
        country = params['country']

    if 'date' in params:
        if 'from' in params['date']:
            dateFrom = params['date']['from']
        if 'to' in params['date']:
            dateTo = params['date']['to']

    if 'box' in params:
        if 'upperRight' in params['box']:
            upperRight = params['box']['upperRight']
        if 'bottomLeft' in params['box']:
            bottomLeft = params['box']['bottomLeft']

    if 'events' in params:
        events = params['events']

    body = json.dumps(MongoRepository.findAll(countries=country,
                                              dateFrom=dateFrom,
                                              dateTo=dateTo,
                                              upperRight=upperRight,
                                              bottomLeft=bottomLeft,
                                              events=events))
    return Response(body, mimetype='application/json')


@app.route('/test', methods=['POST', 'OPTIONS'])
@cross_origin()
def test():
    params = json.loads(request.data)

    country = None
    upperRight = None
    bottomLeft = None
    events = None
    dateFrom = None
    dateTo = None
    featured = None
    status = None

    if 'country' in params:
        country = params['country']

    if 'box' in params:
        if 'upperRight' in params['box']:
            upperRight = params['box']['upperRight']
        if 'bottomLeft' in params['box']:
            bottomLeft = params['box']['bottomLeft']

    if 'events' in params:
        events = params['events']

    if 'date' in params:
        if 'to' in params['date'] and 'from' in params['date']:
            dateFrom = params['date']['from']
            dateTo = params['date']['to']

    if 'featured' in params:
        featured = params['featured']

    if 'status' in params:
        status = params['status']

    body = json.dumps(MongoRepository.findAll(countries=country,
                                              dateFrom=dateFrom,
                                              dateTo=dateTo,
                                              upperRight=upperRight,
                                              bottomLeft=bottomLeft,
                                              featured=featured,
                                              status=status,
                                              events=events))
    return Response(body, mimetype='application/json')


@app.route('/filterEvents')
@cross_origin()
def events():
    events_list = MongoRepository.eventTypes()

    dict_helper = {}
    for event in events_list:
        dict_helper[event['id']] = event['name']

    result = []
    for key, value in dict_helper.iteritems():
        result.append({
            'id': key,
            'name': value
        })

    return Response(json.dumps(result), mimetype='application/json')


@app.route('/filterStatus')
@cross_origin()
def status():
    status_list = json.dumps(MongoRepository.statusList())
    return Response(status_list, mimetype='application/json')


# @app.route('/index')
# def test():
#     body = json.dumps(ApiRepository.geoJsonFindAll())
#     return Response(body, mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
