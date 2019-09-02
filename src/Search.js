import React, { Component } from "react";
//import shoppingList from "./shoppingList";
import "./ShoppingList.css";
//import ShowItems from "./ShowItems";


class Search extends Component {
    constructor(props){
        super(props)

        this.state = {   
        };
        this.searchByItems = this.searchByItems.bind(this);

    }


    searchByItems(e) {
        let searchTerm = this.inputElement.value;
        let itemValue = this.props.finishedItems.find(item => item.product === searchTerm)
        
        if (searchTerm === '') {
            alert("Введите, что хотите найти.")
        }else if (itemValue === undefined) {
            alert("Товар не найден!")
        }else {
            let itemKey = this.props.finishedItems.find(item => item.product === searchTerm).key;
            let index = this.props.finishedItems.map(item => item.key).indexOf(itemKey);
            console.log("индекс найденного массива: ",index);
            this.props.setSearched(index);
        }
        e.preventDefault();   
    }

    render(){
        return(
            <div className="search">
                <form onSubmit={this.searchByItems}>
                    <input 
                        ref = {(input) => this.inputElement = input}
                    />
                    <button type="submit">Найти</button>
                </form>        
            </div>
        );
    }
}

export default Search;