import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import MainGrid from './MainGrid';
import TablePagination from '../pagination/TablePagination';
//import { store } from '../../../stores/EventEmmiterStore';

//import './grid.scss';

class FEGrid extends Component {
    static propTypes = {
        tableTitle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        onSortChange: PropTypes.func,
        columnFilter: PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.state = {
            originalData: [],
            viewData: [],
            currPage: 0,
            perPage: 5,
            filters: {},
            isPrinting: false
        };
    }

    componentWillMount() {
        this.initTable(this.props);
    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {
    };

    componentWillReceiveProps(nextProps) {
        this.initTable(nextProps);
    }

    initTable = (tableData) => {
        let {data} = tableData;

        this.setState({ originalData: data.slice(), viewData: data.slice(), currPage: 0 });
    }

    getPaginatedItems(items, page = 0, perPage) {
        let offset = page * perPage;

        return _.take(_.drop(items, offset), perPage);
    }

    onPaginationChange = (currPage) => {
        this.setState({ currPage, perPage: this.state.perPage });
    }

    onPagePerChange = (perPage) => {
        this.setState({ perPage });
    }

    onSortChange = (columnKey, sortDir) => {
        this.setState({ viewData: _.orderBy(this.state.viewData, [columnKey], [sortDir.toLowerCase()]) });
    }

    onFilterValueChange = (field, value) => {
        this.setState({ filters: Object.assign({}, this.state.filters, { [field]: value }) }, () => {
            this.setState({
                viewData: this.state.originalData.filter((item) => {
                    let contains = true;

                    Object.keys(this.state.filters).forEach((key) => {
                        let dataValue = item[key] ? item[key].toString().toLowerCase() : "";
                        let filterValue = this.state.filters[key] ? this.state.filters[key].toString().toLowerCase() : "";

                        if (dataValue.indexOf(filterValue) === -1) {
                            contains = false;
                        }
                    });

                    return contains;
                })
            })
        });
    }

    _onChange = (param) => {
        if (param === 'before') {
            this.setState({ isPrinting: true });
        } else if (param === 'after') {
            this.setState({ isPrinting: false });
        }
    };

    render() {
        let {tableTitle, columns, children, isSelectable, columnFilter, emptyTitle, expandedRowTemplate} = this.props;
        let {viewData, currPage, perPage, isPrinting} = this.state;
        let data = viewData;
        if (!isPrinting) data = this.getPaginatedItems(viewData, currPage, perPage);

        return (
            <div>
                <MainGrid {...{ children, tableTitle, columnFilter, isSelectable, columns, emptyTitle, data: data, expandedRowTemplate }}
                    onSortChange={this.onSortChange}
                    onSelect={this.props.onSelect}
                    onFilterValueChange={this.onFilterValueChange} />
                {/* <TablePagination dataLength={viewData.length} currPage={currPage} perPage={perPage} onPaginationChange={this.onPaginationChange} onPagePerChange={this.onPagePerChange} /> */}
            </div>)
    }
}

export default FEGrid;