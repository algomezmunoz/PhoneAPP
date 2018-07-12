# Challenge Phone APP

## Requirements

- Nodejs 8 or higher
- MongoDB

## Installation & Configuration

Go to the base directory and make
```nodejs
npm install
```
The app contains a config directory with a config file.
- Change the variable domainDB to the uri of the database if needed. 

```nodejs
var domainDB = 'mongodb://mongo:27017/challenge';
```

Run the Aplication:
```nodejs
npm start
```


### Testing

For testing purpose you can run
```nodejs
npm test
```

## Endpoint /api/challenge/phonesCatalog

### Description
This endpoint return the all the catalog phone of the database.

### Petition Type:
- GET

### Example Body Json
- No need

### Example Result
```json
[
    {
        "id": "5b3f4b287c9d7c428a849508",
        "name": "M1",
        "description": "This is the model M1",
        "reference": "/usr/var/imgM1",
        "price": 50.05
    },
    {
        "id": "5b3f4b327c9d7c428a849509",
        "name": "M2",
        "description": "This is the model M2",
        "reference": "/usr/var/imgM2",
        "price": 100.30
    },
    {
        "id": "5b4333f99332d80a58c11786",
        "name": "M3",
        "description": "This is the model M3",
        "reference": "/usr/var/imgM3",
        "price": 10.5
    }
]
```

## Endpoint /api/challenge/phonesCatalog

### Description
This endpoint create a new phone for the catalog.
Also, is not required for the problem and it doesn't have any type of security.

### Petition Type:
- POST

### Example Body Json
```json
{
	"name":"M200",
	"description":"This is the model M200",
	"reference":"/usr/var/imgM200",
	"price":"139.52"
}
```

### Example Result
```json
{
	"id": "5b43402f9332d80af167f217",
	"name":"M200",
	"description":"This is the model M200",
	"reference":"/usr/var/imgM200",
	"price":"139.52"
}
```

## Endpoint /api/challenge/order

### Description
This endpoint return the total of money needed to buy all the phones of the catalog, and save the order in case all is correct.

### Petition Type:
- POST

### Example Body Json
```json
{
	"name":"Tom",
	"surname": "Straus",
	"email": "tstraus@gmail.com",
	"idPhones": ["5b3f4b287c9d7c428a849508", "5b3f4b327c9d7c428a849509","5b4333f99332d80a58c11786"]
}
```

### Example Result
```json
{
    "result": "Total Price: 110.6"
}
```

## Docker

### Build Containers
For the first start, we will prepare all the containers needed for the first run.

Firstly, we have to download the mongo container and make it run:
```shell
docker pull mongo
docker run -d -p 27017:27017 --name mongo mongo
```

Now with a mongo container runing, we have to prepare the app.
For this, we have to build the app first:
 - We have to launch the first command in the main directory of the app where the "Dockerfile"
 - Then launch the second command to run the app

```shell
docker build -t phone-app .
docker run -d --link mongo  -p 3000:3000 phone-app
```

Know we have the container up and running to go.

### Start and Stop Containers

For stopping and starting the containers, we have to know the id of each one.

So we have to launch the next command:

```shell
docker ps -a
```
And find the ids of mongo and phone-app

Finally we have to stop or start both container:

#### Starting
```shell
docker start ID-PHONE-APP
docker start ID-MONGO
```

#### Stoping
```shell
docker stop ID-PHONE-APP
docker stop ID-MONGO
```
