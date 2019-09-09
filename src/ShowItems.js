import React, { Component } from 'react';
import "./ShoppingList.css";
import { Draggable } from "react-beautiful-dnd";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';



class ShowItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditWindow: false,
            label: "",
            product: "",
            productEdited: "",
        };
        this.createItems = this.createItems.bind(this);
        this.createItemsForSearched = this.createItemsForSearched.bind(this);
        //this.edit = this.edit.bind(this);
        this.handleSave = this.handleSave.bind(this);

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
    
                        <Button variant="outlined" className="buttonDelete" onClick={() => this.props.delete(item.key)}>Удалить</Button>
                        <Button variant="outlined" className="buttonEdit" onClick={() => this.handleEdit(item.product, item.key, item.cost)}>Редактировать</Button>
    
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
                        <button className="buttonEdit" onClick={() => this.handleEdit(item.product, item.key, item.cost)}>Редактировать</button>
    
                    </li>
                )}
                </Draggable>
        );
    }
    handleEdit(product, key, cost) {
        this.setState({product})
        this.setState({key})
        this.setState({cost})
        this.setState({isEditWindow: true})
    }

    // windowEdit(product, key, cost){
    //     //let result;
    //     //let resultCost;
    //     this.setState({keyOfEditedItem: key})
    //     return (
    //         <DialogTitle>
    //             Введите новый продукт!
    //         </DialogTitle>
    //     );     
    // }

    // edit() {
        

    //     // let result = prompt('Введите новый продукт:', product);
    //     // let resultCost = prompt('Введите новую цену:', cost); 
    //     if (this.state.result !== null) {
    //         this.props.saveSet(this.state.result, this.state.keyOfEditedItem, this.state.resultCost)
    //     }
    // }

    handleSave() {
        let result = this.state.product
        let key = this.state.key
        let resultCost = this.state.cost
        if (result !== '') {
            this.props.saveSet(result, key, resultCost)
            this.setState({isEditWindow: false})
        }else{
            this.setState({isEditWindow: true}) 
        }
        
    }

    render() {
        var listItems = this.props.finishedItems.map((item, index) => (item.findedIndex) ? this.createItemsForSearched(item, index) : this.createItems(item, index));

        //console.log("Отрисовка этого массива: ", this.props.finishedItems)

        return (
            <div>
            <ul className="theList">
                    {listItems}
            </ul>
                        
            <Dialog
                open={this.state.isEditWindow}
                onClose={()=> this.setState({isEditWindow: false})}
                //TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>
                    Внесите изменения в товар:
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название"
                        type="text"
                        fullWidth
                        value={this.state.product}
                        onChange={(e) => this.setState({product: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Цена"
                        type="number"
                        fullWidth
                        value={this.state.cost}
                        onChange={(e) => this.setState({cost: e.target.value})}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default ShowItems;