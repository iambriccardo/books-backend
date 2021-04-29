# books-backend

This repository contains the backend logic that powers the Books platform via a RESTful API.

_Note that this document is still in WIP, thus some information might be missed or not up to date._

## Table of contents

* [Installation](#installation)
* [How to run](#how-to-run)
* [How to test](#how-to-test)
* [Documentation](#documentation)
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

Last but not least, put a `.env` file in the root folder, containing the following:

```dotenv
APP_NAME=[The name of the app]
PORT=[The port where to listen for http request]
MONGO_DB_URL=[The databse url for mongo db]
SECRET_KEY=[The secret key used to encrypt jwt tokens]
ENABLE_LOGGING=[The boolean value representing if you want or not to enable logging]
CLOUDINARY_URL=[The url of the cloudinary store]
GCP_API_KEY=[The API key for the Google Cloud Platform]
```

### How to run

Execute:

```shell
npm run dev
```

### How to test

Execute:

```shell
npm test
```

### Documentation

Start the server and go to `/api-docs` endpoint or open the file `src/assets/openapi.json` on GitLab.

### Authors

* Riccardo Busetti
* Gioele De Vitti
