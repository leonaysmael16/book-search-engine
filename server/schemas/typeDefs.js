const { gql } = require('apollo-server-express');

const typeDef = gql`

type user {
    _id:ID
    username: String
    email: String
    password: String
    bookcount: Int
    savedBooks: [Book]
}

type book {
    idBook: String
    authors: [String]
    title: String
    Description: String
    Image: String
    Link: String
}

type book {
    me: User
    users: [User]
}

type mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
    saveBook(input: BookInout): User
    removeBook(bookId: String): User

}

input  {
    bookId: String
    Authors: [String]
    title: String
    description: String
    image: String
    link: String

}

type auth {
    token: ID
    user: User
}


`;

module.exports = typeDef;