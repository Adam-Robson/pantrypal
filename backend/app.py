from flask_cors import CORS
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
CORS(app)

@app.route('/api/organizations/city/<city_name>')
def fetch_orgs_by_city(city_name):
    organizations = db.organizations.find(
        {'city': city_name}, {'_id': False}
    ).limit(200)

    return dumps(list(organizations))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
