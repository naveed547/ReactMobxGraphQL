import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ onClick, activePage, numPage }) => {
  let paginationComp = [];
  for (let i = 0; i < numPage.length; i++) {
      paginationComp.push(
        <li className={activePage === (i+1) ? 'active page-item': 'page-item'} key={i+1}>
          <a className="page-link" onClick={(e) => {e.preventDefault();onClick(i+1)}}>{i+1}</a>
        </li>
      );
  }
  return numPage.length > 1 && paginationComp.length ? 
      (<ul className="pagination justify-content-center mt-5">{paginationComp}</ul>):'';
}

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  numPage: PropTypes.array.isRequired
}

export default Pagination