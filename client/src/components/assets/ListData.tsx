import { useState } from 'react'
import axios from 'axios'

const ListData = ({
  container,
  longUrl,
  shortUrl,
  clicks,
  date,
  handleDelete,
  handleClick,
}: any) => {
  const [copy, setCopy] = useState('Copy URL')
  const domain = (url: any) => {
    let site = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split(/[/?#]/)[0]
    return site
  }
  const formatDate = (date: any) => {
    let newDate = date.split('T')[0]
    let dd = newDate.split('-')[2]
    let mm = newDate.split('-')[1]
    let yyyy = newDate.split('-')[0]
    return `${dd}.${mm}.${yyyy}`
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopy('Copied!')
    setTimeout(() => {
      setCopy('Copy URL')
    }, 2000)
  }
  const increaseClicks = async () => {
    await axios.put(`http://localhost:5000/shortenurls/${shortUrl}`)
    handleClick()
  }

  return (
    <div
      className='list-data'
      style={container === 'list' ? { width: '94%' } : { width: '95%' }}
    >
      <div className='date'>{formatDate(date)}</div>
      <div className='domain'>{domain(longUrl)}</div>
      <div className='long-url'>{longUrl}</div>
      <div>
        <a
          href={longUrl}
          target='_blank'
          className='short-url'
          onClick={increaseClicks}
        >
          {shortUrl}
        </a>
        <button className='button copy-btn' onClick={handleCopy}>
          {copy}
        </button>
        <button className='button delete-btn' onClick={handleDelete}>
          Delete URL
        </button>
        <div className='clicks'>Clicks: {clicks}</div>
      </div>
    </div>
  )
}

export default ListData
