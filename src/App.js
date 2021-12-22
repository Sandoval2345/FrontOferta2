import './App.css';
import OfertaAcademica from '../src/pages/OfertaAcademica'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home'

import { AuthProvider } from './context'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ForgotPassword } from './pages';
import { PrivateRoute } from './components'




function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/**los PrivateRoute son rutas a las que se debe entrar logeados */}
          <PrivateRoute path= '/'exact component={Home}/>
          <PrivateRoute path= '/OfertaAcademica' component={OfertaAcademica}/>
          {/*<PrivateRoute path= '/Salas' component =  {Salas}/>*/}
          <Route path= '/login' component = {Login}/>
          <Route path='/signup' component={SignUp}/>
          <Route path = '/forgotpassword' component = {ForgotPassword}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

