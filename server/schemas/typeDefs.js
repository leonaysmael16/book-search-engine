const { gQL } = require('apollo-server-express');

const typeDef = gQL `

user type {
    _id:ID
    username: String
    email: String
    password: String
    bookcount: Int
    savedBooks: [Book]
}

book type {
    idBook: String
    authors: [String]
    title: String
    Description: String
    Image: String
    Link: String
}

query type {
    me: User
    users: [User]
}

mutation type {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth

}



`