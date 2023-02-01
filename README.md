# Redis

Learnt about caching in Redis.

## **Install Redis**

Open terminal and run:

 `sudo apt-get install redis-server`

For Windows users, refer [WSL Installation](https://learn.microsoft.com/en-us/windows/wsl/install) and then install redis from above command

## **Start Redis server**

Execute the following command:

`sudo /etc/init.d/redis-server start`

## Stop Server

`sudo /etc/init.d/redis-server stop`

Note: you can also set aliases to start and stop the server.

## Installation(npm packages)

Locate to the directory, open terminal and type:

`npm install`

Installs all the packages

## Run server locally

`npm run dev`

Note: You need to have redis server installed and started before execting this command

Upon successful execution, the appplication will run at [port: 3000](http://localhost:3000)

## Get weather data

Open browser and paste:

`http://localhost:3000/location/[YOUR LOCATION]/weather`

Replace [YOUR LOCATION] with a location of your choice.
