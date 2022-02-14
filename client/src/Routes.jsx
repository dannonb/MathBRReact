import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom'

const Routes = () => {
  return (
      <>
          <Route path="/" exact render={() => (isAuth() === false ?
                <>
                    <Navbar />
                    <Landing />
                </>
                : <Redirect to='/' />)} />
            <Route path="/auth" exact render={() => (isAuth() === false ?
                <>
                    <Navbar />
                    <Auth />
                </>
                : <Redirect to="/profile/dashboard" />)} />
            <ProtectedRoute path="/game" exact component={UserProfile} />
            <ProtectedRoute path="/custom-settings" exact component={UserDashboard} />
            <ProtectedRoute path="/profile" exact component={UserDashboard} />
      </>
  );
};

export default Routes;
