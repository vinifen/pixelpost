# Pixelpost
#### v-alpha-2.0

Pixelpost is a digital art platform that allows users to either download their creations or save them to their account. 

It was developed using React, PHP, Tailwind CSS, simple JWT-based authentication, and MySQL, with the goal of advancing my web development skills.

## Local Installation:

### Backend:

First, start the backend:

``bash
cd backend
``

#### Create the database:

CCopy the contents of `db/pixelpost-db-mysql.sql` into your MySQL database.

#### Create the `.env` file:

Create an environment variables file following the structure of `.env.example`, using the same MySQL username and password.

#### Install dependencies:

``bash
composer install
``

#### Start the server:

``bash
php -S localhost:7000
``

### Frontend: 

Now, initialize the frontend:

``bash
cd frontend
``

#### Install dependencies:

``bash
npm install
``

### Start the application:

``bash
npm run dev
``

## Prototyping: 

[Pixelpost Figma](https://www.figma.com/design/sV995gkHQ95o3tC8WoQkkx/Untitled?node-id=109-101&p=f&t=3UoeuqwmI08XuRyU-0)

## Screenshots:

![Home](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1740441430/home-pixelpost_afwi1y.png)

![Login](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1740441431/login-pixelpost_ldkidw.png)

![Canvas](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1740441430/canvas-pixelpost_yluk5q.png)

![Account](https://res.cloudinary.com/dp5iuxy1u/image/upload/v1740441426/account-pixelpost_pezckt.png)