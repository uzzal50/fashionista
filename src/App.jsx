import React, { Suspense, lazy } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Women from './pages/Women/Women'
import Shop from './pages/Shop/Shop'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import LoginPage from './pages/Login/LoginPage'
import Register from './pages/Register/Register'
import Product from './pages/Product/Product'
import SkeletonFallback from './components/skeleton/SkeletonFallback'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import {
  Navbar,
  Footer,
  Subscribe,
  ViewCart,
  ModalOverlay,
  SkeletonCard,
  UserLoggedIn,
  MyProfile,
  MyOrder,
  MyWishlist,
} from './components'
import QuickViewModal from './components/T-shirt/QuickViewModal'
const Dashboard = lazy(() => import('./components/admin/Dashboard'))
const AddProducts = lazy(() => import('./components/admin/AddProducts'))
const Orders = lazy(() => import('./components/admin/Orders'))
const Products = lazy(() => import('./components/admin/Products'))
const AdminOnlyRoute = lazy(() => import('./components/admin/AdminOnlyRoute'))
const Men = lazy(() => import('./pages/Men/Men'))
const Admin = lazy(() => import('./pages/admin/Admin'))
const Cart = lazy(() => import('./pages/cart/Cart'))
const Checkout = lazy(() => import('./components/checkout/Checkout'))

const OrderSuccess = lazy(() => import('./components/Order/OrderSuccess'))
const ShoppingCart = lazy(() => import('./components/Cart/ShoppingCart'))
const Profile = lazy(() => import('./pages/Profile/Profile'))

import ReviewProduct from './pages/Reviews/ReviewProduct'
import OrderDetails from './components/admin/OrderDetails'
import TopMessage from './components/Message/TopMessage'
import SearchPage from './pages/SearchPage/SearchPage'

function App() {
  const { isModalOpen, searchModal } = useSelector(state => state.cartModal)
  const { quickView } = useSelector(state => state.cartModal)
  const { text, type } = useSelector(state => state.message)

  return (
    <>
      <Router>
        {createPortal(<TopMessage text={text} type={type} />, document.body)}
        {searchModal
          ? createPortal(
              <SearchPage />,
              document.getElementById('search-modal')
            )
          : null}
        <Navbar />
        <ViewCart />
        {isModalOpen && <ModalOverlay />}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route
            path='admin'
            element={
              <Suspense fallback={<SkeletonCard />}>
                <AdminOnlyRoute>
                  <Admin />
                </AdminOnlyRoute>
              </Suspense>
            }
          >
            <Route index element={<Dashboard />}></Route>
            <Route path='add-product' element={<AddProducts />} />
            <Route path='orders' element={<Orders />} />
            <Route path='order-details/:id' element={<OrderDetails />} />
            <Route path='products' element={<Products />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route
            path='men'
            element={
              <Suspense
                fallback={[1, 2, 3, 4].map(item => (
                  <SkeletonCard key={item} />
                ))}
              >
                <Men />
              </Suspense>
            }
          />
          <Route path='women' element={<Women />}></Route>
          <Route path='shop' element={<Shop />}></Route>
          <Route
            path='profile/my-orders/review-product/:id'
            element={<ReviewProduct />}
          />
          <Route
            path='profile'
            element={
              <Suspense fallback={<SkeletonFallback />}>
                <Profile />
              </Suspense>
            }
          >
            <Route path='my-wishlist' element={<MyWishlist />} />
            <Route path='my-order' element={<MyOrder />} />
            <Route path='my-profile' element={<MyProfile />} />
            <Route index element={<MyProfile />} />
          </Route>

          <Route path='/about' element={<Contact />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/product/:type/:id' element={<Product />}></Route>
          <Route path='login' element={<LoginPage />} />

          <Route path='register' element={<Register />}></Route>
          <Route
            path='cart'
            element={
              <Suspense fallback={<SkeletonCard />}>
                <Cart />
              </Suspense>
            }
          >
            <Route index element={<ShoppingCart />}></Route>
            <Route
              path='checkout'
              element={
                <UserLoggedIn>
                  <Checkout />
                </UserLoggedIn>
              }
            ></Route>
            <Route
              path='order-success'
              element={
                <Suspense fallback={<SkeletonCard />}>
                  <OrderSuccess />
                </Suspense>
              }
            ></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Route>
        </Routes>
        <Subscribe />
        <Footer />

        {quickView ? <QuickViewModal /> : null}
      </Router>
    </>
  )
}

export default App
