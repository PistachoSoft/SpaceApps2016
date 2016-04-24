import pymongo
import Constants

client = pymongo.MongoClient(Constants.MONGOURL)
db = client.DisastersSpaceApps2016
disasters = db.disasters

def findAll():
    data_set = list(disasters.find())
    return map(lambda x: x['data'], data_set)

def eventTypes():
    return list(disasters.distinct('eventType'))

def statusList():
    return list(disasters.distinct('status'))