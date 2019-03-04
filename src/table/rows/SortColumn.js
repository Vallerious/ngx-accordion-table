import React, { Component } from 'react';
import PropTypes from "prop-types";

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC',
};

export default class SortColumn extends Component {
    static propTypes = {
        columnKey: PropTypes.string,
        sortDir: PropTypes.oneOf(['ASC', 'DESC']),
        onSortChange: PropTypes.func,
        style: PropTypes.object
    };

    reverseSortDirection(sortDir) {
        return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    _onSortChange = (e) => {
        e.preventDefault();

        if (this.props.onSortChange) {
            this.props.onSortChange(
                this.props.columnKey,
                this.props.sortDir ?
                    this.reverseSortDirection(this.props.sortDir) :
                    SortTypes.DESC
            );
        }
    }

    render() {
        let {sortDir, children, style, title} = this.props;

        return (
            <div style={style}>
                <a onClick={this._onSortChange}>
                    {title}
                    {sortDir 
                        ? (sortDir === SortTypes.DESC  
                        ? <span className="sorting-arrow icon-sortingdown_icon"></span> 
                        : <span className="sorting-arrow icon-sortingup_icon"></span>) 
                        : <span className="double-sorting-arrows icon-sorting_icon ml5"></span>}
                    {children}
                </a>
            </div>
        );
    }
}