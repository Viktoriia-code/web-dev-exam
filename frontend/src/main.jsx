import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthContextProvider from './context/AuthContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)