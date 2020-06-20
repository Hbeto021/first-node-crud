const express = require('express')
const { json } = require('express')

const server = express()
//defines the port the server will listen on
server.listen(3000)
//Defines that server will receive json in request body
server.use(express.json())

const users = ["João", "Paulo", "Maria"]

server.get('/listUsers', (request, response) => {
    return response.json(
        {
            users
        }
    )
})

server.post('/addUser', (request, response) => {
    const { name } = request.body

    if (name != null) {
        users.push(name)
        console.log(`Usuário ${name} adicionado com sucesso!`)
    } else {
        console.log("Erro ao adicionar!")
        return response.json(
            {
                message: "Erro ao adicionar um usuário, verifique o body da request!"
            }
        )
    }

    return response.json(users)
})

server.put('/editUser/:index', (request, response) => {
    const { index } = request.params
    const { name } = request.body

    if (name != null && index < users.length) {
        users[index] = name
        console.log(`Usuário ${name} alterado com sucesso!`)
    } else {
        console.log("Erro ao editar!")
        return response.json({ message: "Erro ao alterar o usuário, verique o body da request e o index!" })
    }

    return response.json(users)
})

server.put('/deleteUser/:index', (request, response) => {
    const { index } = request.params

    if (index < users.length) {
        users.splice(index, 1)
        console.log(`Usuário ${users[index]} deletado com sucesso!`)
    } else {
        console.log("Erro ao deletar!")
        return response.json({ message: "Erro, não existe um usuário na posição informada!" })
    }

    return response.json(users)
})

