

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Auth/Register'
import Header from './Auth/Header'
import Login from './Auth/Login'
import Dashboard from './Dashboard/Dashboard'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/" element={<Header />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
