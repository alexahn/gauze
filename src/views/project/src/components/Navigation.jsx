import * as React from "react";

function Navigation({ pathfinder }) {
    console.log("pathfinder", pathfinder);
    return (
        <ul>
            <li>
                <a href={pathfinder.stateToURL("project.environment.environment_root", {}, {})}>project.environment.environment_root</a>
            </li>
            <li>
                <a href={pathfinder.stateToURL("project.proxy.proxy_root", {}, {})}>project.proxy.proxy_root</a>
            </li>
            <li>
                <a href={pathfinder.stateToURL("project.system.system_root", {}, {})}>project.system.system_root</a>
            </li>
        </ul>
    );
}

export default Navigation
