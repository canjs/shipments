import { Component, type } from "can";
import shipmentEditStache from "./shipment-edit.stache";
import Shipment from "~/models/shipment";

const ShipmentEdit = Component.extend({
	tag: "shipment-edit",
	view: shipmentEditStache,
	ViewModel: {
		shipment: type.maybe(Shipment),
		shipmentName: type.check(String),
		onSaved: type.check(Function),
		organizations: type.Any,
		save(event){
			event.preventDefault();
			this.shipment.save( ()=> {
				this.onSaved();
			})
		}
	}
});

export default ShipmentEdit;
