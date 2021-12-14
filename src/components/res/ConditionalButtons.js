import React, { useState } from 'react';
import { Button } from 'react-bootstrap';



export default function ConditionalButtons(maxRows, quizcount, currentpage) {

  //may need quizcount and currentpage as args

  let pages
  const [currentpage, SetCurrentPage] = useState(currentpage);


  //base case 
  if (quizcount / maxRows) {

    return null

  }
//if there is no remainder 

  else if (quizcount % maxRows === 0) {

    pages = (quizcount / maxRows) - 1

  } else {

    //if there is a remainder treat it as a whole number
    pages = Math.trunc(quizcount / maxRows)
  }


//first page 
  if (currentpage === 0) {

    return <Button onClick={e => (SetCurrentPage(currentpage + 1))}>Page +   page:{currentpage + 1} </Button> + currentpage
  }

  //middle pages
  else if (currentpage < pages) {

    return <><Button onClick={e => (SetCurrentPage(currentpage + 1))}>Page + page:{currentpage + 1} </Button><div />
      <Button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </Button></> + currentpage


//last page
  } else if (currentpage === pages) {

    return <Button onClick={e => (SetCurrentPage(currentpage - 1))}>Page - page:{currentpage - 1} </Button> + currentpage;

  }


}


