//const chalk = require('chalk') 
// en mi computadora me marca error al importar el chalk, pero curiosamente al retirar el "require" funciona

const yargs = require('yargs')
const users = require('./users.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add new user',
    builder: {
        name: {
            describe: 'User name',
            demandOption: true,
            type: 'string'
        },
        lastName: {
            describe: 'User lastname',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'User age',
            demandOption: true,
            type: 'integer'
        },
        mail: {
            describe: 'User mail address',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        users.addUser(argv.name, argv.lastName, argv.age, argv.mail)
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        users.listUsers()
    }
})

yargs.command({
    command: 'searchByID',
    describe: 'Search an user by ID',
    builder: {
        id: {
            describe: 'User ID',
            demandOption: true,
            type: 'integer'
        }
    },
    handler(argv) {
        users.searchByID(argv.id)
    }
})

yargs.command({
    command: 'searchByName',
    describe: 'Search an user by Name',
    builder: {
        name: {
            describe: 'User Name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        users.searchByName(argv.name)
    }
})

yargs.command({
    command: 'removeByID',
    describe: 'Remove a user ID',
    builder: {
        id: {
            describe: 'User ID',
            demandOption: true,
            type: 'integer'
        }
    },
    handler(argv){
        users.removeByID(argv.id)
    }
})

yargs.command({
    command: 'removeByName',
    describe: 'Remove a user name',
    builder: {
        name: {
            describe: 'User Name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        users.removeByName(argv.name)
    }
})

yargs.parse()