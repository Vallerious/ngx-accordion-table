import React, { Component } from 'react';
import createReactClass from 'create-react-class'
import PropTypes from "prop-types";
import GridTitle from '../title/GridTitle';
import HeaderRow from '../rows/HeaderRow';
import DataRow from '../rows/DataRow';

import tableUtils from '../utils/tableUtils';
//import EmptyScreen from '../../emptyScreen/EmptyScreen';
import _ from 'lodash';

//import './grid.scss';

const logo = null;
//require("../../../assets/images/table_icon.svg");

class MainGrid extends Component {
    static propTypes = {
        tableTitle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        columns: PropTypes.array,
        data: PropTypes.array,
        onSortChange: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            widthPerCol: null,
            selectedItems: []
        };
    }

    componentWillMount() {
        let {isSelectable = false, columns} = this.props;
        // If the table is passed a config property isSelectable = true, please add a column with a checkbox
        if (isSelectable) {
            columns.unshift({
                title: "",
                field: "",
                width: 3,
                isSelectCol: true,
                template: createReactClass({
                    render() {
                        return <input type="checkbox" onChange={this.props.onRowChecked}/>
                    }
                })
            });
        }

        this.setState({ widthPerCol: tableUtils.calcRemainingWidth(columns) });
    }

    handleRowChecked = (rowData) => {
        let {selectedItems} = this.state;
        let idx = selectedItems.indexOf(rowData);

        if (idx > -1) {
            selectedItems.splice(idx, 1);
        } else {
            selectedItems.push(rowData);
        }

        this.props.onSelect(selectedItems);
    }
 
    render() {
        let {tableTitle, columns, data, onSortChange, isSelectable, columnFilter, emptyTitle, expandedRowTemplate} = this.props;
        let {widthPerCol} = this.state;
        const emptyScreenTitle = emptyTitle ? emptyTitle : 'No data in range';

        return (
            <div className="wrapper-table" id={this.props.id}>
                <GridTitle tableTitle={tableTitle}>{this.props.children}</GridTitle>
                <div className="contaner-table">
                    <div>
                        <HeaderRow columnDefs={columns} widthPerCol={widthPerCol}
                            onSortChange={onSortChange}
                            columnFilter={columnFilter}
                            onFilterValueChange={this.props.onFilterValueChange} />
                        <DataRow rowData={data}
                                widthPerCol={widthPerCol}
                                columnDefs={columns}
                                expandedRowTemplate={expandedRowTemplate}
                                isSelectable={isSelectable}
                                handleRowChecked={this.handleRowChecked} />
                    </div>
                    {_.isEmpty(data) ? <div className="mt90">nishto</div> : null}
                </div>
            </div>
        )
    }
}

export default MainGrid;