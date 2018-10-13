import React from 'react';
//import PropTypes from 'prop-types';
//import { observer, inject } from 'mobx-react';

const InputSearchFilter = ({search}) => {

  return (
    <form id="searchForm" onSubmit={(e) => { e.preventDefault();}}>
      <input type="search" 
            className="form-control" 
            name="search"
            onChange={e => {search(e.target.value.length > 4 ? e.target.value : '')}} />
    </form>
  )
}


/* InputSearchFilter.propTypes = {
  search: PropTypes.func.isRequired
} */

export default InputSearchFilter;