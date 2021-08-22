import { Component, type } from "can";
import organizationEditStache from "./organization-edit.stache";
import Organization from "~/models/organization";

const OrganizationEdit = Component.extend({
	tag: "organization-edit",
	view: organizationEditStache,
	ViewModel: {
		organization: type.maybe(Organization),
		nameElement: type.check(HTMLElement),
		isOriginFormValue: type.check(Boolean),
		isDestinationFormValue: type.check(Boolean),
		onSaved: type.check(Function),
		save(event){
			event.preventDefault();

			this.organization.assign({
				name: this.nameElement.value,
				isOrigin: this.isOriginFormValue,
				isDestination: this.isDestinationFormValue
			})
			this.organization.save( ()=> {
				this.onSaved();
			})
		}
	}
});

export default OrganizationEdit;
