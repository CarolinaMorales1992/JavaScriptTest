import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import axios from 'axios';


const App = () => {
  
  let id;
  let h = 0; 
  let m = 0;
  let s = 0; 
  let hAux = 0;
  let mAux = 0;
  let sAux = 0;

      
  const start = () => {
      print();
      id = setInterval(print,1000);
  }
  const print = () => {

      s++;
      if (s>59){m++;s=0;}
      if (m>59){h++;m=0;}
      if (h>24){h=0;}
  
      if (s<10){sAux="0"+s;}else{sAux=s;}
      if (m<10){mAux="0"+m;}else{mAux=m;}
      if (h<10){hAux="0"+h;}else{hAux=h;}
  
      document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
  }
  const stop = () => {

  clearInterval(id);

  axios.post('http://localhost:3000/save-time'
    , {
    time: hAux + ':' + mAux + ':' + sAux,
    
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
  }
  const reset = () => {
      clearInterval(id);
      document.getElementById("hms").innerHTML="00:00:00";
      h=0;m=0;s=0;
  }


  return (
      <Grid container direction="row" justifyContent="center" alignItems="center">
		      <div id="hms">00:00:00</div>
		        <div>
			        <Button variant="contained" color="primary" onClick={start} >START</Button>
              <Button variant="contained" color="primary" onClick={stop} >STOP</Button>
              <Button variant="contained" color="primary" onClick={reset} >RESET</Button>
		        </div>
        </Grid>
  );
}


export default App;


