import React from 'react'
import { BrowserRouter as Touter, Routes, Route } from "react-router-dom";
import Login from '../page/Auth/Login';
import Register from '../page/Auth/Register';
import DetailTicket from '../page/DetailTicket';
import { HomePaage } from '../page/HomePaage';
import { ListTicket } from '../page/ListTicket';
import { ListTicketPM } from '../page/ListTicketPM';
import { ListUserPM } from '../page/LIstUserPM';
import { ListUsers } from '../page/ListUsers';
import { MyTicket } from '../page/MyTicket';
import { UploadTicket } from '../page/UploadTicket';



const Container = () => {
  return (
    <Touter>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<HomePaage/>}/>
            <Route path='/ticket' element={<MyTicket/>}/>
            <Route path='/ticket/add' element={<UploadTicket/>}/>
            <Route path='/ticket/list' element={<ListTicket/>}/>
            <Route path='/User' element={<ListUserPM/>}/>
            <Route path='/User/list' element={<ListUsers/>}/>
            <Route path='/ticket/list/pm' element={<ListTicketPM/>}/>
            <Route path='/ticket/detail/:id' element={<DetailTicket/>} />
            
        </Routes>
    </Touter>
  )
}

export default Container

