import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genreteGenre, setGenerateGenre] = useState([])
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')

  const { data, loading, refetch } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  })
  console.log(data)
  useEffect(() => {
    if (!loading && !books.length) {
      let set = new Set()
      data.allBooks.forEach((element) => {
        element.genres.forEach((genre) => set.add(genre))
      })
      let arr = []
      for (let value of set) {
        arr.push(value)
      }
      console.log('useEffect arr', arr)
      setGenerateGenre(arr)
      setBooks(() => data.allBooks)
    }
  }, [data])

  /*   useEffect(() => {
    if (!loading) {
      const filteredBooks = data.allBooks.filter((book) =>
        book.genres.includes(genre)
      )
      setBooks(() => [...filteredBooks])
      console.log(filteredBooks)
      console.log(books)
    }
  }, [genre]) */

  if (!props.show) {
    return null
  }
  if (loading) return <p>loading</p>
  const changeGenre = (value) => {
    setGenre(value)
    refetch()
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genreteGenre.map((value, index) => (
          <button
            type="button"
            key={index}
            value={value}
            onClick={() => changeGenre(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
