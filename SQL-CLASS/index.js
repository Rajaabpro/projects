const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

let createConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deepchatb@1",
    database: "delta_app",
});
try{    
    let result = await createConnection.query("SHOW TABLES");
    console.log(result);
    createConnection.end();
}catch(err){
    console.log(err);
}


let getRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

console.log(getRandomUser());