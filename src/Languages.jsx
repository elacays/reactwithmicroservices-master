import axios from "axios";
import { useEffect, useState } from "react"
import { AddLng } from "./AddLng"
import DataTable from 'react-data-table-component';
import { Button } from "bootstrap";
export default function Languages(props){

const[lngToUpdate,setLngToUpdate]=useState({id:0,name:'',code:''});
const[langList,setLangList]=useState();

useEffect(
    ()=>{setLangList(props.languages)}
    ,[props.languages]
)

const UpdateLng=(lng)=>{
    setLngToUpdate(lng);
}
const DeleteLang=(id)=>{
    axios.delete('http://localhost:44238/api/langs/'+id)
    .then(()=>{props.refreshData()})
}
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        		name: '',
        		button: true,
        		cell: (data) => <button onClick={()=>{UpdateLng(data)}}>Update</button>  ,
        	},
            {
        		name: '',
        		button: true,
        		cell: (data) => <button onClick={()=>{DeleteLang(data.id)}}>Sil</button>  ,
        	}
];

const filtrele=(event)=>{
    let searchKey=event.target.value;
    let filteredList=props.languages.filter(c=>c.name.includes(searchKey));
    setLangList(filteredList)
}
    
    return <div className='row'>
        <div className="row"><input onChange={filtrele} type="text"></input></div>
        <div className="row">
          <div className='col-md-6'>
            {
        <DataTable
            columns={columns}
            data={langList}
            selectableRows
            expandableRows
            expandableRowsComponent={ExpandedComponent}
        />
            }
          </div>
          </div>
          <div className="col-md-3">
          <AddLng refreshData={props.refreshData} lngToUpdate={lngToUpdate} />
          </div>
        </div>

}