
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Provider } from 'react-redux';
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
    <ToastContainer />
    <App />
    </Provider>
  </>
)
