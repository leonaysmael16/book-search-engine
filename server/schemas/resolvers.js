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
            const user = await User.create(args);
            const token = signToken(user)
            return { user, token };
            
        },
        saveBook: async (parent, { Book }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savedBook:book} },
                    { new: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('Please Log in to save')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedBook: {bookId: bookId}}}
                )
                return updateUser;
            }
        }
    }
}

module.exports = resolvers;