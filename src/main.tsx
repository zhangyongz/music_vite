import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
// import reportWebVitals from './reportWebVitals'
import {
  // BrowserRouter,
  // Router,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRoute } from '@/components/PrivateRoute'
import Record from './views/record/Record'
import Collection from './views/collection/Collection'
import PlayList from './views/play-list/PlayList'
import Rank from './views/rank/Rank'

// ReactDOM
//   .createRoot(document.getElementById('root'))
//   .render(
//     <React.StrictMode>
//     <App />
//   </React.StrictMode>
//   )

const history = createBrowserHistory({ window })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter basename={import.meta.env.BASE_URL} history={history}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={App} />}>
            <Route path="" element={<PrivateRoute component={Rank} />} />
            <Route path="record" element={<PrivateRoute component={Record} needAuth={true} path="record" />} />
            <Route path="collection" element={<PrivateRoute component={Collection} needAuth={true} path="collection" />} />
            <Route path="play-list" element={<PrivateRoute component={PlayList} />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
