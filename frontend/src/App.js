import Header from './components/Header';
import Preload from './components/Preload';
import Form from './components/Form';
import Blog from './components/Blog';
import PostDetail from './components/PostDetail';
import AddPost from './components/AddPost';
import { BrowserRouter,Link } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  
 
  
  return (
    <div id='container'>
    <BrowserRouter>
    <Header  />
    <Routes>
    <Route path='/' element={
      <Preload />
    }></Route>
    <Route path='/form' element={
      <Form type="register"  />
    }></Route>
    <Route path='/login' element={
      <Form type="login" />
    }></Route>
    <Route path='/blog' element={
      <Blog />
    }></Route>
    <Route path='/blog/:id' element={
      <PostDetail  />
    }></Route>
    <Route path='/admin' element={
      <Form  type="admin"/>
    }></Route>
    <Route path='/admin/add-post' element={
      <AddPost type="add"/>
    }></Route>
    <Route path='/blog/:id/edit' element={<AddPost type="edit"/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </div>
  
  );
}

export default App;
