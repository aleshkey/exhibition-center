import Model from "./Model";
import ReactDOM from "react-dom/client";
import {GetJson} from "../util/Util";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import Menu from "../util/Menu";

export default class Author extends Model{
    name = 'AUTHORS'

    _helpURL = ['http://localhost:8080/authors'];

    createOrUpdatePage= (url, data) =>{
        const router = ReactDOM.createRoot(document.getElementById('root'));
        console.log(typeof data);
        let elem =
            (<div>
                <Menu/>
                <div className={'content'}>
                    <form className={'form-inline'}>
                        <p><label htmlFor={'name'}>Name: </label>
                        <input type="text" name='name' placeholder={'name'} defaultValue={data === undefined ? '' : data.name}></input></p>
                        <p><label htmlFor={'placeOfBirth'}>Place Of Birth: </label>
                        <input type="text" name='placeOfBirth' placeholder={'place of birth'} defaultValue={data === undefined ? '' : data.placeOfBirth}></input></p>
                        <p><label htmlFor={'education'}>Education: </label>
                        <input type="text" name='education' placeholder={'education'} defaultValue={data === undefined ? '' : data.education}></input></p>
                        <p><label htmlFor={'biography'}>Biography: </label>
                        <input type="text" name='biography' placeholder={'biography'} defaultValue={data === undefined ? '' : data.biography}></input></p>
                        <div className={'button-row'}>
                            <button onClick={() => {window.location.reload()}}>BACK</button>
                            <button onClick={() => {
                                let name = document.getElementsByName("name");
                                let placeOfBirth = document.getElementsByName("placeOfBirth");
                                let education = document.getElementsByName("education");
                                let biography = document.getElementsByName("biography");
                                fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        name: name[0].value,
                                        placeOfBirth: placeOfBirth[0].value,
                                        education: education[0].value,
                                        biography: biography[0].value
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