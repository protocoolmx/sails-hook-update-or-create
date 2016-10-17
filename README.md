# sails-hook-update-or-create

[![npm version](https://badge.fury.io/js/sails-hook-update-or-create.svg)](https://badge.fury.io/js/sails-hook-update-or-create)

Sails.js hook model method that updates or creates a record based on criteria and values argument.

## Install 

```
$ npm install sails-hook-update-or-create --save
```
## Overview

### Model.updateOrCreate(criteria, values)

| Parameter                | Type                   | Details                |
| :----------------------: |:----------------------:| :--------------------: |
| criteria                 | {}, string, int        | The criteria used to find the record. If not found and `values` is not provided, it is also the record that will be created.                       |
| values                   | {}                     | The object that you would like to update or create. |

## Usage

```javascript
User.updateOrCreate(123, {
  status: 'ACTIVE'
})
.then((user) => {
  sails.log.info(`User with id ${user.id} is active!`);
})
.catch(sails.log.error);
```

## Test

```
$ npm test
```
