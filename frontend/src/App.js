import React, {Fragment} from 'react';
import {Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Profile from './containers/Profile/Profile';
import Layout from './hocs/Layout';
import Posts from './containers/Posts';
import PostContextProvider from './contexts/ForumContext';
import CreatePost from './containers/Post/CreatePost';
import './App.css';
import PostDetail from './containers/Post/PostDetail';
import EditPost from './containers/Post/EditPost';
import Verify from './containers/Verify';

function App({isAuthenticated}) {
  return (
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
        <Route exact path="/forum/view/:slug/" element={<PostDetail />} />
        <Route exact path="/forum/create-new-post" element={<CreatePost />} />
        <Route exact path="/verify" element={<Verify />} />
        <Route exact path="/forum/:slug/edit" element={<EditPost />} />
        {isAuthenticated ? 
        <Fragment>
          <Route exact path='/profile' element={<Profile/>} />
          <Route exact path="/forum/create-new-post" element={<CreatePost />} />
          <Route exact path="/forum/:slug/edit" element={<EditPost />} />
        </Fragment>
        : null}
      </Routes>
    </Layout>
  );
}

// export default App;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);
