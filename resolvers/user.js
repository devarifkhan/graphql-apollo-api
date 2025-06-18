const { users, tasks } = require('../constants');

module.exports={
    Query: {
            
            users: () => {
                console.log(users);
                return users;
            },
            user: (_, { id }) => {
                console.log('User ID:', id);
                return users.find(user => user.id == id);
            }
        },
    
        Mutation:{
            
        },
       
        User: {
            tasks: ({ id }) => {
                console.log('User ID for tasks:', id);
                return tasks.filter(task => task.userId == id);
            }
        }
}