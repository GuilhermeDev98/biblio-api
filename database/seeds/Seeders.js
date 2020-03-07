const Roles = require('./RoleSeed');
const Permissions = require('./PermissionSeed');
const Books = require('./BookSeed');
const Users = require('./UserSeed');


const seeders = [Users]

seeders.map((value, index, array) => {
    value.then(`Executado !`).catch(err => console.log(err.message))
})