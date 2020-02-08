import React from 'react';
import './PersonDetailsView.css'


const PersonDetailsView = ({row}) => (
  <div className='row'>
    Выбран пользователь: <b>{row.username}</b>
    <br/>
    Фамилия: <b>{row.lastname}</b>
    <br/>
    email: <b>{row.email}</b>
  </div>
);

export default PersonDetailsView;