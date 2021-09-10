import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
      <>
        <ToastContainer autoClose={3000} position="top-right"/>
        <GlobalStyles/>
        <Home/>
      
      </>
  );
}

export default App;
