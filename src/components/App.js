import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import routesList from '@/routes.js';
import Card from '@/components/pages/Card';
import { fetchPosts } from '@/redux/actions';

import '@/style/App.css';

const App = () => {
  const posts = useSelector(state => state.blogPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const linksPosts = posts?.payload || [];

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          {routesList.map(page => {
            return (
              <Fragment key={`header-nav-link-${page.uid}`}>
                { page.showMain && 
                  <Link 
                    to={page.path}
                    className="link"
                  >
                    {page.name}
                  </Link>
                }
             </Fragment>
            ) 
          })}
        </nav>
      </header>
      <main className="container">
        <Switch>
          {routesList.map(page => {
            return (
              <Route
                key={`route-link-${page.uid}`}
                path={page.path}
                exact 
                component={page.component}
              />
            ) 
          })}
          {linksPosts.map(page => {
            return (
              <Route
                key={`link-route-${page.id}`}
                path={`/post/${page.id}`}
                render={() => <Card page={page} />}
              />
            )
          })}
          <Redirect to="/404" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
