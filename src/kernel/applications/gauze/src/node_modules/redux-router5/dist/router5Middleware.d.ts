import { Router } from 'router5';
declare const router5ReduxMiddleware: (router: Router<Record<string, any>>) => (store: any) => (next: any) => (action: any) => any;
export default router5ReduxMiddleware;
