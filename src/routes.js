import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

export const renderRoutes = (routes = []) => (
  <Suspense maxDuration={3000} fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={<Component />}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/',
    component: lazy(() => import('./views/Home'))
  },
  {
    exact: true,
    path: '/subreddit/:srName',
    component: lazy(() => import('./views/SubReddit'))
  }
];

export default routes;
