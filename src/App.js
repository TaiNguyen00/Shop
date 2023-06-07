import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import DetailProduct from './Components/DetailProduct';
import 'react-loading-skeleton/dist/skeleton.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Products from './Components/products';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={DetailProduct} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
