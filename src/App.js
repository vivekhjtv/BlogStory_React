import { Outlet } from 'react-router-dom';
import './App.css';
// import AdminDashBoard from './Components/Router/AdminDashBoard';

function App() {
  return (
    <>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default App;
