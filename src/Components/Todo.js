import im from './todo.png'
import React, { useState ,useEffect} from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
// import React, {  } from 'react';

import TodoTask from './Todo.js';

const Todo = () => {
    const [Task, setTask] = useState('');
    const [items,setItems] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertVisible, setAlertVisible] = useState(false);

   
    let [editedTask,setEditedTask] = useState("");
    
    useEffect(() => {
        if (isAlertVisible) {
          const timer = setTimeout(() => {
            setAlertVisible(false);
            setAlertMessage('');
          }, 3000);
    
          return () => clearTimeout(timer);
        }
      }, [isAlertVisible]);
    


    function AddTask(){
        // console.log(items);
        if(!Task){
            setTimeout(() => {
                //    alert('please enter your task...');
                setAlertMessage('Please enter your task...');
                setAlertVisible(true);
              }, 300);
         

        } else if(Task && !toggle){
            setItems(
                items.map((el)=>{
                    if(el.id === isEditItem){
                        return { ...el,name:Task}
                    }
                    return el;
                })
            )
            setToggle(true);

            setTask('');

            setIsEditItem(null);
              
        } else{
       const temp = {id:new Date().getTime().toString(),name:Task}
       setItems([...items,temp]);
       setTask('');
        }

    }
   

    const EditTask= (id) =>{
        let editItem = items.find((ele)=>{
            return ele.id === id;  });
            console.log(editItem);

            setToggle(false);

            setTask(editItem.name);

            setIsEditItem(id);
        
        
    }

    const DeleteTask= (idx) =>{
        const tempItem = items.filter((el)=>{
            return idx !== el.id;
        });
        setItems(tempItem);
    }

    return (
        <>
         
            <div className='main'>
            
                {isAlertVisible && (
                          <div className="alert">
                            {alertMessage}
                            </div>
                           )} 
                  <div className='container'>
                    <div className='sc1'>
                        <img src={im} className='image' alt="" />
                        <h1 className='font-semibold'>YOUR TASKS IS BELOW HERE</h1>
                    </div>

                    <div className="input-container">
                        <input type='text' placeholder='type your task...'className='input-field'
                            value={Task} onChange={(e) => setTask(e.target.value)}
                        />
                        {
                          toggle ?  <button className='add-task' title='add' onClick={AddTask}>Add</button> : 
                           <button className='add-task' title='Edit' onClick={AddTask}>Edit</button>
                        }
                          
                        
                        {/* <i className='fas fa-plus cursor-pointer mt-6 pr-4 add-btn'></i> */}

                    </div>

                    <div className="task-run">
                    {
                     items.map((el) => {

                        return (
                            <div className="sub-task-run" key={el.id}>
                            <p>{el.name}</p>
                            <div className='btn'>
                            <FontAwesomeIcon className='opBtn' onClick={()=>EditTask(el.id)} icon={faPenToSquare} style={{color: "#157347",}}/>
                            <FontAwesomeIcon className='opBtn' onClick={()=>DeleteTask(el.id)} icon={faTrash} style={{color: "#BB2D3B",}} />                
                   </div>
                   </div>
                        
                        
                        
                    )

                 
                        
                     })
                    }
                    {/* <FontAwesomeIcon icon={faTrash} style={{color: "red",backgroundColor:"yellow,"}}/> */}
                    {/* <FontAwesomeIcon icon={faPenToSquare} style={{color: "#4ad996",}} /> */}
                </div>

                </div>
            </div>
        </>
    );
}

export default Todo;

{/* <button className='opBtn' onClick={()=>EditTask(el.id)}><FontAwesomeIcon icon={faPenToSquare} style={{color: "red",backgroundColor:"yellow,"}}/></button> */}
