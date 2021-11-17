import { Button } from 'react-bootstrap';
export default function ConditionalButtons(maxRows, quizcount, currentpage, SetCurrentPage) {

  //may need quizcount and currentpage as args

  let pages



  //base case 
  if (quizcount / maxRows) {

    return null

  }

  else if (quizcount % maxRows === 0) {

    pages = (quizcount / maxRows) - 1

  } else {

    pages = Math.trunc(quizcount / maxRows)
  }



  if (currentpage === 0) {

    return <Button onClick={e => SetCurrentPage(currentpage + 1)}>Page +   page:{currentpage + 1} </Button>;
  }

  else if (currentpage < pages) {

    return <><Button onClick={e => SetCurrentPage(currentpage + 1)}>Page + page:{currentpage + 1} </Button><div />
      <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button></>

  } else if (currentpage === pages) {

    return <Button onClick={e => SetCurrentPage(currentpage - 1)}>Page - page:{currentpage - 1} </Button>;

  }


}


