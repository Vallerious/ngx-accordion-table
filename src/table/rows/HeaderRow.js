import React, { Component } from 'react';
import PropTypes from "prop-types";

import SortColumn from './SortColumn';
import ColFilter from './ColFilter';
import _ from 'lodash';

class HeaderRow extends Component {
    static propTypes = {
        widthPerCol: PropTypes.number,
        columnDefs: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            field: PropTypes.string,
            actions: PropTypes.arrayOf(PropTypes.shape({
                callback: PropTypes.any,
                actionTmpl: PropTypes.func,
                expandedRowTmpl: PropTypes.func
            }))
        })),
        onSortChange: PropTypes.func,
        columnFilter: PropTypes.bool
    };

    constructor(props) {
        super(props)

        this.state = {
            colSortDirs: {}
        };
    }

    onSortChange = (columnKey, sortDir) => {
        this.props.onSortChange(columnKey, sortDir);
        this.setState({ colSortDirs: { [columnKey]: sortDir } });
    }

    render() {
        let { columnDefs, widthPerCol, columnFilter, onFilterValueChange } = this.props;
        let { colSortDirs } = this.state;

        return (
            <div style={{display: 'flex'}}>
                {_.map(columnDefs, (headerItem, idx) => {
                    let calcWidth = headerItem.width || widthPerCol;
                    let colFilter = <ColFilter fieldName={headerItem.field} onFilterValueChange={onFilterValueChange} />

                    return headerItem.isSortable ? <SortColumn
                        onSortChange={this.onSortChange}
                        sortDir={colSortDirs[headerItem.field]} key={idx}
                        columnKey={headerItem.field}
                        style={{ display: 'inline-block', width: calcWidth + '%' }}
                        title={headerItem.title}>
                        {headerItem.title && columnFilter ? colFilter : null}
                    </SortColumn>
                        :
                        <div key={idx} style={{ flex: 1 }}>
                            {headerItem.title}
                            {headerItem.title && columnFilter ? colFilter : null}
                        </div>;
                })}
            </div>
        )
    }
}

export default HeaderRow;