## Part 2

### Add sorting

#### What you need to do

1. Update your template to change a `sort` property with the following select:
   ```html
   <select>
   	<option value="">none</option>
   	<option value="name">name</option>
   	<option value="departureDate">departureDate</option>
   	<option value="arrivalDate">arrivalDate</option>
   </select>
	 ```
2. Add a string `sort` property to your ViewModel.
3. Update the `shipmentsPromise` getter to include a `sort` field in the query
   if the `this.sort` value is present.

   ```
	 {filter: { }, include: [...], sort: "departureDate"}
	 ```

## Part 3

Testing!


## Part 4

### Pull in related origin and destination organization

`models/fixtures/shipments.js` includes:

```js
if(include.includes("destinationOrganization")) {
	shipment.destinationOrganization = organizationsConnection.getRecord(shipment.destinationOrganizationId)
}
if(include.includes("originOrganization")) {
	shipment.originOrganization = organizationsConnection.getRecord(shipment.originOrganizationId)
}
```

#### What you need to do

1. Change your request to include this related data.
2. Update your template to show it.

#### Discussion

- What's the best way of loading relational data?
  - JSONApi?


### Add filtering by originOrganizationId

#### What you need to do


1. Create an `organizationsPromise` getter that returns a promise of all orgs.
2. Create a `originOrganizationsPromise` that returns just the orgs can can be an origin.
3. Update the viewModel to have a `originOrganizationId` filter.
4. Wire it up in the template!
