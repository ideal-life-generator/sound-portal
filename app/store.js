import { createStore } from "redux"
import rootReducer from "reducers/rootReducer"

const initialState = { }

export default createStore(rootReducer, initialState)