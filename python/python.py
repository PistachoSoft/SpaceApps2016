from flask import Flask, Response
from flask.ext.cors import CORS, cross_origin
import MongoRepository
import ApiRepository
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/all')
@cross_origin()
def all():
    body = json.dumps(MongoRepository.findAll())
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
