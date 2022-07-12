import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'

const Authors = ({ show }) => {
  const [authorBirthYear, setAuthorBirthYear] = useState('')
  const [authorName, setAuthorName] = useState('')
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [editBirthYear] = useMutation(UPDATE_BIRTH_YEAR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthor }) => {
        console.log(response)
        return {
          allAuthor: allAuthor.concat(response.data.editAuthor),
        }
      })
    },
  })

  useEffect(() => {
    if (!loading)
      (() => {
        setAuthorName(data.allAuthor[0].name)
      })()
  }, [loading])
  if (!show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }
  const editAuthor = (event) => {
    event.preventDefault()

    editBirthYear({
      variables: { name: authorName, setBornTo: Number(authorBirthYear) },
    })
    console.log('add book...')
    setAuthorBirthYear('')
    setAuthorName(data.allAuthor[0].name)
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthor.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Birth Year</h2>
        <form onSubmit={editAuthor}>
          <select
            value={authorName}
            onChange={({ target }) => {
              setAuthorName(target.value)
              console.log(authorName)
            }}
          >
            {data.allAuthor.map((value) => (
              <option key={value.name} value={value.name}>
                {value.name}
              </option>
            ))}
          </select>
          <input
            name="year"
            type="text"
            placeholder="Author birth year"
            value={authorBirthYear}
            onChange={({ target }) => setAuthorBirthYear(target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
