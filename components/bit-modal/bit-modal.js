import { Component, type, DefineList } from "can";
import "./bit-modal.css";

const BitModal = Component.extend({
	add(component){
		this.singletonElement.viewModel.components.push(component)
	},
	remove(component){
		const index = this.singletonElement.viewModel.components.indexOf(component);
		if(index >= 0) {
			this.singletonElement.viewModel.components.splice(index, 1);
		}
	}
},{
	tag: "bit-modal",
	view: `
		{{# for( componentData of this.componentsToShow)}}
			{{# if(componentData.last)}}
				<div class='background' on:click="this.removeLastComponent()"></div>
			{{/ if}}
			<div class='modal-container'
				style="margin-top: {{componentData.position}}px; margin-left: {{componentData.position}}px">
				{{componentData.component}}
			</div>
		{{/ for}}
	`,
	ViewModel: {
		components: {Default: DefineList, type: [Component]},
		get componentToShow() {
			return this.components[0];
		},
		get componentsToShow() {
			var distance = 20;
			var count = this.components.length;
			var start = -150 - (distance / 2) * (count - 1);

			return this.components.map(function(component, i) {
				return {
					position: start + i * distance,
					component: component,
					last: i === count - 1
				}
			});
		},
		removeLastComponent(){
			this.components.pop();
		}
	}
});

BitModal.singletonElement = document.createElement("bit-modal")
document.body.append( BitModal.singletonElement );

export default BitModal;
