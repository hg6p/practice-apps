import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blogServices from '../services/blogs'

const User = ({ posts }) => {
  const navigate = useNavigate()
  let data = posts()
  console.log(Object.keys(data))
  const [users, setUser] = useState([])
  useEffect(() => {
    ;(async () => {
      let data = await blogServices.getUsers()
      console.log(data[0])
      setUser(data)
    })()
  }, [])
  console.log(users)
  return (
    <div>
      {users.map((value) => (
        <p
          key={value.name}
          onClick={() => navigate(`./${value.id}`, { replace: true })}
        >
          {value.name} {value.blogs.length}
        </p>
      ))}
    </div>
    /* <div>
      {Object.keys(data).map((keyName, i) => (
        <li className="travelcompany-input" key={i}>
          <span
            key={keyName}
            className="input-label"
            onClick={() => navigate(`./${keyName}`, { replace: true })}
          >
            {keyName} {data[keyName]}
          </span>
        </li>
      ))}
    </div> */
  )
}

export default User
