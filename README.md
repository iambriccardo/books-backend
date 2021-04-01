# books-backend
This repository contains the backend logic that powers the Books platform via a RESTful API.

_Note that this document is still in WIP, thus some information might be missed or not up to date._
## Table of contents
* [Installation](#installation)
* [How to run](#how-to-run)
* [How to test](#how-to-test)
* [Authors](#authors)
### Installation
Before proceeding with the installation, you will need the following software:
* [NodeJS](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/try/download/community)

In order to install this application you will need to use the following commands:
```shell
git clone https://gitlab.inf.unibz.it/Riccardo.Busetti/books-backend.git
git checkout [branch-name]

npm install
```

In addition to the aforementioned commands it is necessary to put in the root folder of the
program a `.env` file which must contains the following properties:
```dotenv
PORT=[The port where to listen for http request]
MONGO_DB_URL=[The databse url for mongo db]
SESSION_SECRET_KEY=[The secret key used to encrypt sessions]
ENABLE_LOGGING=[The boolean value representing if you want or not to enable logging]
```
### How to run
In order to run this application you will to use the following commands:
```shell
npm start
```
### How to test
In order to test this application you will to use the following commands:
```shell
npm test
```
### Authors
* Riccardo Busetti
* Gioele De Vitti
