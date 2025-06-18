const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const { tasks, users } = require('./constants');


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

const resolvers = {
    Query: {
        greeting: () => "Hello from GraphQL!",
        tasks: () => {
            console.log(tasks);
            return tasks;
        },
        task:(_, { id }) => {
            console.log('Task ID:', id);
            return tasks.find(task => task.id == id);
        },
        users: () => {
            console.log(users);
            return users;
        },
        user: (_, { id }) => {
            console.log('User ID:', id);
            return users.find(user => user.id == id);
        }
    },
    Task: {
        user: ({ userId }) => {
            console.log('userId', userId)
            return users.find(user => user.id == userId)
        }
    },
    User: {
        tasks: ({ id }) => {
            console.log('User ID for tasks:', id);
            return tasks.filter(task => task.userId == id);
        }
    }
};

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

