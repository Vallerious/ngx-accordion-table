import React, {Component} from 'react';
import PropTypes from "prop-types";
import FEGrid from './grid/FEGrid';
import BEGrid from './grid/BEGrid';

export class SSTable extends Component {
    static propTypes = {
        tableTitle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        columns: PropTypes.array,
        data: PropTypes.array,
        url: PropTypes.string
    };
    
    render () {
        let {tableTitle, columns, data, url, isSelectable, query, emptyTitle, expandedRowTemplate} = this.props.config;

        return (
            <div>
                {url
                    ?
                    <BEGrid {...{tableTitle, isSelectable, columns, data, url, query, emptyTitle, children: this.props.children}} />
                    :
                    <FEGrid {...{tableTitle, isSelectable, columns, data, emptyTitle, children: this.props.children, expandedRowTemplate}}/>}
            </div>
        )
    }
}
