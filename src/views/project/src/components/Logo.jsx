import * as React from "react";

function Logo({ header, clouds }) {
	const classG = clouds ? "clouds bgx6 br2 cx2" : "bgx6 br2 cx2";
	const classA = clouds ? "clouds bgx7 br2 cx4" : "bgx7 br2 cx4";
	const classU = clouds ? "clouds bgx10 br2 cx6" : "bgx10 br2 cx6";
	const classZ = clouds ? "clouds bgx2 br2 cx7" : "bgx2 br2 cx7";
	const classE = clouds ? "clouds bgx4 br2 cx10" : "bgx4 br2 cx10";
	if (header) {
		return (
			<h1 className="athelas f1" align="center">
				<div className="flex" align="center">
					<div className={classG}>G</div>
					<div className={classA}>A</div>
					<div className={classU}>U</div>
					<div className={classZ}>Z</div>
					<div className={classE}>E</div>
				</div>
			</h1>
		)
	} else {
		return (
			<div className="athelas f1 b" align="center">
				<div className="flex" align="center">
					<div className={classG}>G</div>
					<div className={classA}>A</div>
					<div className={classU}>U</div>
					<div className={classZ}>Z</div>
					<div className={classE}>E</div>
				</div>
			</div>
		)
	}
}

export default Logo;
