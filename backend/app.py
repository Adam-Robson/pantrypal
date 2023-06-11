from flask_cors import CORS
from flask import Flask, request
from pymongo import MongoClient
from dotenv import load_dotenv
from json import dumps
from os import getenv

load_dotenv()

uri = getenv('MONGODB_URI', 'mongodb://localhost:27017/teamsix')
client = MongoClient(uri)
db = client.get_default_database()

app = Flask(__name__)
CORS(app)

@app.route('/api/organizations')
def fetch_orgs_by_city():
    city_name = request.args['cityName']
    state_abrv = request.args['stateAbrv']

    organizations = db.organizations.find(
        {'city': city_name, 'state': state_abrv}, {'_id': False}
    ).limit(30)

    return dumps(list(organizations))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
