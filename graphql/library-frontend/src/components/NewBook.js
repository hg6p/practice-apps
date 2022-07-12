import { useState } from 'react'
import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from '../queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(addedBook)) }
  })
}

const NewBook = (props) => {
  const [createBook] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      console.log('cache is update', cache)
      console.log('response is update', response)
      cache.updateQuery({ query: ALL_BOOKS }, ({ qwert }) => {
        console.log('allbooks is update', ALL_BOOKS)
        console.log('response is update', response.data)
        console.log('qwert is update', qwert)

        return {
          allBooks: qwert.concat(response.data.addBook),
        }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthor }) => {
        console.log('allbooks is update', allAuthor)
        console.log('response is update', response.data)

        return {
          allAuthor: allAuthor.concat(response.data.addBook.author),
        }
      })
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres,
      },
    })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
