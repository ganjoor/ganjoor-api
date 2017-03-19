# Ganjoor API
[![CircleCI](https://circleci.com/gh/ganjoor/ganjoor-api.svg?style=svg)](https://circleci.com/gh/ganjoor/ganjoor-api)

## Development

Rename or copy `.env.example` to `.env` and set needed variables in it.

Then:

``` bash
$ yarn
$ yarn dev
```

## Docker Container

``` bash
$ yarn
$ yarn build
$ docker-compose up
```

You'll see a bunch of errors at first, because it takes a bit of time for the MySQL container to start up (due to the large db dump file). As soon as it has started up, the API container will connect to it and you'll see the message:

    Server started at port 4003

At that point you can head to [http://localhost:4003/](http://localhost:4003/) to checkout the API. You can also make the containers run in the background by cancelling the current process and running:

``` bash
$ docker-compose up -d
```

## API Documentation

Head to [http://localhost:4003/api-docs](http://localhost:4003/api-docs) to read the API documentation.

## Sponsors

![](http://cdn.auth0.com/oss/badges/a0-badge-dark.png)


## License

This software is released under the [MIT License](LICENSE).
