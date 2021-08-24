import { Component, type } from "can";
import shipmentEditStache from "./shipment-edit.stache";
import Shipment from "~/models/shipment";

const ShipmentEdit = Component.extend({
	tag: "shipment-edit",
	view: shipmentEditStache,
	ViewModel: {
		shipment: type.maybe(Shipment),
		onSaved: type.check(Function),
		save(event){
			event.preventDefault();

			this.shipment.assign({
				name: this.nameElement.value,
				isOrigin: this.isOriginFormValue,
				isDestination: this.isDestinationFormValue
			})
			this.shipment.save( ()=> {
				this.onSaved();
			})
		}
	}
});

export default ShipmentEdit;
