class RealmKernelController {
	constructor() {}
	enter_session(context, scope, parameters) {
		// use realm helper function here
	}
	exit_session(context, scope, parameters) {
		// use realm helper function here
	}
}

const CONTROLLER__REALM_KERNEL__CONTROLLER__ENVIRONMENT = new RealmKernelController();

export { CONTROLLER__REALM_KERNEL__CONTROLLER__ENVIRONMENT };
