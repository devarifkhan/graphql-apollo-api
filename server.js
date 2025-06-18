const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const resolvers = require('./resolvers'); // Assuming resolvers are defined in a separate file

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const typeDefs = gql`
type Query{
    greeting: [String!]
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
    user(id: ID!): User
}

input CreateTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
}

type Mutation {
    createTask(input: CreateTaskInput!): Task
    
}

type User{
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
}

type Task{
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
}
`;



const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    app.use("/", (req, res, next) => {
        res.send("Hello World");
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});

