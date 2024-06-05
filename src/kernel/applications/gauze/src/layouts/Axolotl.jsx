import React from "react";
import { useState } from "react";

export default function Axolotl({ sections, units }) {
	const id = "layout:axalotl";
	const [theme, setTheme] = useState(0);

	function handleNext(e) {
		setTheme((theme + 1) % 3);
	}
	function renderTheme(theme) {
		switch (theme) {
			case 0:
				return (
					<div className="wrapper w-100 h-100">
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
						<div className="small-window-1 cxg athelas br4 pa2 f4">
							<div className="ba bw1 bgxk bdxk pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="w-100 br2 ba bw1 bgxl bdxl cxa" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgxh bdxh cxf">Submit</button>
									<button className="br-pill ba bw1 bgxf bdxf cxh">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 cxf athelas br4 f4 pa2">
							<div className="ba bw1 bgxh bdxh pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyzg athelas br4 f4 pa2">
							<div className="ba bw1 bdxyzg pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 cxf athelas br4 f4 pa2">
							<div className="ba bw1 bgxd bdxd pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 cxc athelas br4 f4 pa2">
							<div className="ba bw1 bdxb bgxb pa2 br4">
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
						<div className="one bgya" />
						<div className="two bgyb" />
						<div className="three bgyc" />
						<div className="four bgyd" />
						<div className="five bgye" />
						<div className="six bgyf" />
						<div className="seven bgyg" />
						<div className="eight bgyh" />
						<div className="nine bgyi" />
						<div className="ten bgyj" />
						<div className="eleven bgyk" />
						<div className="twelve bgyl" />
						<div className="small-window-1 cyg athelas br4 pa2 f4">
							<div className="ba bw1 bgyk bdyk pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="br2 ba bw1 bgyl bdyl cya" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgyh bdyh cyf">Submit</button>
									<button className="br-pill ba bw1 bgyf bdyf cyh">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 cyf athelas br4 f4 pa2">
							<div className="ba bw1 bgyh bdyh pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyzg athelas br4 f4 pa2">
							<div className="ba bw1 bdxyzg pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 cyf athelas br4 f4 pa2">
							<div className="ba bw1 bgyd bdyd pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 cyc athelas br4 f4 pa2">
							<div className="ba bw1 bdyb bgyb pa2 br4">
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
						<div className="one bgza" />
						<div className="two bgzb" />
						<div className="three bgzc" />
						<div className="four bgzd" />
						<div className="five bgze" />
						<div className="six bgzf" />
						<div className="seven bgzg" />
						<div className="eight bgzh" />
						<div className="nine bgzi" />
						<div className="ten bgzj" />
						<div className="eleven bgzk" />
						<div className="twelve bgzl" />
						<div className="small-window-1 czg athelas br4 pa2 f4">
							<div className="ba bw1 bgzk bdzk pa2 br4">
								<div>
									MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<div className="pt2 flex items-center f5">
									<label for="email" className="pr1">
										Email
									</label>
									<input id="email" className="br2 ba bw1 bgzl bdzl cza" />
								</div>
								<div className="pt2 flex f5">
									<button className="br-pill ba bw1 bgzh bdzh czf">Submit</button>
									<button className="br-pill ba bw1 bgzf bdzf czh">Cancel</button>
								</div>
							</div>
						</div>
						<div className="small-window-2 czf athelas br4 f4 pa2">
							<div className="ba bw1 bgzh bdzh pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-3 cxyzg athelas br4 f4 pa2">
							<div className="ba bw1 bdxyzg pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-4 czf athelas br4 f4 pa2">
							<div className="ba bw1 bgzd bdzd pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						</div>
						<div className="small-window-5 czc athelas br4 f4 pa2">
							<div className="ba bw1 bdzb bgzb pa2 br4">
								MMXVI Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
