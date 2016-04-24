import pymongo
import json
import Constants

client = pymongo.MongoClient(Constants.MONGOURL)
db = client.DisastersDateSpaceApps2016
disasters = db.disasters


def findAll(countries=None, dateFrom=None, dateTo=None, bottomLeft=[], upperRight=[], events=None):
    query = {}
    andQuery = []

    if countries is not None:
        countriesQuery = []
        for country in countries:
            countriesQuery.append({
                'country': country
            })
        andQuery.append({'$or': countriesQuery})

    if bottomLeft is not None and len(bottomLeft) == 2 \
            and upperRight is not None and len(upperRight) == 2:
        query['loc'] = {
            '$geoWithin': {
                '$box': [
                    bottomLeft, upperRight
                ]
            }
        }

    if events is not None:
        eventsQuery = {'$or': []}
        for event in events:
            eventsQuery['$or'].append({
                'eventType.id': event
            })
        andQuery.append(eventsQuery)

    if len(andQuery) > 1:
        query['$and'] = andQuery
    elif len(andQuery) == 1:
        query['$or'] = andQuery[0]['$or']

    data_set = list(disasters.find(query))
    return map(lambda x: x['data'], data_set)
    # return data_set


# data_set = list(disasters.find())
# return map(lambda x: x['data'], data_set)


def eventTypes():
    return list(disasters.distinct('eventType'))


def statusList():
    return list(disasters.distinct('status'))
