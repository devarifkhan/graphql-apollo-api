const { users, tasks } = require('../constants');

module.exports = {
    Query: {
        tasks: () => {
            console.log(tasks);
            return tasks;
        },
        task: (_, { id }) => {
            console.log('Task ID:', id);
            return tasks.find(task => task.id == id);
        },


    },

    Mutation: {
        createTask: (_, { input }) => {
            console.log('Creating task with input:', input);
            const newTask = {
                id: tasks.length + 1,
                ...input
            };
            tasks.push(newTask);
            return newTask;
        }
    },
    Task: {
        user: ({ userId }) => {
            console.log('userId', userId)
            return users.find(user => user.id == userId)
        }
    },

}