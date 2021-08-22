import { Component, stacheRouteHelpers, type } from "can";
import Organization from "~/models/organization";
import organizationsStache from "./organizations.stache";
import "./organizations.css";
import "~/components/organization-edit/";


const PageOrganizations = Component.extend({
	tag: "page-organizations",
	view: organizationsStache,
	ViewModel: {
		sort: "string",
		egressFilter: "string",
		count: {type:"string", default: ""},
		organizationsPromise: {
			get(){
				var query = {filter: { }};
				if(this.sort) {
					query.sort =  this.sort;
				}
				if(this.egressFilter === "origins") {
					query.filter.isOrigin = true;
				} else if(this.egressFilter === "destinations") {
					query.filter.isDestination = true;
				}
				if(this.count) {
					query.page = {
						start: 0,
						end: (+this.count)-1
					};
				}
				return Organization.getList(query);
			}
		},
		_editingOrganization: type.maybe(Organization),
		isEditing(org){
			return org === this._editingOrganization;
		},
		edit(org){
			this._editingOrganization = org;
		},
		cancelEdit(){
			this._editingOrganization = null;
		}
	}
});

export default PageOrganizations;
