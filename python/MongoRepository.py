import pymongo
import json
import Constants

client = pymongo.MongoClient(Constants.MONGOURL)
db = client.DisastersSpaceApps2016
disasters = db.disasters


def findAll(countries=None, dateFrom=None, dateTo=None, bottomLeft=[], upperRight=[]):
    query = {}

    if countries is not None:
        query['$or'] = []
        for country in countries:
            query['$or'].append({
                'country': country
            })

    if bottomLeft is not None and len(bottomLeft) == 2 \
            and upperRight is not None and len(upperRight) == 2:
        query['loc'] = {
            '$geoWithin': {
                '$box': [
                    bottomLeft, upperRight
                ]
            }
        }

    data_set = list(disasters.find(query))
    return map(lambda x: x['data'], data_set)
    # return data_set


# data_set = list(disasters.find())
# return map(lambda x: x['data'], data_set)


def eventTypes():
    return list(disasters.distinct('eventType'))


def statusList():
    return list(disasters.distinct('status'))
