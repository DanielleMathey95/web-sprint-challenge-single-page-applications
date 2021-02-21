import React from 'react';
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Route>
        <Link to="/Pizza">
          <button name="order">Order Here!</button>
        </Link>
      </Route>
    </div>
  )
}

export default Home;