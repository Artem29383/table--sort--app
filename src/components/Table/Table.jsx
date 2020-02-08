import React from 'react';
import './Table.css';

export default ({ data, onSort, sortType, sortField, onRowSelect }) => {
  let dataTable;
  if (data) {
    dataTable = data.map(item => (
      <tr key={item.id} className='subtitle' onClick={() => onRowSelect(item)}>
        <td className='subtitleItem'>{item.id}</td>
        <td className='subtitleItem'>{item.email}</td>
        <td className='subtitleItem'>{item.username}</td>
        <td className='subtitleItem'>{item.lastname}</td>
        <td className='subtitleItem'>{item.password}</td>
      </tr>
    ));
  } else {
    dataTable = <tr><td>Совпадений не найдено.</td></tr>
  }
  return (
    <table>
      <thead>
      <tr className='titleTable'>
        <th className='titleItem' onClick={() => onSort('id')}>
          id {sortField === 'id' && <small>{sortType === 'desc' ? '▲' : '▼'}</small>}
        </th>
        <th className='titleItem' onClick={() => onSort('email')}>
          email {sortField === 'email' && <small>{sortType === 'desc' ? '▲' : '▼'}</small>}
        </th>
        <th className='titleItem' onClick={() => onSort('username')}>
          username {sortField === 'username' && <small>{sortType === 'desc' ? '▲' : '▼'}</small>}
        </th>
        <th className='titleItem' onClick={() => onSort('lastname')}>
          lastName {sortField === 'lastname' && <small>{sortType === 'desc' ? '▲' : '▼'}</small>}
        </th>
        <th className='titleItem' onClick={() => onSort('password')}>
          password {sortField === 'password' && <small>{sortType === 'desc' ? '▲' : '▼'}</small>}
        </th>
      </tr>
      </thead>
      <tbody>
      {dataTable}
      </tbody>
    </table>
  )
}