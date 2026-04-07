import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import { Router }from './Router.jsx'

createRoot(document.getElementById('root')).render(
    <Router />
)
