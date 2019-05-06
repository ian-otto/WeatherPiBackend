# WeatherPiBackend
WeatherPiBackend is an application for parsing WView daily files and storing them into a MySQL backend. It also exposes an API
to allow for access to the data.

## Requirements
 - Recent version of NodeJS
 - MySQL (or other compatible server)

## Installation
There are a few stages to this install:

### Setting up the MySQL Database
Simply connect to the MySQL server, create a database, and import the schema SQL file given.

### Installing dependencies
To start, download one of our prebuilt releases, or clone this repository. Then run
```
npm install
```
in the root of the repository.

Then, you need to configure your installation. Copy the configuration sample file given in `config/config.json.sample` to `config/config.json`, and enter in your MySQL
