import * as React from "react";

import ErrorPage from "./Error.jsx";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			errorInfo: null,
			resetKey: props.resetKey,
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (props.resetKey === state.resetKey) {
			return null;
		} else {
			return {
				error: null,
				errorInfo: null,
				resetKey: props.resetKey,
			};
		}
	}
	static getDerivedStateFromError(error) {
		return {
			error,
		};
	}
	componentDidCatch(error, errorInfo) {
		const { onError } = this.props;
		this.setState({
			errorInfo,
		});
		if (onError) {
			onError(error, errorInfo);
		} else {
			console.error(error, errorInfo);
		}
	}
	render() {
		const { children, pathfinder } = this.props;
		const { error, errorInfo } = this.state;
		if (error) {
			return <ErrorPage error={error} errorInfo={errorInfo} pathfinder={pathfinder} source="Render error" />;
		} else {
			return children;
		}
	}
}

export default ErrorBoundary;
