import './App.css';
import {useEffect, useState} from 'react'
import {BsPlusCircleFill,BsFillTrashFill} from 'react-icons/bs'

function App() {

  const GetLocalStorage = () =>{
    const list = JSON.parse(localStorage.getItem('Tasks')) 
    if(list){
      return list
    }else{
      return [];
    }
  }

  const [taskname, settaskname] = useState("");
  const [task, settask] = useState(GetLocalStorage());

  const addItems =(e) =>{
    if(taskname){
      settask([...task, taskname]);
      settaskname('')
    }else{
      alert("Please Enter the task name")
    }
  }

  const HandleDelete =(id)=>{
    const updateData = task.filter((val,ind)=>{
      return ind !== id
    });
    settask(updateData)
  }

  useEffect(() => {
    localStorage.setItem('Tasks',JSON.stringify(task))
  }, [task])

  return (
   <div className="main-div">
     <h2>New Task</h2>
     <div className="addItems">
       <input type="text" name="name" placeholder="Enter Your Task ✍️.."
        value={taskname} onChange={(e)=> settaskname(e.target.value)}/>
        <i title="Add Task" className="add"><BsPlusCircleFill onClick={addItems} /></i>
        
     </div>
      <div className="showItems">
      <h2 style={{marginTop:"10px",marginBottom:"5px"}}>Pending Task</h2>
        <h4 >
          {
            task.map((val,key)=>{
              return(
                <div key={key} className="tasks">
                  {val}
                  <i title="Delete Task" onClick={()=>HandleDelete(key)} style={{color:"#f62323",marginLeft:"5px"}} className="deleteiocns"><BsFillTrashFill/></i>
                </div>
              )
            })
          }
        </h4>
      </div>
      <div className="RemoveAll">
          <button onClick={()=>settask([])}>Clear ALL</button>
      </div>
   </div>
  );
}

export default App;
