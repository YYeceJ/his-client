import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router,Switch,Route} from "react-router-dom";

import logo from "../assets/logo.png";
import style from "./style.scss";
import App from "../components/App";
import Result from "../containers/result/Result";
import Home from "../containers/home/Home";
function render() {
    return ReactDOM.render(
        <App>
            <section className={style.wrapper}>
                <p>hello</p>
                <img src={logo} className={style.logo}/>
            </section>
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/result" component={Result}/>
                </Switch>
            </Router>
        </App>,
        document.getElementById("rootElement")
    )
}

render();

if (module.hot){
    // 如果APP文件变了,更新渲染
    module.hot.accept(["../components/App"],render);
    module.hot.accept(() => window.location.reload(true));
}