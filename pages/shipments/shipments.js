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
		get shipmentsPromise() {
			const query = {};
			if(this.sort) {
				query.sort = this.sort;
			}
			return Shipment.getList(query);
		},
		formatDate(date) {
			return formater.format(date);
		}
	}

});

export default PageShipments;
