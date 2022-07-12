import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'
const UserInfo = () => {
  const user = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    ;(async () => {
      const data = await blogService.getAllUsersBlogs(user.id)
      setData(data)
    })()
  }, [])
  return (
    <>
      {data.map((value) => (
        <p key={value.title}>
          {Object.keys(value).map((keyname, i) => (
            <span key={i}>{value[keyname]}</span>
          ))}
        </p>
      ))}
    </>
  )
}
export default UserInfo
