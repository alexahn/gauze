import { useDispatch, useSelector } from "react-redux"

export default function Route() {
	const route = useSelector((state) => {
		return state.router.route
	})
	const view = useSelector((state) => {
		return state.view
	})
	return (<view.layout sections={view.sections} units={view.units} />)
}
