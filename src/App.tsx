import './App.css'
import { Routes, Route } from 'react-router-dom'
import Root from './routes/root'
import { AuthContextProvider } from './context/AuthContext'
import Account from './routes/account'

function App() {
  return (
    <>
      {/* <AuthContextProvider> */}
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      {/* </AuthContextProvider> */}
    </>
  )
}

export default App
