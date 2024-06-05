import React from "react";
import { useState } from "react";

export default function Axolotl({ sections, units }) {
	const id = "layout:axalotl";
	const [theme, setTheme] = useState(0);

	function handleNext(e) {
		setTheme((theme + 1) % 4);
	}
	function renderTheme(theme) {
		switch (theme) {
			case 0:
				return (
					<div className="wrapper w-100 h-100">
						<div className="one bgx1" />
						<div className="two bgx2" />
						<div className="three bgx3" />
						<div className="four bgx4" />
						<div className="five bgx5" />
						<div className="six bgx6" />
						<div className="seven bgx7" />
						<div className="eight bgx8" />
						<div className="nine bgx9" />
						<div className="ten bgx10" />
						<div className="eleven bgx11" />
						<div className="twelve bgx12" />
						<div className="small-window-1 cx7 athelas br4 pa2 f4">
							<div className="ba bw1 bgx11 bdx11 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="w-100 br2 ba bw1 bgx12 bdx12 cx1" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgx8 bdx8 cx6">Submit</button>
									<button className="br-pill ba bw1 bgx6 bdx6 cx8">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 cx6 athelas br4 f4 pa2">
							<div className="ba bw1 bgx8 bdx8 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyz7 athelas br4 f4 pa2">
							<div className="ba bw1 bdxyz7 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 cx6 athelas br4 f4 pa2">
							<div className="ba bw1 bgx4 bdx4 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 cx3 athelas br4 f4 pa2">
							<div className="ba bw1 bdx2 bgx2 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
					</div>
				);
			case 1:
				return (
					<div className="wrapper w-100 h-100">
						<div className="one bgy1" />
						<div className="two bgy2" />
						<div className="three bgy3" />
						<div className="four bgy4" />
						<div className="five bgy5" />
						<div className="six bgy6" />
						<div className="seven bgy7" />
						<div className="eight bgy8" />
						<div className="nine bgy9" />
						<div className="ten bgy10" />
						<div className="eleven bgy11" />
						<div className="twelve bgy12" />
						<div className="small-window-1 cy7 athelas br4 pa2 f4">
							<div className="ba bw1 bgy11 bdy11 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="w-100 br2 ba bw1 bgy12 bdy12 cy1" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgy8 bdy8 cy6">Submit</button>
									<button className="br-pill ba bw1 bgy6 bdy6 cy8">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 cy6 athelas br4 f4 pa2">
							<div className="ba bw1 bgy8 bdy8 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyz7 athelas br4 f4 pa2">
							<div className="ba bw1 bdxyz7 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 cy6 athelas br4 f4 pa2">
							<div className="ba bw1 bgy4 bdy4 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 cy3 athelas br4 f4 pa2">
							<div className="ba bw1 bdy2 bgy2 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
					</div>
				);
			case 2:
				return (
					<div className="wrapper w-100 h-100">
						<div className="one bgz1" />
						<div className="two bgz2" />
						<div className="three bgz3" />
						<div className="four bgz4" />
						<div className="five bgz5" />
						<div className="six bgz6" />
						<div className="seven bgz7" />
						<div className="eight bgz8" />
						<div className="nine bgz9" />
						<div className="ten bgz10" />
						<div className="eleven bgz11" />
						<div className="twelve bgz12" />
						<div className="small-window-1 cz7 athelas br4 pa2 f4">
							<div className="ba bw1 bgz11 bdz11 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="w-100 br2 ba bw1 bgz12 bdz12 cz1" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgz8 bdz8 cz6">Submit</button>
									<button className="br-pill ba bw1 bgz6 bdz6 cz8">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 cz6 athelas br4 f4 pa2">
							<div className="ba bw1 bgz8 bdz8 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyz7 athelas br4 f4 pa2">
							<div className="ba bw1 bdxyz7 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 cz6 athelas br4 f4 pa2">
							<div className="ba bw1 bgz4 bdz4 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 cz3 athelas br4 f4 pa2">
							<div className="ba bw1 bdz2 bgz2 pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="wrapper w-100 h-100 bgxb bdxb">
						{/*
                        <div className="one bgxa" />
                        <div className="two bgxb" />
                        <div className="three bgxc" />
                        <div className="four bgxd" />
                        <div className="five bgxe" />
                        <div className="six bgxf" />
                        <div className="seven bgxg" />
                        <div className="eight bgxh" />
                        <div className="nine bgxi" />
                        <div className="ten bgxj" />
                        <div className="eleven bgxk" />
                        <div className="twelve bgxl" />
						*/}
						<div className="small-window-1 cx7 athelas br4 pa2 f4">
							<div className="ba bw1 bgx11 bdx11 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="ba bw1 bgx8 bdx8 pa2 br4 cx6">
									<div>
										MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
										veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
										laborum.
									</div>
								</div>
								{/*
								<div className="ba bw1 bgyk bdyk pa2 br4">
									<div className="ba bw1 bgzk bdzk pa2 br4">
										<div className="ba bw1 bgxyzg bdxyzg pa2 br4">
										</div>
									</div>
								</div>
								*/}
							</div>
						</div>
						<div className="small-window-2 cx6 athelas br4 pa2 f4">
							<div className="ba bw1 bgx8 bdx8 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="ba bw1 bgx6 bdx6 pa2 br4 cxyz7">
									<div>
										MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
										veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
										laborum.
									</div>
								</div>
								{/*
								<div className="ba bw1 bgyk bdyk pa2 br4">
									<div className="ba bw1 bgzk bdzk pa2 br4">
										<div className="ba bw1 bgxyzg bdxyzg pa2 br4">
										</div>
									</div>
								</div>
								*/}
							</div>
						</div>
						<div className="small-window-3 cxyz7 athelas br4 pa2 f4">
							<div className="ba bw1 bgx6 bdx6 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="ba bw1 bgx4 bdx4 pa2 br4 cx6">
									<div>
										MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
										veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
										laborum.
									</div>
								</div>
								{/*
								<div className="ba bw1 bgyk bdyk pa2 br4">
									<div className="ba bw1 bgzk bdzk pa2 br4">
										<div className="ba bw1 bgxyzg bdxyzg pa2 br4">
										</div>
									</div>
								</div>
								*/}
							</div>
						</div>
						<div className="small-window-4 cx6 athelas br4 pa2 f4">
							<div className="ba bw1 bgx4 bdx4 pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="ba bw1 bgx11 bdx11 pa2 br4 cx7">
									<div>
										MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
										veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
										laborum.
									</div>
								</div>
								{/*
								<div className="ba bw1 bgyk bdyk pa2 br4">
									<div className="ba bw1 bgzk bdzk pa2 br4">
										<div className="ba bw1 bgxyzg bdxyzg pa2 br4">
										</div>
									</div>
								</div>
								*/}
							</div>
						</div>
					</div>
				);
			default:
				return null;
		}
	}
	return (
		<div id={id} key={id} className="w-100 h-100">
			<div className="fixed bottom-0 right-0 pa3">
				<button className="ba bw1 br-pill bgxa bdxa cxyzl" onClick={handleNext}>
					Next
				</button>
			</div>
			{renderTheme(theme)}
		</div>
	);
}
