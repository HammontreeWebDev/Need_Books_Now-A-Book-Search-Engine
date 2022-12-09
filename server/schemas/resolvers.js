const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // may need to add id
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
        },

    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addBook: async (parent, { authors, description, bookID, image, link, title }, context) => {
            if (context.user) {
              const book = await Book.create({
                authors,
                description,
                bookID,
                image,
                link,
                title
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteBook: async (parent, { bookID }, context) => {
            if (context.user) {
              const book = await Book.findOneAndDelete({
                _id: bookID,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    }
}

module.exports = resolvers;