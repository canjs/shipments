import { Component } from "can";
import loginStache from "./login.stache";

const PageLogin = Component.extend({
    tag: "page-login",
    view: loginStache,
    ViewModel: {
        isLoggedIn: "boolean",
        login: function(){
            this.isLoggedIn = true;
        }
    }
});

export default PageLogin;
