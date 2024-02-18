import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLoading } from './LoadingContext';
import { useError } from './ErrorContext';

export default function UserAdmin() {
    const [users, setUsers] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const { showError } = useError();

    useEffect(() => {

        getUsers();
        
    }, []);

    const getUsers = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "users/", {headers})
            .then((res) => {
                
                setUsers(res.data);
                
            });
    }

    const swapAdmin =  (event) => {
        
        const ally_code = event.target.dataset.allycode;
        const admin_access = event.target.dataset.admin;
        
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        
        let postObj = {};
        postObj.access = admin_access;
        axios
            .post(process.env.REACT_APP_API_URL + "users/" + ally_code, postObj, {headers})
            .then((res) => {
                
                setUsers(res.data);
                
            });

      }

      const addUser = () => {
        const ally_code = document.getElementById("user_admin_add_user").value;
        
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        
        let postObj = {};
        postObj.ally_code = ally_code;

        axios
            .put(process.env.REACT_APP_API_URL + "users", postObj, {headers})
            .then((res) => {
                
                setUsers(res.data);
                
            })
            .catch((error) => {
                showError(error.response.data.message)
            });
      }

      let refreshPlayerData = async (event) => {
        try {
            showLoading("Getting data from SWGOH.");
            const ally_code = event.target.dataset.allycode;
            //get data
            const token = localStorage.getItem('token');
            const data =  await (await fetch(process.env.REACT_APP_API_URL + "swgoh/player/" + ally_code + "/", 
                                            {
                                              method: 'GET',
                                              headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                              },
                                            })).json();
            if(data.length !== 0){
              hideLoading();
              getUsers();
            }
            
        } catch (err) {
          showError(err.message)
        }
      }

      const removeUser =  (event) => {
        const ally_code = event.target.dataset.allycode;
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .delete(process.env.REACT_APP_API_URL + "users/" + ally_code, {headers})
            .then((res) => {
                
                setUsers(res.data);
                
            });
      }

    return (
        <div className="p-3">
            <h3>User Admin</h3>
            <div>
                <input id="user_admin_add_user" type="text"></input><button className="btn btn-primary" onClick={addUser}>Add User</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Ally Code</th>
                        <th scope="col">Ally Name</th>
                        <th scope="col">Refresh Player</th>
                        <th scope="col">Make Admin</th>
                        <th scope="col">Remove Admin</th>
                        <th scope="col">Remove User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((row, index) => {
                        return (
                                <tr key={"user_admin_table_" + index}>
                                    <th scope="row">{row.ally_code}</th>
                                    <th>{row.ally_name}</th>
                                    <th><button data-allycode={row.ally_code} id={"user_admin_refresh_" + index}  className="btn btn-primary" onClick={refreshPlayerData}>Refresh Data</button></th>
                                    <td>{row.access === 0 ? <button data-allycode={row.ally_code} data-admin="1" id={"user_admin_promote_" + index} className="btn btn-primary" onClick={swapAdmin}>Make Admin</button> : "-"}</td>
                                    <td>{row.access === 1 ? <button data-allycode={row.ally_code} data-admin="0"  id={"user_admin_demote_" + index} className="btn btn-primary" onClick={swapAdmin}>Remove Admin</button>: "-"}</td>
                                    <td><button data-allycode={row.ally_code} id={"user_admin_r_" + index} className="btn btn-primary" onClick={removeUser}>Remove User</button></td>
                                </tr>
                        )
                    })} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}