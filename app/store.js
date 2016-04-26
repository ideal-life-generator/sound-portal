import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import createLogger from 'redux-logger'
import reducers from "reducers"

const logger = createLogger()

const middlewares = applyMiddleware(thunk, logger)

export default createStore(
  reducers,
  middlewares
)