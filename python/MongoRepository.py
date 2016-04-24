import pymongo
import json
import Constants

client = pymongo.MongoClient(Constants.MONGOURL)
db = client.DisastersDateSpaceApps2016
disasters = db.disasters


def findAll(countries=None, dateFrom=None, dateTo=None, bottomLeft=[], upperRight=[], status=None, events=None,
            featured=None):
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

    if status is not None:
        statusQuery = []
        for oneStatus in status:
            statusQuery.append({
                'status': oneStatus
            })
        andQuery.append({'$or': statusQuery})

    if dateFrom is not None and dateTo is not None:
        dateQuery = {
            'date': {
                '$gte': dateFrom,
                '$lt': dateTo
            }
        }
        andQuery.append(dateQuery)

    if featured is not None:
        featuredQuery = {
            'featured': featured
        }
        andQuery.append(featuredQuery)

    if len(andQuery) > 1:
        query['$and'] = andQuery
    elif len(andQuery) == 1 and '$or' in andQuery[0]:
        query['$or'] = andQuery[0]['$or']
    elif len(andQuery) == 1 and 'date' in andQuery[0]:
        query['date'] = andQuery[0]['date']
    elif len(andQuery) == 1:
        query['featured'] = andQuery[0]['featured']

    data_set = list(disasters.find(query))
    return map(lambda x: x['data'], data_set)


def eventTypes():
    return list(disasters.distinct('eventType'))


def statusList():
    return list(disasters.distinct('status'))
