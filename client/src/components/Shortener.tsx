import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import ListData from './assets/ListData'

const Shortener = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [values, setvalues] = useState({
    original: '',
    alias: '',
  })

  const handleChange = (e: any) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const [errors, setErrors] = useState({
    urlError: '',
    aliasError: '',
  })

  const url = 'http://localhost:5000'
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios
      .post(url, values)
      .then((res) => {
        setvalues({
          original: '',
          alias: '',
        })
        setErrors({
          urlError: '',
          aliasError: '',
        })
        getData()
      })
      .catch((err) => {
        setErrors({
          urlError: err.response.data.urlError,
          aliasError: err.response.data.aliasError,
        })
      })
  }

  const getData = async () => {
    const response = await axios.get(url + '/shortenurls')
    setData(response.data)
  }
  const deleteURL = async (shortUrl: any) => {
    await axios.delete(url + `/shortenurls/${shortUrl}`)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='container'>
        <header>
          <span className='header'>| shrinker</span>
          <button className='list-btn' onClick={() => navigate('/shortenurls')}>
            Shortened URLs
          </button>
        </header>
        <section className='subcontainer'>
          <span className='title'>URL Shortener</span> <br />
          <span className='subtitle'>
            Simplify your links, track & manage them
          </span>
          <form className='form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='original'
              value={values.original}
              placeholder='Paste long URL and shrink it'
              className='url'
              onChange={handleChange}
            />
            <input type='submit' value='Shrink' className='shrink-btn' /> <br />
            {errors.urlError && <li className='error'>{errors.urlError}</li>}
            <input
              type='text'
              name='alias'
              value={values.alias}
              placeholder='alias (optional)'
              className='alias'
              onChange={handleChange}
            />
            {errors.aliasError && (
              <li className='error'>{errors.aliasError}</li>
            )}
          </form>
        </section>
      </div>
      <div className='shrink-container'>
        <span className='recent-text'>Recently Shrinked :</span>
        {data.length > 0 ? (
          data.slice(0, 2).map(({ _id, original, alias, clicks, date }) => (
            <div key={_id}>
              <ListData
                container='main'
                longUrl={original}
                shortUrl={alias}
                clicks={clicks}
                date={date}
                handleDelete={() => deleteURL(alias)}
              />
              <br />
            </div>
          ))
        ) : (
          <div className='empty-list'>List is Empty</div>
        )}
      </div>
    </>
  )
}

export default Shortener
