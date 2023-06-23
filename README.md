# Pantry Pal

## Table of Contents

- [Pantry Pal](#pantry-pal)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)
  - [MIT License](#mit-license)

## Description

**This is an extremely important component of the README.**

   This project was built as part of the Co.Lab 19 Cohort in 2023. The main goal of our group - which included George Ceja, Robert Adkins, Joel Yap and Adam Robson - when we started out, was to create an application that would make an impact in some way, on communities that were underserved. After some group brainstorming, we decided to focus on first-generation college students.  In the end, we created an application that can serve any person who is in need of food assistance.

## Overview

<!-- TODO: Add a screenshot of the live project.
    1. Link to a 'live demo.'
    2. Describe your overall experience in a couple of sentences.
    3. List a few specific technical things that you learned or improved on.
    4. Share any other tips or guidance for others attempting this or something similar.
 -->

## Tech Stack
<p><ins>Frameworks:</ins> React, Flask</p>
<p><ins>Languages:</ins> JavaScript, Python</p>
<p><ins>Database:</ins> MongoDB</p>
<p><ins>FOther:</ins> Tailwind, Google Maps,  Geolocation API, GeoCoding API</p>

<ins>Deployments hosted on:</ins>
[Fly](https://fly.io/),
[Heorku](https://www.heroku.com/), and
[MongoAtlas](https://www.mongodb.com/atlas/database)

## Features
<details>
  <summary>Find pantries near you</summary>
  <p>When visiting the page the application will locate you and find pantries in your area.</p>
</details>

<details>
  <summary>Search for Pantries outside of your premise</summary>
  <p>As a user you are able to search for pantries in places outside of your area.</p>
</details>

<details>
  <summary>Directions to Pantries</summary>
  <p>As a user you are able to get directions to a pantry within the application.</p>
</details>

<details>
  <summary>Tutorial</summary>
  <p>As a new user you are able to view a tutorial that explains what the application can do.</p>
</details>

<details>
  <summary>Details Page</summary>
  <p>You can also view more details of a pantry such as hours of operation, description, social media links, and more!</p>
</details>

<details>
  <summary>Navbar</summary>
  <p>Our navbar consists of pages such as About Us, Resources, and Tutorial.</p>
</details>

## Setup
To run this project locally, first, clone the repository:

In the root folder add an `.env`
```
#.env
REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_api_key>
REACT_APP_FLY_API_URL=<your_api_url>
```
Now run:
```
$ npm install
$ npm start
```

Now visit:
http://localhost:3000

## Contact

<!-- TODO: Include icons and links to your RELEVANT, PROFESSIONAL 'DEV-ORIENTED' social media. LinkedIn and dev.to are minimum. -->

## Acknowledgements

<!-- TODO: List any blog posts, tutorials or plugins that you may have used to complete the project. Only list those that had a significant impact. Obviously, we all 'Google' stuff while working on our things, but maybe something in particular stood out as a 'major contributor' to your skill set for this project. -->

## MIT License

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
