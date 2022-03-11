import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Missing = () => {

  /*
  * TODO: needs some styling 
  */

  const navigate = useNavigate(); 

  // Will take the user back to the page they
  // came from 
  const goback = () => {
    navigate(-1); 
  }

  return(
    <div>
      Error 404.
      <Button
      onClick={goback}
      >
        Go Back
      </Button>
      
    </div>

  );
};

export default Missing; 