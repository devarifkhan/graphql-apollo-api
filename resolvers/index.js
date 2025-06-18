const userResolver = require('./user');
const taskResolver = require('./task');

module.exports = {
    Query: {
        ...userResolver.Query,
        ...taskResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...taskResolver.Mutation
    },
    User: userResolver.User,
    Task: taskResolver.Task
};