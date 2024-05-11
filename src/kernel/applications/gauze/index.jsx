import * as React from "react";
import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

let Greet = () => <h1>Hello, world!</h1>;
console.log(Server.renderToString(<Greet />));
console.log("change");

const root = Client.createRoot(document.getElementById("gauze"));
const element = <h1>Hello, world</h1>;
root.render(element);
