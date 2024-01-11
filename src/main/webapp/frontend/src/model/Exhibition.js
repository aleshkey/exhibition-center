import Model from "./Model";
import ReactDOM from "react-dom/client";
import {GetJson} from "../util/Util";
import React from "react";
import Menu from "../util/Menu";

export default class Exhibition extends Model{
    name = 'EXHIBITIONS'

    _helpURL = ['http://localhost:8080/images'];

    createOrUpdatePage= (url, data, helpItem) =>{
        const router = ReactDOM.createRoot(document.getElementById('root'));
        console.log(helpItem);
        let elem =
            (
                <div>
                    <Menu/>
                    <div className={'content'}>
                        <form className={'form-inline'}>
                            <p><label htmlFor={'name'}>Name: </label>
                            <input type="text" id='name' placeholder={'name'} defaultValue={data === undefined ? '' : data.name}></input></p>
                            <p><label htmlFor={'name'}>Type: </label>
                            <input type="text" id='type' placeholder={'type'} defaultValue={data === undefined ? '' : data.type}></input></p>
                            <p><label htmlFor={'name'}>Date: </label>
                            <input type="date" id='date' placeholder={'date'} defaultValue={data === undefined ? '' : data.date}></input></p>
                            <p>
                                <label htmlFor="author-select">Choose an image: </label>
                                <select name="image" id="image-select" multiple>
                                    {helpItem[0] && helpItem[0].map(item =>{
                                        return <option value={item.name}>Image : {item.name}, author :{item.author.name}</option>
                                    })}
                                </select>
                            </p>
                            <div className={'button-row'}>
                                <button onClick={() => {window.location.reload()}}>BACK</button>
                                <button onClick={() => {
                                    let name = document.getElementById("name");
                                    let type = document.getElementById("type");
                                    let date = document.getElementById("date");
                                    const selectElement = document.querySelector('select');
                                    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name: name.value,
                                            type: type.value,
                                            date: date.value,
                                            images: selectedOptions
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