const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "my",
    database: "test",
});

let getRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

console.log(getRandomUser());