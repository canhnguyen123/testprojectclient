import logo from './logo.svg';
import './App.css';
import Main from './component/main';
import Header from './component/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Header/>
     <Main/>
    </div>
  );
}

export default App;
