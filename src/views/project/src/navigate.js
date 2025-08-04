function navigate(url, options) {
	const { replace, push } = options;
	if (push) {
		// use pushstate api
	} else {
		if (replace) {
			location.replace(url);
		} else {
			location.href = url;
		}
	}
}

export default navigate;
