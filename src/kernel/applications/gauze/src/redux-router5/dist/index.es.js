import { shouldUpdateNode } from 'router5-transition-path';

var NAVIGATE_TO = '@@router5/NAVIGATE';
var CANCEL_TRANSITION = '@@router5/CANCEL';
var TRANSITION_ERROR = '@@router5/TRANSITION_ERROR';
var TRANSITION_SUCCESS = '@@router5/TRANSITION_SUCCESS';
var TRANSITION_START = '@@router5/TRANSITION_START';
var CLEAR_ERRORS = '@@router5/CLEAR_ERRORS';
var CAN_DEACTIVATE = '@@router5/CAN_DEACTIVATE';
var CAN_ACTIVATE = '@@router5/CAN_ACTIVATE';

var actionTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NAVIGATE_TO: NAVIGATE_TO,
    CANCEL_TRANSITION: CANCEL_TRANSITION,
    TRANSITION_ERROR: TRANSITION_ERROR,
    TRANSITION_SUCCESS: TRANSITION_SUCCESS,
    TRANSITION_START: TRANSITION_START,
    CLEAR_ERRORS: CLEAR_ERRORS,
    CAN_DEACTIVATE: CAN_DEACTIVATE,
    CAN_ACTIVATE: CAN_ACTIVATE
});

function navigateTo(name, params, opts) {
    if (opts === void 0) { opts = {}; }
    return {
        type: NAVIGATE_TO,
        payload: {
            name: name,
            params: params,
            opts: opts
        }
    };
}
function cancelTransition() {
    return {
        type: CANCEL_TRANSITION
    };
}
function clearErrors() {
    return {
        type: CLEAR_ERRORS
    };
}
function transitionStart(route, previousRoute) {
    return {
        type: TRANSITION_START,
        payload: {
            route: route,
            previousRoute: previousRoute
        }
    };
}
function transitionSuccess(route, previousRoute) {
    return {
        type: TRANSITION_SUCCESS,
        payload: {
            route: route,
            previousRoute: previousRoute
        }
    };
}
function transitionError(route, previousRoute, transitionError) {
    return {
        type: TRANSITION_ERROR,
        payload: {
            route: route,
            previousRoute: previousRoute,
            transitionError: transitionError
        }
    };
}
function canActivate(name, canActivate) {
    return {
        type: CAN_ACTIVATE,
        payload: {
            name: name,
            canActivate: canActivate
        }
    };
}
function canDeactivate(name, canDeactivate) {
    return {
        type: CAN_DEACTIVATE,
        payload: {
            name: name,
            canDeactivate: canDeactivate
        }
    };
}

var actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    navigateTo: navigateTo,
    cancelTransition: cancelTransition,
    clearErrors: clearErrors,
    transitionStart: transitionStart,
    transitionSuccess: transitionSuccess,
    transitionError: transitionError,
    canActivate: canActivate,
    canDeactivate: canDeactivate
});

function reduxPluginFactory(dispatch) {
    return function () { return ({
        onTransitionStart: function (toState, fromState) {
            dispatch(transitionStart(toState, fromState));
        },
        onTransitionSuccess: function (toState, fromState) {
            dispatch(transitionSuccess(toState, fromState));
        },
        onTransitionError: function (toState, fromState, err) {
            dispatch(transitionError(toState, fromState, err));
        }
    }); };
}

var router5ReduxMiddleware = function (router) { return function (store) {
    var dispatch = store.dispatch;
    router.setDependency('store', store);
    router.usePlugin(reduxPluginFactory(dispatch));
    return function (next) { return function (action) {
        switch (action.type) {
            case NAVIGATE_TO:
                router.navigate(action.payload.name, action.payload.params, action.payload.opts);
                break;
            case CANCEL_TRANSITION:
                router.cancel();
                break;
            case CAN_DEACTIVATE:
                router.canDeactivate(action.payload.name, action.payload.canDeactivate);
                break;
            case CAN_ACTIVATE:
                router.canActivate(action.payload.name, action.payload.canDeactivate);
                break;
            default:
                return next(action);
        }
    }; };
}; };

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var initialState = {
    route: null,
    previousRoute: null,
    transitionRoute: null,
    transitionError: null
};
var router5Reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    if (!action.type) {
        return state;
    }
    switch (action.type) {
        case TRANSITION_START:
            return __assign(__assign({}, state), { transitionRoute: action.payload.route, transitionError: null });
        case TRANSITION_SUCCESS:
            return __assign(__assign({}, state), { transitionRoute: null, transitionError: null, previousRoute: action.payload.previousRoute, route: action.payload.route });
        case TRANSITION_ERROR:
            return __assign(__assign({}, state), { transitionRoute: action.payload.route, transitionError: action.payload.transitionError });
        case CLEAR_ERRORS:
            return __assign(__assign({}, state), { transitionRoute: null, transitionError: null });
        default:
            return state;
    }
};

function createRouteNodeSelector(routeNode, reducerKey) {
    if (reducerKey === void 0) { reducerKey = 'router'; }
    var routerStateSelector = function (state) {
        return state[reducerKey] || (state.get && state.get(reducerKey));
    };
    var lastReturnedValue;
    return function (state) {
        var _a = routerStateSelector(state), route = _a.route, previousRoute = _a.previousRoute;
        var shouldUpdate = !route
            ? true
            : shouldUpdateNode(routeNode)(route, previousRoute);
        if (!lastReturnedValue) {
            lastReturnedValue = { route: route, previousRoute: previousRoute };
        }
        else if (!previousRoute ||
            (previousRoute !== route && shouldUpdate)) {
            lastReturnedValue = { route: route, previousRoute: previousRoute };
        }
        return lastReturnedValue;
    };
}

export { actionTypes, actions, createRouteNodeSelector, reduxPluginFactory as reduxPlugin, router5ReduxMiddleware as router5Middleware, router5Reducer };
