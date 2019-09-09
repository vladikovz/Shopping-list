import React, { Component } from "react";
import "./ShoppingList.css";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

//переход для всплывающего окна
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class Search extends Component {
    constructor(props){
        super(props)

        this.state = {   
            isDialogWindow: false,
            TitleAboutEmpty: "",
        };
        this.searchByItems = this.searchByItems.bind(this);
    }

    searchByItems(e) {
        let searchTerm = this.inputElement.value;
        let itemValue = this.props.finishedItems.find(item => item.product === searchTerm)
        
        if (searchTerm === '') {
            this.setState({TitleAboutEmpty: "Введите, что хотите найти."})
            this.setState({isDialogWindow: true});
 
        }else if (itemValue === undefined) {
            this.setState({TitleAboutEmpty: "Товар не найден!"})
            this.setState({isDialogWindow: true});
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
                        className="inputForSearch"
                        ref = {(input) => this.inputElement = input}
                        placeholder="что будем искать?"
                    />
                    <button type="submit">Найти</button>
                </form>        
                <div>
                    <Dialog
                        open={this.state.isDialogWindow}
                        onClose={()=> this.setState({isDialogWindow: false})}
                        TransitionComponent={Transition}
                        keepMounted
                    >
                        <DialogTitle>
                            {this.state.TitleAboutEmpty}
                        </DialogTitle>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default Search;