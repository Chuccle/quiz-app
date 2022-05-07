import React from 'react';
import PropTypes from 'prop-types';


export const ConditionalButtons = ({ maxRows, totalCount, currentPage, SetCurrentPage }) => {

  //may need totalCount and currentPage as args

  let pages

  //base case 
  if (totalCount <= maxRows) {

    return null

  }

  //if there is no remainder 

  else if (totalCount % maxRows === 0) {

    //-1 because we need to offset the fact that arrays start at 0

    pages = (totalCount / maxRows) - 1

  } else {

    //if there is a remainder treat it as a whole number

    pages = Math.trunc(totalCount / maxRows)
  }


  //first page 
  if (currentPage === 0) {

    return <button onClick={e => SetCurrentPage(currentPage + 1)}>Page +   page:{currentPage + 1} </button>;
  }

  //middle pages

  else if (currentPage < pages) {

    return <><button onClick={e => SetCurrentPage(currentPage + 1)}>Page + page:{currentPage + 1} </button><div />
      <button onClick={e => SetCurrentPage(currentPage - 1)}>Page - page:{currentPage - 1} </button></>

    //last page

  } else if (currentPage === pages) {

    return <button onClick={e => SetCurrentPage(currentPage - 1)}>Page - page:{currentPage - 1} </button>;

  }

}

ConditionalButtons.propTypes = {
  SetCurrentPage: PropTypes.func.isRequired
};
