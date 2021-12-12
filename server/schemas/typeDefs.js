// const { gql } = require('apollo-server-express');

// const typeDefs = gql`

// type user {
//     _id:ID
//     username: String
//     email: String
//     password: String
//     bookcount: Int
//     savedBooks: [Book]
// }

// type book: {
//     idBook: String
//     authors: [String]
//     title: String
//     Description: String
//     Image: String
//     Link: String
// }

// type book {
//     me: user
//     users: [user]
// }

// type mutation {
//     login(email: String, password: String): Auth
//     addUser(username: String, email: String, password: String): Auth
//     saveBook(input: BookInout): User
//     removeBook(bookId: String): User

// }

// input BookInput {
//     bookId: String
//     Authors: [String]
//     title: String
//     description: String
//     image: String
//     link: String

// }

// type auth {
//     token: ID
//     user: user
// }


// `;

// module.exports = typeDefs;

const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id:ID
    username: String
    email: String
    password: String
    bookcount: Int
    savedBooks: [Book]
}

type Book {
    idBook: String
    authors: [String]
    title: String
    Description: String
    Image: String
    Link: String
}

type Book {
    me: User
    users: [User]
}

type Mutation {
    login(email: String, password: String): Auth
    userAdd(username: String, email: String, password: String): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String): User

}

input BookInput {
    bookId: String
    Authors: [String]
    title: String
    description: String
    image: String
    link: String

}

type Query {
    me: User
  }

type Auth {
    token: ID
    user: User
}


`;

module.exports = typeDefs;