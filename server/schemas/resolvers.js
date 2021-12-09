const { User } = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { tokenSign } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const dataUser = await User.findOne({ _id: context.user._id}).select("-_v -password");

                return dataUser;
            }

            throw new AuthenticationError("You're not in!");
        }

    },
    Mutation: {
        login: async (parent, {email, passwork}) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new AuthenticationError('Incorrect login!')
            }
            const token = tokenSign(user);
            return { user, token };
        },
        userAdd: async (parent, args) => {
            const user 
        }
    }
}