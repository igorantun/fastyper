# Fastyper

[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/fastyper.svg?style=flat-square)](https://github.com/IgorAntun/fastyper/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/fastyper.svg?style=flat-square)](https://github.com/IgorAntun/fastyper/issues) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg?style=flat-square)](http://198.199.84.175:9000/room/training)

## Screenshots
![Game running](https://i.imgur.com/VJlD30E.png)

## Setup
> How to install and get the game up and running

First things first, let's install our frontend dependencies and build a production-ready bundle of our web app.
```
$ cd webapp
$ npm install
$ npm run build
```
Ok, now that we have our frontend ready, let's install our backend dependencies and start it!
```
$ cd ../api
$ npm install
$ npm start
```
Great! Now, if everything worked fine, we should be able to access the app at `localhost:9000` :)

## Get started
> Guides, assuming the game is running at `localhost:9000`

### Join a room
*URL:* `localhost:9000/room/[ROOM_NAME]/username/[YOUR_USERNAME]`   
*Example:* Join the `practicing` room as `IgorAntun`: `localhost:9000/room/practicing/username/IgorAntun`

### Get room status
*URL:* `localhost:9000/room/[ROOM_NAME]/status`   
*Example:* Get status for the `practicing` room: `localhost:9000/room/practicing/status`

## License
>You can check out the full license [here](https://github.com/IgorAntun/fastyper/blob/master/LICENSE.md)

This project is licensed under the terms of the **WTFPL** license.  
You just DO WHAT THE FUCK YOU WANT TO.
