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

@app.route('/api/organizations/<zipcode>')
def fetch_organizations(zipcode):
    organizations = db.organizations.find(
        {'zip_code': zipcode}, {'_id': False}
    ).limit(10)

    return dumps(list(organizations))

if __name__ == '__main__':
    app.run(debug=False, port=5001)
