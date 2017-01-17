var express = require('express')

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var errorObj = {unix: null, natural: null, error: 'Please include Unix date or string formatted as a valid date and time'}

var dateResponse = (res, data) => {
  if (isNaN(data)) {
    // Formatted date
    var natural = decodeURIComponent(data)
    var date = new Date(natural)
    var unix = date.getTime()
    if (isNaN(unix)) {
      // date is not valid
      return res.json(errorObj)
    }
  } else {
    // Unix date
    var unix = parseInt(data)
    var date = new Date(unix)
    var natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  }
  var obj = {
    unix,
    natural
  }
  return res.json(obj)
}

var app = express()
app.get('/:data', (req, res) => {
  var data = req.params.data || null
  if (data) {
    dateResponse(res, data)
  } else {
    return res.json(errorObj)
  }
})

app.get('/', (req, res) => {
  res.end('Please format call as /dateString or /unixTime')
})

app.listen(process.env.PORT || 5000)
