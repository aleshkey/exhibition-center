import Model from "./Model";
import {GetJson} from "../util/Util";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import Menu from "../util/Menu";

export default class Owner extends Model{
    name = 'OWNERS'

    _helpURL = ['http://localhost:8080/owners'];

    createOrUpdatePage= (url, data) =>{
        const router = ReactDOM.createRoot(document.getElementById('root'));
        let elem =
            (<div>
                <Menu/>
                <div className={'content'}>
                    <form className={'form-inline'}>
                        <p><label htmlFor={'name'}>Name: </label>
                        <input type="text" name='name' placeholder={'name'} defaultValue={data === undefined ? '' : data.name}></input></p>
                        <p><label htmlFor={'name'}>Address: </label>
                            <input type="text" name='address' placeholder={'address'} defaultValue={data === undefined ? '' : data.address}></input></p>
                        <p><label htmlFor={'name'}>Phone Number: </label>
                            <input type="text" name='phoneNumber' placeholder={'phone number'} defaultValue={data === undefined ? '' : data.phoneNumber}></input></p>
                        <div className={'button-row'}>
                                <button onClick={() => {window.location.reload()}}>BACK</button>
                                <button onClick={() => {
                                    let name = document.getElementsByName("name");
                                    let address = document.getElementsByName("address");
                                    let phoneNumber = document.getElementsByName("phoneNumber");
                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name: name[0].value,
                                            address: address[0].value,
                                            phoneNumber: phoneNumber[0].value
                                        })
                                    })
                                    window.location.reload()}
                                }>SAVE</button>
                            </div>
                    </form>
                </div>
            </div>);
        router.render(elem);
    }
}