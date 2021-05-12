const express = require('express')
const axios = require('axios')
const { port, devAppPort } = require('./mfb-cli.json')

const MICRO_SERVICE_URL_FORM = `http://localhost:${port}/header`

const app = express()

app.get('*', async (_, res) => {
  try {
    const { data } = await axios(MICRO_SERVICE_URL_FORM, {
      params: {
        name: 'Hi!',
      },
    })

    const result = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${data.linkCss}
          <style>
            body{margin:0;}
          </style>
        </head>
        <body>
        ${data.html}
        ${data.linkJs}
        </body>
      </html>
  `

    res.status(200).send(result)
  } catch (err) {
    res.status(500).send('Page Not Ready')
  }
})

app.listen(devAppPort, () => {
  console.log(`> 🌏 http://localhost:${devAppPort} < app-example`)
})
