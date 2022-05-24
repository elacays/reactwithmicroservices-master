import axios from "axios";
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component';

export default function Word(props)
{
    const[words,setWords]=useState();
    const[eklenecekWord,setEklenecekWord]=useState({id:0,wordDef:'',lngId:0,meanings:[]})
    const[eklenecekMeaning,seteklenecekMeaning]=useState({id:0,meaning:'',lngId:0})
    const[change,setChange]=useState(true);
    const setVals=(event)=>{
        setEklenecekWord(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const setmeaningVals=(event)=>{
        seteklenecekMeaning(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const AddMeaning=()=>{
        eklenecekWord.meanings.push(eklenecekMeaning);
        setEklenecekWord(eklenecekWord);
        setChange(!change);

    }
    const SaveWord=()=>{
        console.log(eklenecekWord);
        axios.post('http://localhost:32722/api/WordApi',eklenecekWord)
        .then(()=>{
            refreshWords()
        })
    }

    const refreshWords=()=>{
        axios.get('http://localhost:32722/api/WordApi')
        //.then((res)=> { return res.json()})
        .then((res)=>setWords(res.data));
    }
    useEffect(
        refreshWords,
        []
        )


const columns = [ {
    name: 'Id',
    selector: row => row.id,
    sortable: true,
},
{
    name: 'Word',
    selector: row => row.wordDef,
    sortable: true,
},
{
    name: 'Language',
    selector: row => row.lngId,
    sortable: true,
    cell: (data) => <span>{props.languages.filter(c=>c.id===data.lngId)[0].name}</span>
},
]
// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data.meanings, null, 2)}</pre>;
const ExpandedComponent = ({ data }) => {
    const detColumns=[ {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Meaning',
        selector: row => row.meaning,
        sortable: true,
    },
    {
        name: 'Language',
        selector: row => row.langId,
        sortable: true,
    },
] 
return <DataTable 
columns={detColumns}
data={data.meanings}

/>

};

    return <div className="row">
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    id:<input name='id' onChange={setVals} value={eklenecekWord.id} readonly type='text' className="form-control" />
                </div>
                <div className="form-group">
                    word:<input name='wordDef'  onChange={setVals} value={eklenecekWord.wordDef} type='text' className="form-control" />
                </div>
                <div className="form-group">
                    Lang:<select name='lngId'  onChange={setVals} value={eklenecekWord.langId} className="form-control">
                        <option value={0}>seçiniz</option>
                        { 
                       props.languages.map((lng)=>{
                           return  <option value={lng.id}>{lng.name}</option>
                       })
                        }
                        </select>
                </div>
                <div><button onClick={SaveWord} >Kaydet</button></div>
            </div>
            <div className="col-md-3"> 
            <div className="form-group">
                id:<input type='text' name='id' onChange={setmeaningVals} className="form-control" value={eklenecekMeaning.id} />
            </div>
            <div className="form-group">
                meaning:<input type='text' onChange={setmeaningVals} name='meaning' className="form-control" value={eklenecekMeaning.meaning} />
            </div>
            <div className="form-group">
                    Lang:<select name='lngId'  onChange={setmeaningVals} value={eklenecekMeaning.langId} className="form-control">
                        <option value={0}>seçiniz</option>
                       { 
                       props.languages.map((lng)=>{
                           return  <option value={lng.id}>{lng.name}</option>
                       })
                        }
                       
                        </select>
                </div>
                <div><button onClick={AddMeaning}>Ekle</button></div>
            </div>
            <div className="col-md-3">
                {eklenecekWord.meanings.map((mm)=>{
                        return <div>{mm.id}||{mm.meaning}||{mm.langId}</div>
                })}
            </div>
        </div>
        <div className="row">
<div className="col-md-8">
    <DataTable
            columns={columns}
            data={words}
            selectableRows
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            
        />
        </div>
        </div>
    </div>
}