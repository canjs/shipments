import { Component, stacheRouteHelpers } from "can";
import shipmentsStache from "./shipments.stache";
import Shipment from "~/models/shipment";

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
		shipmentsPromise: {
			get(){
				var query = {filter: { }, include: ["destinationOrganization","originOrganization"]};
				if(this.sort) {
					query.sort =  this.sort;
				}
				if(this.originOrganizationId) {

					query.filter.originOrganizationId = parseInt( this.originOrganizationId, 10);
				}
				/*if(this.egressFilter === "origins") {
					query.filter.isOrigin = true;
				} else if(this.egressFilter === "destinations") {
					query.filter.isDestination = true;
				}
				if(this.count) {
					query.page = {
						start: 0,
						end: (+this.count)-1
					};
				}*/
				return Shipment.getList(query);
			}
		},
		organizations: {
			value({listenTo, resolve}){
				// we only want the first shipmentsPromise
				function handleShipmentsPromise(shipmentsPromise){
					shipmentsPromise.then((shipments) => {

						const destinations = shipments.map( shipment => shipment.destinationOrganization );
						const origins = shipments.map( shipment => shipment.originOrganization );

						resolve({
							destinations: Array.from( new Set(destinations) ),
							origins: Array.from( new Set(origins) ),
						});
					});
				}
				if(this.shipmentsPromise)  {
					handleShipmentsPromise(this.shipmentsPromise);
				} else {
					listenTo("shipmentsPromise", (shipmentsPromise)=> {
						handleShipmentsPromise(shipmentsPromise);
						stopListening("shipmentsPromise");
					})
				}


			}
		},
		formatDate(date) {
			return formater.format(date);
		}
	}
});

export default PageShipments;
