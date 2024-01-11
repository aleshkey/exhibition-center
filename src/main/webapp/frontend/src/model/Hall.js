import ReactDOM from "react-dom/client";
import React from "react";
import {GetJson} from "../util/Util";
import Model from "./Model";
import '../styles/styles.css'
import Menu from "../util/Menu";

export default class Hall extends Model{
    name = 'HALLS'

    _helpURL = ['http://localhost:8080/owners', 'http://localhost:8080/exhibitions'];

    createOrUpdatePage= (url, data, helpItem) =>{
        const router = ReactDOM.createRoot(document.getElementById('root'));
        let elem =
            (<div>
                <Menu/>
                <div className={'content'}>
                        <form className={'form-inline'}>
                            <p><label htmlFor={'name'}>Name: </label>
                                <input type="text" name='name' placeholder={'name'} defaultValue={data !== undefined ? data.name : ''}></input></p>
                            <p><label htmlFor={'address'}>Address: </label>
                                <input type="text" name='address' placeholder={'address'} defaultValue={data !== undefined ? data.address : ''}></input></p>
                            <p><label htmlFor={'square'}>Square: </label>
                                <input type="text" name='square' placeholder={'square'} defaultValue={data !== undefined ? data.square : ''}></input></p>
                            <p>
                                <label htmlFor="owners-select">Choose an owner: </label>
                                <select name="owners" id="owners-select">
                                    {helpItem[0] && helpItem[0].map(item =>{
                                        return <option value={item.name}>  {item.name}</option>
                                    })}
                                </select>
                            </p>
                            {helpItem[1] !== undefined ?
                            <p>
                                <label htmlFor="exhibitions-select">Choose an exhibition: </label>
                                <select name="exhibitions" id="exhibitions-select">
                                    <option value='null'> ----------</option>
                                    {helpItem[1] && helpItem[1].map(item =>{
                                        console.log(item)
                                        if(item.free) {
                                            return <option value={item.name}>  {item.name}</option>
                                        }
                                    })}
                                </select>
                        </p> : ''}
                        <div className={'button-row'}>
                            <button onClick={() => {window.location.reload()}}>BACK</button>
                            <button onClick={() => {
                                let name = document.getElementsByName("name");
                                let address = document.getElementsByName("address");
                                let square = document.getElementsByName("square");
                                let owner = document.getElementById("owners-select");
                                let exhibition = document.getElementById("exhibitions-select");
                                fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        name: name[0].value,
                                        address: address[0].value,
                                        square: square[0].value,
                                        owner: owner.value,
                                        exhibition: exhibition !== 'null' ? exhibition.value : ''
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