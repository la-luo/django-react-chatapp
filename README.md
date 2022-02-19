## How to use the APP

Create a postgres user `django` with `Create DB` permission and set up the database:
```
django-react-chatapp % psql postgres 
postgres=# create role django with login password 'django'
postgres=# alter role django createdb
postgres=# psql postgres -U django
postgres=# create database djangochat
```

From the root directory, create venv and activate it
```
python3 -m venv venv
source venv/bin/activate
```
Then pip install all dependencies:
```
pip3 install -r requirements.txt
```
Then go to the backend folder and spin up the backend server
```
cd backend
python3 manage.py runserver
```
Then go to the frontend folder, npm install all dependencies and run the frontend react app
```
cd frontend
npm install
npm start
```
