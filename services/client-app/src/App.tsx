import './App.css';
import LoginPage from './pages/Login/Login.page';

const App = () => {
  return <LoginPage onSubmit={(values) => console.log(values)} />;
};

export default App;
