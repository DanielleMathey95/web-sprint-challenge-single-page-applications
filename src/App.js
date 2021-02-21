import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import PizzaBuilder from "./Components/Form";
import Home from "./Components/Home";
import {Body, Title} from './Components/Styles';

const App = () => {
  return (
    <Body>
      <Title>Lambda Eats!</Title>
        <Link to="/">
          <button>Home</button>
        </Link>
        <button>Contact</button>
        <Switch>
          <Route path="/Pizza" component={PizzaBuilder} />
          <Route path="/" component={Home} />
        </Switch>
    </Body>
  );
};
export default App;
