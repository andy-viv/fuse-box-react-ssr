import express from 'express'
import bodyParser from 'body-parser'
import config from '../src/config'

const app = express()
app.use(bodyParser.json())

const router = express.Router()
router.route('/info').get((req, res) => res.json({message: 'Api is running'}))
app.use(router)

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err)
    }
    console.log(`API is running on port ${config.apiPort}`)
  })
} else {
  console.error('==> ERROR: No PORT environment variable has been specified')
}
