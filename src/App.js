import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';
import orderBy from 'lodash.orderby';
import PersonDetailsView from './components/PersonDetailsView/PersonDetailsView';
import ModeSelector from './components/ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import { chunks } from './utils/arraysOfChunk';
import TableSearch from './components/TableSearch/TableSearch';

const App = () => {
  const pageSize = 50;
  const [mode, setMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('asc');//desc
  const [sortField, setSortField] = useState('id');
  const [row, setRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState('');
  
  const getDataFetch = async () => {
    setIsLoading(true);
    const response = await fetch(`http://www.filltext.com/?rows=${mode}&id={index}&email={email}&lastname={lastName}&username={username}&password={randomString|5}&pretty=true`);
    const data = await response.json();
    setData(data);
    setDisplayData(chunks(data, pageSize));
    setIsLoading(false);
  };
  
  
  const onSort = sortCol => {
    /*const cloneData = [...data];
    const sortType = sort === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy(cloneData, sortCol, sortType);
    setData(sortedData);
    setSort(sortType);
    setSortField(sortCol);*/
    const cloneData = [...displayData];
    const sortType = sort === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy(cloneData[currentPage], sortCol, sortType);
    cloneData[currentPage] = [...cloneData[currentPage] = sortedData];
    setDisplayData(cloneData);
    setSort(sortType);
    setSortField(sortCol); //Активная сортировка сортирует конкретную таблицу (та часть что в коммента сортирует всю
    // таблицу целиком
  };
  
  const pageChangeHandler = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const onRowSelect = item => {
    setRow(item);
  };
  
  useEffect(() => {
    getDataFetch();
  }, [mode]);
  
  useEffect(() => {
    const filteredData = data.filter(item => {
      return item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase())
    });
    setDisplayData(chunks(filteredData, pageSize));
  }, [search]);
  
  /*useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
      setDisplayData(chunks(data, pageSize));
    }
  }, [data]);*/ // данная часть относится к сортировке таблицы целиком
  
  const onSearch = (e, value) => {
    if (e.key === 'Enter') {
      setSearch(value);
      setCurrentPage(0);
    }
  };
  
  if (!mode) {
    return (
      <div className='container'>
        <ModeSelector setMode={setMode} />
      </div>
    )
  }
  
  return (
    <div className="container">
      {!isLoading
        ? <Fragment>
          <TableSearch onSearch={onSearch} />
          <Table
            data={displayData[currentPage]}
            onSort={onSort}
            sortType={sort}
            sortField={sortField}
            onRowSelect={onRowSelect}
          />
        </Fragment>
        : <Loader />}
      
      {(data.length > pageSize && displayData.length !==0) &&
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={displayData.length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={currentPage}
      />}
      
      {row && <PersonDetailsView row={row} />}
    </div>
  );
};

export default App;
