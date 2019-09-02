import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ShoppingList from "./shoppingList";

var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        <ShoppingList />
    </div>,
    destination
);
