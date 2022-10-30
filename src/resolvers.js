import { Task } from "./sample";
import  User from "./models/User";

export const resolvers = {
  Query: {
    hello: () => "Learning GraphQL with Fazt",
    greet(root, args,context) {
      console.log(context);
      console.log(args.name);
      return "Hola " + args.name;
    },
    tasks: () => Task,
    Users:async()=>await User.find()
  },
  Mutation: {
    createTask(_, { input }) {
      input._id = Task.length + 1;
      Task.push(input);
      return Task;
    },
     async createUser(_, { input }) {
      const newUser = new User(input)
      await newUser.save()
      return newUser;
    },
    async updateUser(_, {_id, input }) {
      return await User.findByIdAndUpdate(_id, input,{new:true});
    },
    async deleteUser(_, { _id }) {
      return await User.findByIdAndDelete(_id);
    }
  },
};
