import { Component, type } from "can";
import shipmentEditStache from "./shipment-edit.stache";
import Shipment from "~/models/shipment";

const ShipmentEdit = Component.extend({
	tag: "shipment-edit",
	view: shipmentEditStache,
	ViewModel: {
		// Arguments
		shipment: type.maybe(Shipment),
		organizations: type.Any,

		// State
		shipmentName: type.check(String),
		shipmentOriginOrganizationId: type.convert(Number),
		onSaved: type.check(Function),

		// Methods
		save(event){
			event.preventDefault();

			this.shipment.assign({
				name: this.shipmentName,
				originOrganizationId: this.shipmentOriginOrganizationId
			});

			this.shipment.save( ()=> {
				this.onSaved();
			})
		}
	}
});

export default ShipmentEdit;
