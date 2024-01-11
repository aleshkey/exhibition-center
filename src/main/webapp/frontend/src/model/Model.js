import {convertToNormalCase, GetJson} from "../util/Util";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import React from "react";
import Menu from "../util/Menu";

export default class Model{

    _jsonURL = "http://localhost:8080";
    
    _startURL = 'http://localhost:3000'

    _helpURL;

    history = useHistory();

    handleCellClick = (to) => {
        this.history.push(to);
    };

    name='';

    createOrUpdatePage= (url) =>{}

    singlePage = () => {
        let helpItem = []
        for(let i = 0; i <this._helpURL.length; i++){
            helpItem.push(GetJson(this._helpURL[i]));
        }
        let root = ReactDOM.createRoot(document.getElementById('root'));
        let data = GetJson(this._jsonURL+window.location.pathname);
        const headers = Object.keys(data);
        this.history = useHistory();
        if (headers.length !== 0){
            let elem = (
                <div>
                    <Menu/>
                    <div className={'content'}>
                        <table>
                            <tbody>
                            {
                                headers.map(header => {
                                    if(typeof data[header]!==typeof data && header !== 'id' && typeof data[header]!== 'boolean'){
                                        return (
                                            <tr>
                                                <th>{convertToNormalCase(header)}</th>
                                                <td>{data[header]}</td>
                                            </tr>
                                        )
                                    }
                                    if(typeof data[header] === typeof data){
                                        if(Array.isArray(data[header])){
                                            return (
                                                <tr>
                                                    <th>{convertToNormalCase(header)}</th>
                                                    <td>
                                                        <table>
                                                            {data[header].map(item => {
                                                                return (<tr><td className={'link-cell'} onClick={()=>
                                                                {
                                                                    this.handleCellClick(`${this._startURL}/${header}/`+item.id)
                                                                    window.location.href = `${this._startURL}/${header}/`+item.id
                                                                }}>{item.name}</td></tr>)
                                                            })}
                                                        </table>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        else {
                                            if(data[header]!==null)
                                                return(
                                                    <tr>
                                                        <th>{convertToNormalCase(header)}</th>
                                                        <td className={'link-cell'} onClick={()=>{
                                                            this.handleCellClick(`${this._startURL}/${header}s/`+data[header].id)
                                                            window.location.href = `${this._startURL}/${header}s/`+data[header].id}
                                                        }>
                                                            {data[header].name}
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    }
                                })
                            }
                            </tbody>
                        </table>

                        <div className={'button-row'}>
                            <button onClick={() => {
                                let str = window.location.pathname;
                                window.location.href = str.replace(/\/([^\/]*)\/(.*)/, "/$1");
                            }}>BACK
                            </button>
                            <button onClick={() => {
                                this.createOrUpdatePage(this._jsonURL+window.location.pathname, data, helpItem)
                            }}>UPDATE
                            </button>
                            <button onClick={() => {
                                fetch(this._jsonURL+window.location.pathname+ '/delete', {
                                    method: 'POST'
                                })
                                let str = window.location.pathname;
                                window.location.href = str.replace(/\/([^\/]*)\/(.*)/, "/$1");
                            }}>DELETE
                            </button>
                        </div>
                    </div>
                </div>
            )
            root.render(elem);
        }
    }

    homePage = (uri, helpURL) => {
        this.history = useHistory();
        let path = window.location.pathname;
        let helpItem = []
        for(let i = 0; i <this._helpURL.length; i++){
            helpItem.push(GetJson(this._helpURL[i]));
        }
        let data = GetJson(this._jsonURL + path);
        let root = ReactDOM.createRoot(document.getElementById('root'));
        if (typeof data.map == "function" && data.at(0) !== undefined) {
            let fields=[];
            const renderTableHeader = () => {
                const header = Object.keys(data[0]);
                return header.map((key, index) => {
                    if(typeof data[0][key] !== typeof data && key!=='id' && typeof data[0][key] !== 'boolean') {
                        fields.push(key);
                        return <th key={index}>{convertToNormalCase(key)}</th>;
                    }
                });
            };

            const renderTableData = () => {
                return data.map(item =>{
                    return (
                       <tr className={'link-cell'}>{
                           fields.map(column =>{
                               return (
                                   <td onClick={()=>{
                                       this.handleCellClick(this._startURL + path + item.id);
                                       window.location.href = `${path}/${item.id}`}
                                   }>
                                   <a>{item[column]}</a>
                                   </td>
                               )
                           })
                       }</tr>
                   )
                });
            }

            let elem =(
                <Router>
                    <React.StrictMode>
                        <Menu/>
                        <div className={"content"}>
                            <table className="full-page-table">
                                <thead>
                                    <tr>
                                        {renderTableHeader()}
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableData()}
                                </tbody>
                            </table>

                            <div className={'button-row'}>
                                <button className='for-delete' onClick={() => {
                                    this.createOrUpdatePage(this._jsonURL + path, undefined, helpItem);
                                }}>CREATE
                                </button>
                                <button className='for-delete' onClick={() => {
                                    window.location.href = `/`
                                }}>BACK
                                </button>
                            </div>

                            <Switch>
                                <Route path={`/${uri}/:id`} component={this.singlePage}/>
                            </Switch>
                        </div>
                    </React.StrictMode>
                </Router>
            );
            root.render(elem);
        }
    }
}