from bs4 import BeautifulSoup
from app import db
import requests
import json
import re

BASE_URL = 'https://www.foodpantries.org/'

organizations = []

def get_soup(url):
    """
    url(str) -> https://www.foodpantries.org/
    output -> BeautifulSoup object

    Returns BeautifulSoup object with callable methods like find(), findAll()
    """
    html_doc = requests.get(url).text
    return BeautifulSoup(html_doc, 'html.parser')

def is_default_image(photo_url):
    """
    photo_url(str) -> https://www.foodpantries.org/li/capital-area-food-bank-washington
    output -> Bool or str

    Returns photo_url as long as it is not a default image such as: https://www.foodpantries.org/li/no_photo.....jpg
    """
    if 'no_photo' in photo_url:
        return None
    return photo_url

def remove_tags(string):
    """
    input(str) -> <p>Hello World</p>
    output(str) -> Hello World

    Uses regex to clean up strings that contains tags.
    """
    pattern = re.compile(r'<.*?>')
    return re.sub(pattern, '', string)

def create_organizations(org_url):
    """
    input(str) -> https://www.foodpantries.org/li/capital-area-food-bank-washington

    output -> void
    """
    try:
        next_page     = get_soup(org_url)  # This is the more details page for a single org

        content       = next_page.find('div', {'class': 'span8'})  # Grab div where all extra content for single org
        script_tag    = content.find('script', {'type': 'application/ld+json'})  # Website has some content in script tag that contains json but with unwanted tags
        org_details   = json.loads(remove_tags(rf'{script_tag}'))  # Returns __dict__

        org_address   = org_details['address']  # Grab organization details from details

        # Use BeautifulSoup with regex to find string that contain social links
        website_url   = content.find('a', string='>Website')
        facebook_url  = content.find('a', string='Facebook')
        twitter_url   = content.find('a', string='Twitter Address')
        instagram_url = content.find('a', string='Instagram URL')

        org_thumbnail = is_default_image(org_details['image'])  # Returns org_thumbnail or None

        # Mongo document
        organization = {
            'name'          : org_details['name'],
            'type'          : org_details['@type'],
            'phone_num'     : org_details['telephone'],
            'desc'          : org_details['description'],
            'address'       : org_address['streetAddress'],
            'city'          : org_address['addressLocality'],
            'state'         : org_address['addressRegion'],
            'zip_code'      : org_address['postalCode'],
            'image_url'     : org_thumbnail if org_thumbnail else None,
            'website_url'   : website_url['href'] if website_url else None,
            'facebook_url'  : facebook_url['href'] if facebook_url else None,
            'twitter_url'   : twitter_url['href'] if twitter_url else None,
            'instagram_url' : instagram_url['href'] if instagram_url else None,
        }

        # organizations.append(organization)
        db.organizations.insert_one(organization)

    # Handle BeautifulSoup error or db connection error
    except Exception as e:
        print('An error on an org occured...')

def get_orgs_from_city(url):
    """
    input(str) -> https://www.foodpantries.org/ci/ca-san_francisco

    output -> void
    """
    # Basic error handling: skips city if there is no content
    try:
        soup = get_soup(url)
        blog_list = soup.find('ul', {'class': 'blog-list'})  #  Grab main div where all organizations live

        orgs = blog_list.findAll('h2')  # Grab all org h2 tags

        for org in orgs:
            create_organizations(org.a['href'])  # For each org url pass to function
    except:
        print('[*] failed on city:', url)

def get_organizations():
    """ Main file """
    soup = get_soup(BASE_URL)  # create initial BeautifulSoup object from homepage

    states_a_tags = soup.find('div', {'class': 'multicolumn'}).findAll('a')  # Grab main div with all states from homepage

    #  Loop through each state div
    for state in states_a_tags:
        state_soup = get_soup(state['href'])  # Grab state url: for example -> https://www.foodpantries.org/st/california
        cities = state_soup.findAll('td')  # Grab all cities divs

        # for each city div
        for city in cities:
            get_orgs_from_city(city.a['href'])  # pass city.url to function

        print('[*] Finished state:', state.text)


if __name__ == '__main__':
    get_organizations()
