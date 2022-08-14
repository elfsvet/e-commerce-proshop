import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            {/* we will make id optional by putting ? after id and it doesn't work in react v6 so we will use longer solution */}
            {/*
              
              Route path /cart/:id? become in v6 two options: 
              
              <Route path="/cart/:id" element={<CartPage />} />
              <Route path="/cart/" element={<CartPage />} />
              or
              <Route path="/cart">
              <Route index element={<CartPage />} />
              <Route path=":id" element={<CartPage />} />
              </Route>
              
            */}

            <Route path='/cart'>
              <Route path=':id' element={<CartScreen />} />
              <Route path='' element={<CartScreen />} />
            </Route>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
