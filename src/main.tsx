import React from 'react'
import ReactDOM from 'react-dom/client'
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

const Rank = React.lazy(() => import('./views/rank/Rank'))
const Record = React.lazy(() => import('./views/record/Record'))
const Collection = React.lazy(() => import('./views/collection/Collection'))
const PlayList = React.lazy(() => import('./views/play-list/PlayList'))

const history = createBrowserHistory({ window })

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
ReactDOM
  .createRoot(rootElement)
  .render(
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
    </React.StrictMode>
  )

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <HistoryRouter basename={import.meta.env.BASE_URL} history={history}>
//         <Routes>
//           <Route path="/" element={<PrivateRoute component={App} />}>
//             <Route path="" element={<PrivateRoute component={Rank} />} />
//             <Route path="record" element={<PrivateRoute component={Record} needAuth={true} path="record" />} />
//             <Route path="collection" element={<PrivateRoute component={Collection} needAuth={true} path="collection" />} />
//             <Route path="play-list" element={<PrivateRoute component={PlayList} />} />
//           </Route>
//         </Routes>
//       </HistoryRouter>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
