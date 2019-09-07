import React, { Component } from 'react';
import "./ShoppingList.css";
import { Draggable } from "react-beautiful-dnd";



// const getItemStyle = (isDragging, draggableStyle) => ({
//   // change background colour if dragging
//   backgroundColor: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

class ShowItems extends Component {
    constructor(props) {
        super(props)
        this.createItems = this.createItems.bind(this);
        this.createItemsForSearched = this.createItemsForSearched.bind(this);
        this.edit = this.edit.bind(this);
        //this.choice = this.choice.bind(this);
    }

    createItems(item, index) {
        let cost
        if(item.cost == null) {
            cost = '  Стоимость не указана'
        }else {
            cost = '  Стоимость: ' + item.cost
        }
        return (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided) => (
                    
                    <li className = 'list' key={item.key} 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //     snapshot.isDragging,
                        //     provided.draggableProps.style
                        //     )}
                    >
                        <span className = "ListContent">
                            <span className = 'nameOfProduct'>{item.product}</span>
                            <span className = 'costOfProduct'>{cost}</span>
                        </span>
    
                        <button className="buttonDelete" onClick={() => this.props.delete(item.key)}>Удалить</button>
                        <button className="buttonEdit" onClick={() => this.edit(item.product, item.key, item.cost)}>Редактировать</button>
    
                    </li>
                    
                )}
                </Draggable>              
        );
    }

    createItemsForSearched(item,index) {
        let cost
        if(item.cost == null) {
            cost = '  Стоимость не указана'
        }else {
            cost = '  Стоимость: ' + item.cost
        }

        return (
            <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided) => (
                    <li className = 'listFinded' key={item.key}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <span className = "ListContent">
                            <span className = 'nameOfProduct'>{item.product}</span>
                            <span className = 'costOfProduct'>{cost}</span>
                        </span>
    
                        <button className="buttonDelete" onClick={() => this.props.delete(item.key)}>Удалить</button>
                        <button className="buttonEdit" onClick={() => this.edit(item.product, item.key, item.cost)}>Редактировать</button>
    
                    </li>
                )}
                </Draggable>
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
        var listItems = this.props.finishedItems.map((item, index) => (item.findedIndex) ? this.createItemsForSearched(item, index) : this.createItems(item, index));

        //console.log("Отрисовка этого массива: ", this.props.finishedItems)

        return (
            <ul className="theList">

                    {listItems}

            </ul>
        );
    }
}

export default ShowItems;