import React, { Component } from "react";
import ShowItems from "./ShowItems";
import "./ShoppingList.css";
import Search from './Search'

class ShoppingList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            items: [],
            sortState: true,
            sortButton: 'Сортировать',
            searchState: false,
            
            
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveSet = this.saveSet.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.setSearched = this.setSearched.bind(this);
        this.showFindedItems = this.showFindedItems.bind(this);
        this.setDefault = this.setDefault.bind(this);
    }

    addItem(e) {

        if( this._inputElement.value !== "" ) {
            let indexofComma
            (this._inputElement.value.indexOf(',') >= 0)? indexofComma = this._inputElement.value.indexOf(',') : indexofComma = null

            let lengthOfList = this._inputElement.value.length
            let inputItem
            let inputCost

            if( indexofComma !==null ) {
                inputItem = this._inputElement.value.slice(0, indexofComma)
                inputCost = this._inputElement.value.slice(indexofComma+1, lengthOfList)
                inputCost = inputCost.replace(/\s+/g, ' ').trim()  // удаление пробелов
                console.log(inputCost)
            }else {
                inputItem = this._inputElement.value
                inputCost = null  
            }  

            var newItem = {
                product: inputItem,
                cost: inputCost,
                key: Date.now(),
                findedIndex: false,
            };    
           
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            
            
        }

        this._inputElement.value = "";
        
        e.preventDefault();
    }
    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });
    
        this.setState({
            items: filteredItems
        });
    }

    //may be I don't need key?
    saveSet(product, key, cost) {
        
        let index = this.state.items.map(el => el.key).indexOf(key)
        console.log('index: ', index)
        let item = this.state.items[index]
        item.product = product
        item.cost = cost
        const items = this.state.items.concat()
        items[key] = item  // Why key but not index?
        this.setState({
            items: items
        })

   }
    handleSort() {       
        this.setState({sortState: !this.state.sortState})

        if(this.state.sortState){
            this.setState({sortButton: 'По убыванию'})
            this.state.items.sort((prev, next) => prev.cost - next.cost)
        }else {
            this.setState({sortButton: 'По возрастанию'})
            this.setState({items: this.state.items.reverse()})
        }
        
        //console.log("значение списка: ", this.state.sortState)
   }

    setSearched(index) {
        //this.state.items[index].
        console.log("index: ", index);
        // this.items[index].setState({finded: true})
        // this.setState({indexSearch: index}) 
        let item = this.state.items[index];
        item.findedIndex = true;
        const items = this.state.items.concat();
        items[index] = item  // Why key but not index?
        this.setState({
            items: items
        })
        
        //console.log("найденый массив: ", items[index]);
        this.showFindedItems(index);
        setTimeout(this.setDefault, 4000, index);
   }

    setDefault(index) {
        let item = this.state.items[index];
        item.findedIndex = false;
        const items = this.state.items.concat();
        items[index] = item  // Why key but not index?
        this.setState({
            items: items
        })
        
        //console.log("findedIndex: ", this.state.items[index].findedIndex);
}

   showFindedItems(index) {
        return(
            <ShowItems finishedItems={this.state.items}
                        delete={this.deleteItem}
                        saveSet={this.saveSet}
            />
        )
}

    render() {
        return (
            <div className="shoppingListMain">
                <div>
                    <Search 
                        finishedItems={this.state.items}
                        setSearched={this.setSearched}
                        />
                </div> 
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input 
                            ref = {(input) => this._inputElement = input}
                            placeholder="Введите что купить, цена" 
                        />
                        <button type="submit">Добавить</button>
                    </form>
                    
                    <button onClick={this.handleSort}>{this.state.sortButton}</button>
                </div>
                <div>
                    {this.showFindedItems()}
                </div>

            </div>

        );
    }
}

export default ShoppingList;
