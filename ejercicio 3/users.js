const fs = require('fs')
//const chalk = require('chalk') 
// en mi computadora me marca error al importar el chalk, pero curiosamente al retirar el "require" funciona


const addUser = (userName, userLastName,userAge, userMail) => {
    const users = loadUsers()
    const UserId = getLastUserID(users) + 1 //Busca el id mayor para asignarle de forma automatica un id, asi evitamos usuarios duplicados


    users.push({'id': UserId, 'name': userName, 'lastName': userLastName, 'age': userAge, 'mail': userMail})

    saveUser(users)
}

const listUsers = () => {
    const users = loadUsers()
    
    console.log('Lista de usuarios:\n',users) //me gustó mas como lo mostraba VSCode asi, así que así lo dejé
    /*users.forEach(element => { //Esta opción igual funciona
        console.log('--------------------------------')
        console.log('ID: ', element.id)
        console.log('Name: ',element.name)
        console.log('Last name: ',element.lastName)
        console.log('Age: ',element.age)
        console.log('Mail: ',element.mail)
        console.log('--------------------------------')
    });*/
    getLastUserID(users)
}

const searchByID = (id) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === id)
   console.log(user)
}

const searchByName = (name) => {
    const users = loadUsers();
    console.log('Lista de usuarios:')
    users.forEach(user => {
        if(user.name === name){
            console.log(user)
        }
    });
}

const removeByID = (id) => {
    const users = loadUsers()
    const usersToKeep = users.filter((user) => user.id !== id)
    if(users.length > usersToKeep.length){
        console.log('Usuario con el ID %d removido',id)
        saveUser(usersToKeep)
    } else {
        console.log('El usuario con ID %d no se encontró',id)
    }
}

const removeByName = (name) => {
    const users = loadUsers()
    const usersToKeep = users.filter((user) => user.name !== name)
    if(users.length > usersToKeep.length){
        console.log('Usuario %s ha sido removido',name)
        saveUser(usersToKeep)
    } else {
        console.log('El usuario %s no se encontró',name)
    }

}

const getLastUserID = (users) => {
    try{
        const lastUser = users.length
        console.log("Cantidad de usuarios: ", lastUser)
        const lastId = users[lastUser - 1 ]
        console.log("Usuario con el ID mas alto: ", lastId.id)
        return lastId.id
    } catch (e) {
        return 0
    }
    
}

const saveUser = (users) => {
    const dataJson = JSON.stringify(users)
    fs.writeFileSync('users.json',dataJson)

}

const loadUsers = () => {
    try {
        console.log('entra')
        const dataBuffer = fs.readFileSync('users.json')
        console.log('Leyó y convirtio en un buffer el archivo.\nConvirtiendo el buffer a string')
        const dataJson = dataBuffer.toString()
        console.log('Convertido, Parceando a Json')
        const jsonParsed = JSON.parse(dataJson)
        console.log('Retornando resulado')
        return  jsonParsed
    } catch (e) {
        console.log('Excepcion: ', e)
        return []
    }
}

module.exports = {
    addUser: addUser,
    listUsers: listUsers,
    searchByID: searchByID,
    searchByName: searchByName,
    removeByID: removeByID,
    removeByName: removeByName
}




/*Codigo beta
Intenté hacer el codigo de forma en que al agregar un usuario no tuviera que sobrescribir todo el archivo,
 para asi hacer mas optima la lectura y escritura si el archivo crececía mucho.
 Si escribía y leía el archivo, pero a la hora de querer usar el contenido del archivo, no lo tomaba como Json y lanzaba excepciones
 Mas notas abajo
 */

 /*
 const addUser = (userName, userLastName,userAge, userMail) => {
    const UserId = getLastUserID() + 1
    let user =  {'id': UserId, 'name': userName, 'lastName': userLastName, 'age': userAge, 'mail': userMail}
    saveUser(user)
}


 
 const saveUser = (user) => {
    const dataJson = JSON.stringify(user)

   /* Este es el primer intento 
   try{
        //si el archivo existe, solo hace un append del objeto
        fs.appendFileSync('users.json',dataJson)
        console.log('Usuario añadido')
    } catch (e) {
        
        fs.writeFileSync('users.json', dataJson)
        console.log('No se ha encontrado el archivo users.json, se ha creado uno nuevo')
    }  */

    /* Segundo intento
    try{
        //si el archivo existe, solo hace un append del objeto
        fs.writeFileSync('users.json', dataJson,{flag:'a+'})
        console.log('Usuario añadido')
    } catch (e) {
        //si el archivo no existe, lo crea y escribe el objeto
        fs.writeFileSync('users.json', dataJson)
        console.log('No se ha encontrado el archivo users.json, se ha creado uno nuevo')
    }
    
}

En ambos casos si se escribia el archivo y se escribia en él, pero al parecer el problema es que no se creaban los corchetes [] y no se ponian comas entre cada usuario*/