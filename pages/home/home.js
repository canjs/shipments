import { Component, stacheRouteHelpers } from "can";
import homeStache from "./home.stache";

const PageHome = Component.extend({
    tag: "page-home",
    view: homeStache,
    ViewModel: {}
});

export default PageHome;
