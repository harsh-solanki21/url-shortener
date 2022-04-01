const shortId = require('shortid')
const URL = require('../models/urlModel')

const addURL = async (req, res) => {
  const validURL = (original) => {
    const valid =
      /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
    return original.match(valid)
  }
  const { original, alias } = req.body
  try {
    if (!validURL(original)) {
      return res.status(400).send({ urlError: 'Please provide a valid URL' })
    }
    const urlExists = await URL.findOne({ original })
    if (urlExists) {
      return res.status(400).send({ urlError: 'URL already shortened' })
    }
    if (alias) {
      const exists = await URL.findOne({ alias })
      if (exists) {
        return res.status(400).send({ aliasError: 'Alias already exists' })
      }
      const urls = new URL({
        original,
        alias,
      })
      await urls.save()
      res.status(200).send(urls)
    } else {
      const urls = new URL({
        original,
        alias: shortId.generate(),
      })
      await urls.save()
      res.status(200).send(urls)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getList = async (req, res) => {
  const search = req.query.search
  try {
    if (search) {
      const urls = await URL.find({
        $or: [{ original: { $regex: search } }, { alias: { $regex: search } }],
      }).sort({ date: 'desc' })
      res.status(200).send(urls)
    } else {
      const urls = await URL.find({}).sort({ date: 'desc' })
      res.status(200).send(urls)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const redirectURL = async (req, res) => {
  const shorten = req.params.shorten
  try {
    const urls = await URL.findOne({ alias: shorten })
    if (!urls) {
      return res.status(400).send({ urlError: 'Invalid URL' })
    }
    return res.status(200).send({ originalURL: urls.original })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateLinkClicks = async (req, res) => {
  try {
    const urls = await URL.findOne({ alias: req.body.alias })
    if (urls === null) {
      return res.status(404).send({ aliasError: 'Invalid Alias' })
    }
    urls.clicks++
    await urls.save()
    res.status(200).send(urls)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateParamsVisits = async (req, res) => {
  try {
    const urls = await URL.findOne({ alias: req.params.shorten })
    if (urls === null) {
      return res.status(404).send({ aliasError: 'Invalid Alias' })
    }
    urls.clicks++
    await urls.save()
    res.status(200).send(urls)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteURL = async (req, res) => {
  try {
    await URL.deleteOne({ alias: req.params.shorten })
    res.status(200).send({ message: 'URL deleted' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  addURL,
  getList,
  redirectURL,
  updateLinkClicks,
  updateParamsVisits,
  deleteURL,
}
