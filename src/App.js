import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TaskOne from './task-one.js'
import TaskTwo from './task-two.js'
import TaskThree from './task-three.js'
import BonusTask from './bonus-task.js'

function App() {

  const [taskStatus, setSaskStatus] = React.useState(1);
  const [resetCollection, setResetCollection] = React.useState(false);

	const changeResetCollection = () =>{
		localStorage.removeItem("collection");
		setResetCollection(true)
		setTimeout(()=>{ setResetCollection(false) }, 100)
	};

  const changeTask = (e, result) => {
    setSaskStatus(result);
  };

  return (
    <div className="App"> 
    <h2 id="fileHeader" className="page-title" style={{textAlign: 'center'}}> ABC Company </h2>
       <div className="tasks-btn">
	      <ButtonGroup color="primary" aria-label="outlined primary button group">
	        <Button onClick={(e)=>changeTask(e, 1)} className={taskStatus===1? 'active':''} >Task 1</Button>
	        <Button onClick={(e)=>changeTask(e, 2)} className={taskStatus===2? 'active':''} >Task 2</Button>
	        <Button onClick={(e)=>changeTask(e, 3)} className={taskStatus===3? 'active':''}  >Task 3</Button>
	        <Button onClick={(e)=>changeTask(e, 4)} className={taskStatus===4? 'active':''}  >Bonus task</Button>
	        <Button onClick={()=>changeResetCollection()} >Reset Collection</Button>
	      </ButtonGroup>
       </div>
      {
      	taskStatus === 1? (<TaskOne changeTask={changeTask} />) 
      	: taskStatus === 2?(<TaskTwo changeTask={changeTask} isResetCollection={resetCollection} />) 
      	: taskStatus === 3? (<TaskThree changeTask={changeTask} isResetCollection={resetCollection} />) 
      	:(<BonusTask changeTask={changeTask} isResetCollection={resetCollection} />)
      }

    </div>
  );
}

export default App;
