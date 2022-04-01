import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const Redirect = () => {
  const { shorten } = useParams()
  const [invalidURL, setInvalidURL] = useState(true)
  const url = `http://localhost:5000/shortenurls/${shorten}`
  const handleRedirect = async () => {
    const response = await axios.get(url)
    if (response?.status === 200) {
      setInvalidURL(false)
      increaseClicks()
      window.location.href = response.data.originalURL
    }
  }
  const increaseClicks = async () => {
    await axios.put(url).then((res) => {
      res.data.clicks++
    })
  }
  useEffect(() => {
    handleRedirect()
  }, [])
  return (
    <div>
      {invalidURL ? (
        <div className='invalidPage'>
          <div className='notFound'>404</div>
          <span className='invalidURL'>Invalid URL</span>
        </div>
      ) : (
        <h2 className='redirecting'>Redirecting...</h2>
      )}
    </div>
  )
}

export default Redirect
