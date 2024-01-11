import Model from "./Model";
import ReactDOM from "react-dom/client";
import {GetJson} from "../util/Util";
import React from "react";
import Menu from "../util/Menu";

export default class Image extends Model{
    name = 'IMAGES'

    _helpURL = ['http://localhost:8080/authors'];

    createOrUpdatePage= (url, data, helpItem) =>{
        const router = ReactDOM.createRoot(document.getElementById('root'));
        let elem =
            (<div>
                <Menu/>
                <div className={'content'}>
                    <form className={'form-inline'}>
                        <p><label htmlFor={'name'}>Name: </label>
                        <input type="text" id='name' placeholder={'name'} defaultValue={data === undefined ? '' : data.name}></input></p>
                        <p><label htmlFor={'execution'}>Execution: </label>
                            <input type="text" id='execution' placeholder={'execution'} defaultValue={data === undefined ? '' : data.execution}></input></p>
                        <p><label htmlFor={'creationDate'}>Creation date: </label>
                            <input type="date" id='creationDate' placeholder={'creation date'} defaultValue={data === undefined ? '' : data.creationDate}></input></p>
                        <p>
                            <label htmlFor="author-select">Choose an author: </label>
                            <select name="author" id="author-select">
                                {helpItem[0] && helpItem[0].map(item =>{
                                    return <option value={item.name}>  {item.name}</option>
                                })}
                            </select>
                        </p>
                        <button onClick={() => {window.location.reload()}}>BACK</button>
                        <button onClick={() => {
                            let name = document.getElementById("name");
                            let execution = document.getElementById("execution");
                            let creationDate = document.getElementById("creationDate");
                            let author = document.getElementById("author-select");
                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name: name.value,
                                    execution: execution.value,
                                    creationDate: creationDate.value,
                                    author: author.value,
                                })
                            })
                            window.location.reload()
                        }
                        }>SAVE</button>
                    </form>
                </div>
            </div>);
        router.render(elem);
    }

}