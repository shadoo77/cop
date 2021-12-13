import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { CouponProvider } from '../contexts/couponContext';
import AppBar from './basics/AppBar';
import Home from './Home';

const WrongPage = (): JSX.Element => (
  <div className="wrong-page">
    <h2>Error 404: Wrong page!</h2>
  </div>
);

function MainApp() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="main-app">
        <AppBar />
        <div className="main-app-container">
          <Switch>
            <CouponProvider>
              <Route path="/" component={Home} exact />
            </CouponProvider>
            <Route path="/404" exact component={WrongPage} />
            <Route component={WrongPage} />
          </Switch>
        </div>
      </div>
    </StyledEngineProvider>
  );
}

export default withRouter(MainApp);
