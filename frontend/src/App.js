import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Profile from './containers/Profile';
import Layout from './hocs/Layout';
import Posts from './containers/Posts';
import { Provider } from 'react-redux';
import store from './store';
import PostContextProvider from './contexts/ForumContext';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
          <Layout>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/login' element={<Login/>} />
              <Route exact path='/signup' element={<Signup/>} />
              <Route exact path='/reset-password' element={<ResetPassword/>} />
              <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
              <Route exact path='/activate/:uid/:token' element={<Activate/>} />
              <Route exact path='/profile' element={<Profile/>} />
              <Route exact path='/forum' element={<PostContextProvider><Posts/></PostContextProvider>} />
            </Routes>
          </Layout>
      </Router>
    </Provider>
  );
}

export default App;
