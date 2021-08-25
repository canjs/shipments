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

		// this is needed for filtering
		allShipmentsPromise: {
			default() {
				return Shipment.getList({include: ["destinationOrganization","originOrganization"]});
			}
		},
		shipmentsPromise: {
			get(){
				let requestingEverything = true;
				var query = {filter: { }, include: ["destinationOrganization","originOrganization"]};
				if(this.sort) {
					requestingEverything = false;
					query.sort =  this.sort;
				}
				if(this.originOrganizationId) {
					requestingEverything = false;
					query.filter.originOrganizationId = parseInt( this.originOrganizationId, 10);
				}
				if(requestingEverything) {
					return this.allShipmentsPromise;
				} else {
					return Shipment.getList(query);
				}

			}
		},
		organizations: {
			value({listenTo, resolve, stopListening}){
				this.allShipmentsPromise.then((shipments) => {

					const destinations = shipments.map( shipment => shipment.destinationOrganization );
					const origins = shipments.map( shipment => shipment.originOrganization );
					
					resolve({
						destinations: Array.from( new Set(destinations) ),
						origins: Array.from( new Set(origins) ),
					});
				});
			}
		},
		formatDate(date) {
			return formater.format(date);
		},
		_editingShipment: type.maybe(Shipment),
		isEditing(org){
			return org === this._editingShipment;
		},
		edit(shipment){
			this._editingShipment = shipment;
		},
		cancelEdit(){
			this._editingShipment = null;
		},
		get editShipmentComponent(){
			if(this._editingShipment) {
				return new ShipmentEdit({
					viewModel: {
						shipment: this._editingShipment,
						organizations: this.organizations,
						onSaved: this.cancelEdit.bind(this),
						onCancelled: this.cancelEdit.bind(this)
					}
				})
			}
		},
		connectedCallback(){
			this.listenTo("editShipmentComponent", ({value, oldValue})=> {
				if(oldValue) {
					BitModal.remove(oldValue);
				}
				if(value) {
					BitModal.add(value);
				}
			});
		}
	}
});

export default PageShipments;
