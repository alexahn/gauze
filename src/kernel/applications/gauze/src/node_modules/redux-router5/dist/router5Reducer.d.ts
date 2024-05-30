import { State } from 'router5';
import { Reducer } from 'redux';
interface Router5ReducerState {
    route: State | null;
    previousRoute: State | null;
    transitionRoute: State | null;
    transitionError: any | null;
}
declare const router5Reducer: Reducer<Router5ReducerState>;
export default router5Reducer;
