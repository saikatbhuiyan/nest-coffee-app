<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash


# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#debug mode
$ NEST_DEBUG=tue npm run start:dev

# check for circular dependency
npx madage dist/main.js --circular
npx madage dist/main.js --image graph.png

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## CLI

```bash
nest g filter common/filters/http-exception
# generate controller
$ nest g co
$ nest generate controller --no-spec [--no-space will not generate test file]
$ nest generate controller modules/abc
$ nest generate controller modules/abc --dry-run [--dry-run will test mode]

# generate dto
$ nest g class coffees/dto/create-coffee --no-spec [--no-space will not generate test file]
# generate module
nest g mo coffee-rating

nest g interceptor common/interceptors/wrap-response

nest g resource users

nest g service iam/hashing/bcrypt --flat


npx typeorm migration:create .\src\migrations\
npx typeorm migration:create -n CoffeeRefactor
npx typeorm migration:run
npx typeorm migration:revert
typeorm migration:run -- -d path-to-datasource-config
nest g filter common/filters/http-exception

nest g guard iam/authorization/guards/roles

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

npm run test:watch -- coffees.service

```

## Lazy loading module

nest g mo rewards --skip-import

nest g s rewards


Let me try explain what i did.

## Postgresql

First of all I did the configuration needed to make sure my Postgres Database was accepting connections from outside.

open `pg_hba.conf` and add in the end the following line:

```sql
host    all             all             0.0.0.0/0               md5
```

open `postgresql.conf` and look for `listen_addresses` and modify there like this:

```sql
listen_addresses = '*'
```

Make sure the line above is not commented with a `#`

-> Restart your database

**_OBS_** : This is not the recommended configuration for a production environment

Next, I looked for my host’s `ip`. I was using localhosts ip `127.0.0.1`, but the container doesn’t see it, so the Connection Refused message in question shows up when running the container. After a long search in web about this, I read that the container sees the internal ip from your local network (That one your router attributes to every device that connects to it, i’m not talking about the IP that gives you access to the internet). That said, i opened a terminal and did the following:

## Look for local network ip

Open a terminal or CMD

(MacOS/Linux)

```sql
$ ifconfig
```

(Windows)

```sql
$ ipconfig
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
