import React, { Component } from 'react';
import classes from './Photo.css';

class Photo extends Component {
    
    render() {
        return (
            <div className={classes.Photo} onLoad={this.props.detail} onClick={this.props.clicked}>
                <div className={classes.Wrapper}>
                    <img src={this.props.img} />
                    <p>Name:{this.props.detail.username}</p>
                    <p>ID:{this.props.id}</p>
                    <p>Date: {this.props.date}</p>
                </div>
            </div>
        )
    }
    
};

export default Photo;