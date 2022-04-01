import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import ListData from './assets/ListData'

const List = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const url = 'http://localhost:5000/shortenurls'
  const getSearchData = async () => {
    if (search === '') {
      const response = await axios.get(url)
      setData(response.data)
    } else {
      const response = await axios.get(url + `?search=${search}`)
      setData(response.data)
    }
  }

  const deleteURL = async (shortUrl: any) => {
    await axios.delete(url + `/${shortUrl}`)
    getSearchData()
  }

  useEffect(() => {
    getSearchData()
  }, [search])

  return (
    <div className='list-container'>
      <header>
        <span className='header' onClick={() => navigate('/')}>
          | shrinker
        </span>
        <input
          type='text'
          name='search'
          placeholder='Search by long/short URL'
          className='search-bar'
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <hr />
      <section className='grid-container'>
        {data.length > 0 ? (
          data.map(({ _id, original, alias, clicks, date }) => (
            <div key={_id}>
              <ListData
                container='list'
                longUrl={original}
                shortUrl={alias}
                clicks={clicks}
                date={date}
                handleDelete={() => deleteURL(alias)}
                handleClick={() => getSearchData()}
              />
            </div>
          ))
        ) : (
          <div className='empty-list all'>List is Empty</div>
        )}
      </section>
      <br />
    </div>
  )
}

export default List
