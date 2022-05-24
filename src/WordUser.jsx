import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WordUser() {
    const [user, setUser] = useState({ id: 0, userName: '', password: '' })
    const [userList, setUserList] = useState([{ id: 0, userName: '', password: '' }])
    const [userReflesh, setUserReflesh] = useState(false);

    const setEkelencekVal = (event) => {

        setUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))

    }
    const getUser = () => {
        axios.get('http://localhost:46634/api/User/')
            .then((res) => setUserList(res.data));
    }
    const userAdd = () => {
        axios.post('http://localhost:46634/api/User/', user)
            .then(() => { getUser() });
        setUserReflesh(!userReflesh)
    }
    const userDelete = (id) => {
        axios.delete('http://localhost:46634/api/User/' + id)
            .then(() => { getUser() });
        setUserReflesh(!userReflesh)
    }
    const userUpdate = (id) => {
        axios.put('http://localhost:46634/api/User/' + id, setUser).then(() => {
            user(setUser)
        })
    }
    useEffect(() => {
        getUser()
    }, [userReflesh])


    return (<div >
        {
            userList.map((usr) => {
                return <div key={usr.id}>{usr.id}||{usr.userName}||{usr.password}|| <button onClick={() => userDelete(usr.id)}>sil</button> <button onClick={() => userUpdate(usr.id)}>update</button></div>
            })
        }

        <div className='col-md-6'>
            <div className='form-group'>
                username:<input className='form-control' name='userName' type='text' value={user.userName} onChange={setEkelencekVal} />
            </div>
            <div className='form-group'>
                password:<input className='form-control' name='password' type='text' value={user.password} onChange={setEkelencekVal} />
            </div>
            <button onClick={userAdd} >Kaydet</button>
        </div>
    </div>
    );
}


