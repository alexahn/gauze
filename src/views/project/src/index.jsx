import "./index.css";
import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

function App({}) {
    return (
        <div>
			Application
        </div>
    );
}

const root = Client.createRoot(document.getElementById("project"));

// strict mode causes an additional render
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

