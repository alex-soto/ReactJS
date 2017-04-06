import React from 'react';
import Draggable from 'react-draggable';
import './App.css';

let Note = React.createClass({
    getInitialState() {
        return {editing: false}
    },
    componentWillMount(){
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px')
        };
    },
    componentDidUpdate(){
        if (this.state.editing){
            this.refs.newText.focus();
            this.refs.newText.select();
        }
    },
    shouldComponentUpdate(nextProps, nextState){
        return this.props.children !== nextProps.children || this.state !== nextState;
    },
    randomBetween(x, y, s){
        return (x + Math.ceil(Math.random() * (y-x))) + s;
    },
    edit(){
        this.setState({editing: true});
    },
    save(){
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false});
    },
    remove(){
        this.props.onRemove(this.props.id);
    },
    renderDisplay(){
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>Edit</button>
                    <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    },
    renderForm(){
        return (
            <div className="note" style={this.style}>
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <span>
                    <button onClick={this.save}>Save</button>
                </span>
            </div>
        )
    },
    render(){
        return (<Draggable>
                {
                    (this.state.editing) ? this.renderForm() : this.renderDisplay()
                }
                </Draggable>)
        
    }
});

export default Note;