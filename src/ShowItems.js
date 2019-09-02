import React, { Component } from 'react';
import FlipMove from "react-flip-move";
import "./ShoppingList.css";
//import ShoppingList from "./shoppingList";



class ShowItems extends Component {
    constructor(props) {
        super(props)

        this.createItems = this.createItems.bind(this);
        this.createItemsForSearched = this.createItemsForSearched.bind(this);
        this.edit = this.edit.bind(this);
        //this.choice = this.choice.bind(this);
    }

    createItems(item) {
        let cost
        if(item.cost == null) {
            cost = '  Стоимость не указана'
        }else {
            cost = '  Стоимость: ' + item.cost
        }
            return (
                <li className = 'list' key={item.key}>
                    <span className = 'nameOfProduct'>{item.product}</span>
                    <span className = 'costOfProduct'>{cost}</span>
                    <button className="deleteProduct" onClick={() => this.props.delete(item.key)}>Удалить</button>
                    <button className="EditProduct" onClick={() => this.edit(item.product, item.key, item.cost)}>Редактировать</button>
                </li>
            );
    }

    createItemsForSearched(item) {
        let cost
        if(item.cost == null) {
            cost = '  Стоимость не указана'
        }else {
            cost = '  Стоимость: ' + item.cost
        }

        //console.log("Индекс", this.props.finishedItems.findedIndex)
            return (
                <li className = 'listFinded' key={item.key}>
                    <span className = 'nameOfProduct'>{item.product}</span>
                    <span className = 'costOfProduct'>{cost}</span>
                    <button className="deleteProduct" onClick={() => this.props.delete(item.key)}>Удалить</button>
                    <button className="EditProduct" onClick={() => this.edit(item.product, item.key, item.cost)}>Редактировать</button>
                </li>
            );
    }



    edit(product, key, cost) {
        let result = prompt('Введите новый продукт:', product);
        let resultCost = prompt('Введите новую цену:', cost);
        if (result !== null) {
            this.props.saveSet(result, key, resultCost)
        }
    }

    render() {
        var listItems = this.props.finishedItems.map(item => (item.findedIndex) ? this.createItemsForSearched(item) : this.createItems(item));

        //console.log("Отрисовка этого массива: ", this.props.finishedItems)
    
        return (
            <ul className="theList">
                <FlipMove duration={250} easing="ease-out">
                    {listItems}
                </FlipMove>
            </ul>
        );
    }
}

export default ShowItems;