import { Component, type } from "can";
import shipmentsStache from "./shipments.stache";
import Shipment from "~/models/shipment";
import ShipmentEdit from "~/components/shipment-edit/";
import BitModal from "~/components/bit-modal/"
import "./shipments.css";


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
		},
		_editingShipment: type.maybe(Shipment),
		isEditing(shipment){
			return shipment === this._editingShipment;
		},
		edit(shipment){
			this._editingShipment = shipment;
		},
		cancelEdit(){
			this._editingShipment = null;
		},

		connectedCallback(){
			let shipmentEdit;
			this.listenTo("_editingShipment", ({value}) => {
				if(value) {
					document.body.style.backgroundColor = "#add8e6";
					shipmentEdit = new ShipmentEdit({
						viewModel: {
							shipment,
							organizations,
							onSaved: ()=> {
								console.log("Saved!")
							}
						}
					})
					BitModal.add(shipmentEdit)
				} else {
					document.body.style.backgroundColor = "";
					BitModal.remove(shipmentEdit);
					shipmentEdit = null;
				}
			})

			return ()=> {
				document.body.style.backgroundColor = "";
				BitModal.remove()
			}
		}
	}

});

export default PageShipments;
