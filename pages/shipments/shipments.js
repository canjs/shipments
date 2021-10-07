import { Component, type } from "can";
import shipmentsStache from "./shipments.stache";
import Shipment from "~/models/shipment";
import ShipmentEdit from "~/components/shipment-edit/";
import BitModal from "~/components/bit-modal/"

const formater = new Intl.DateTimeFormat('default', {
	year: 'numeric', month: 'numeric', day: 'numeric',
	hour: 'numeric', minute: 'numeric', second: 'numeric'
});

const PageShipments = Component.extend({
	tag: "page-shipments",
	view: shipmentsStache,
	ViewModel: {
		sort: "string",
		originOrganizationId: "string",
		get shipmentsPromise() {
			const query = {
				filter: {},
				include: ["destinationOrganization", "originOrganization"]
			};
			if(this.sort) {
				query.sort = this.sort;
			}
			if(this.originOrganizationId) {
				query.filter.originOrganizationId = this.originOrganizationId;
			}
			return Shipment.getList(query);
		},
		get organizationsPromise(){
			return Organization.findAll()
		},
		get originOrganizationsPromise(){
			return this.organizationsPromise.then( (orgs)=>{
				return orgs.filter( (org)=> org.isOrigin )
			})
		},
		formatDate(date) {
			return formater.format(date);
		}
	}

});

export default PageShipments;
