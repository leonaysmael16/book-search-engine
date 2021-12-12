// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');
// const { ApolloServer } = require('apollo-server-express');
// const { authMiddleware } = require('./utils/auth');
// const { typeDefs, resolvers } = require('./schemas');


// const bookServer = new ApolloServer({
//   typeDefs, resolvers, context: authMiddleware
// });

// bookServer.applyMiddleware({ app });
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/public')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//   console.log(`🌍 Now listening on localhost:${PORT}`);
//   console.log(`Use GraphQL at http://locahost${PORT}!`);
// });
  
// });

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    introspection: process.env.NODE_ENV !== 'production'
  })

  await server.start()


  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
}

startApolloServer()