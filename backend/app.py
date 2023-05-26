from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
from json import dumps
from os import getenv

load_dotenv()

uri = getenv('MONGODB_URI', 'mongodb://localhost:27017/teamsix')
client = MongoClient(uri)
db = client.get_default_database()

app = Flask(__name__)

@app.route('/api/organizations/zipcode/<zipcode>')
def fetch_orgs_by_zipcode(zipcode):
    organizations = db.organizations.find(
        {'zip_code': zipcode}, {'_id': False}
    ).limit(5)

    return dumps(list(organizations))

@app.route('/api/organizations/city/<city_name>')
def fetch_orgs_by_city(city_name):
    organizations = db.organizations.find(
        {'city': city_name}, {'_id': False}
    ).limit(5)

    return dumps(list(organizations))

@app.route('/api/organizations/state/<state>')
def fetch_orgs_by_state(state):
    organizations = db.organizations.find(
        {'state': state}, {'_id': False}
    ).limit(5)

    return dumps(list(organizations))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
