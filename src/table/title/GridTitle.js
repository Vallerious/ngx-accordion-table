import React, { Component } from 'react';
 
//import './grid-title.scss';

class GridTitle extends Component {
    render() {
        let {tableTitle} = this.props;

        return (
            <div className="table-title">
                <div className="pull-left title">{tableTitle}</div>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default GridTitle;