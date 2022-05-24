import React,{useState, useEffect} from "react";
import axios from "axios";
export function AddLng(props){

    

    console.log("addlng");
    const [eklenecekLng,setEklenecekLng]=useState({id:0,code:'',name:''});
    
    useEffect(()=>{
        setEklenecekLng(props.lngToUpdate);
    },[props.lngToUpdate])

    
    const  postData=()=>{
     
        if(eklenecekLng.id)
        {
          axios.put('http://localhost:44238/api/langs/'+eklenecekLng.id,eklenecekLng)
        .then(()=>{props.refreshData()});
        }
        else
        {
        axios.post('http://localhost:44238/api/langs',eklenecekLng)
        .then(()=>{props.refreshData()});
        }

   setEklenecekLng({id:0,code:'',name:''});
      }
    

    const setEkelencekVal=(event)=>{
        
        setEklenecekLng(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
       
    }

    return(<div className='row'>
    <div className='col-md-6'>
      <div className='form-group'>
        id:<input className='form-control' name='id' onChange={setEkelencekVal} type='text' value={eklenecekLng.id} />
      </div>
      <div className='form-group'>
        code:<input className='form-control' name='code' onChange={setEkelencekVal} type='text' value={eklenecekLng.code} />
      </div>
      <div className='form-group'>
        name:<input className='form-control' name='name' onChange={setEkelencekVal} type='text' value={eklenecekLng.name} />
      </div>
      <button onClick={postData}>KAydet</button>
    </div>
  </div>)
}