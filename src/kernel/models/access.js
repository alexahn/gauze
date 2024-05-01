

// semantics:
// who is changing
// 	- all actions must ensure that the role hierarchy is honored
//		- all actions cannot affect access units that have a higher role than the initiator
//			- someone cannot read, update, or delete a record that has a role set higher than the initiator
//		- all modifications cannot effectively elevate the initiator's role
//			- create and update cannot set agent role to a higher role than the one who is initiating the change
// 		- by induction, terminal roles can only effectively read or delete their own record
// what is changing
//	- the units of change should be agent id, agent type, and agent role
//  - realm, entity id, entity type, and method (rename to entity method?) are locked
class AccessSystemModel {
	// grab all records for the current agent
	// sort by role
	// use highest role to commit to action
	_create() {

	}
	_read() {
	
	}
	_update() {
		
	}
	_delete() {

	}
}
