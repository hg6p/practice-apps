const Book = require('./models/Book')
const Author = require('./models/Author')
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let data = await Book.find({}).populate('author')
      console.log('data', data)
      if (args.name) data = data.filter((book) => book.author.name == args.name)
      if (args.genre)
        data = data.filter((book) => book.genres.includes(args.genre))
      return data
    },
    allAuthor: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = new Author({ name: args.author })
      console.log(author)
      try {
        await author.save()
        console.log('Author', author)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      let book = new Book({ ...args, author })
      console.log(book)

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args) => {
      let [author] = await Author.find(
        { name: args.name },
        { name: 1, born: 1, _id: 0 }
      )
      console.log(author)
      if (!author)
        throw new UserInputError('User does not exist,', { invalidArgs: args })

      let data = await Author.updateOne(
        { name: author.name },
        { born: args.setBornTo }
      )
      return data
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}
module.exports = resolvers
