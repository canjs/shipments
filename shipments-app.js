import { Component, DefineMap, route, stacheRouteHelpers, value } from "can";
import {mockOrganizationsService} from "~/models/fixtures/organizations";
mockOrganizationsService();

import {mockShipmentsService} from "~/models/fixtures/shipments";
mockShipmentsService();

Component.extend({
    tag: "shipments-app",
    view: `
        {{# if(componentToShow.isResolved) }}
            {{componentToShow.value}}
        {{/ if }}
    `,
    ViewModel: {
        routeData: {
            default() {
                const observableRouteData = new DefineMap();
                route.data = observableRouteData;
                route.register("{page}", { page: "home" });
                route.start();
                return observableRouteData;
            }
        },
        get componentToShow(){
            if(!this.isLoggedIn) {
                return steal.import("shipments-app/pages/login/login")
                    .then((module) => {
                        return new module.default({
                            viewModel: {
                                isLoggedIn: value.bind(this, "isLoggedIn")
                            }
                        });
                    });
            }

            return steal.import(`shipments-app/pages/${this.routeData.page}/${this.routeData.page}`)
                .then((module) => {
                    switch(this.routeData.page) {
                        case "home":
                            return new module.default({
                                viewModel: {
                                    logout: this.logout.bind(this)
                                }
                            });
                        case "organizations":
						case "shipments":
                            return new module.default({
                                viewModel: {
                                    logout: this.logout.bind(this)
                                }
                            });
                        default:
                            var page404 = document.createElement("h2");
                            page404.innerHTML = "Page Missing";
                            return page404;
                    }
                });
        },
        isLoggedIn: { default: false, type: "boolean" },
        logout() {
            this.isLoggedIn = false;
        }
    }
});
