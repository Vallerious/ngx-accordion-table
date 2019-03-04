import React, { Component } from 'react';
import _ from "lodash";
//import { requester } from '../../../core/requester';

import MainGrid from './MainGrid';
import TablePagination from '../pagination/TablePagination';

//import './grid.scss';

class BEGrid extends Component {

    constructor(props) {
        super(props);
        this._initCurrentPage = 0;
        this._url = props.url;

        this.state = {
            data: [],
            perPage: 5,
            allItemsCount: 0,
            sorting: '',
            currentPage: 0
        };

        this.debouncedFetch = _.debounce(this.fetch, 400);
    }

    componentWillMount() {
        // fetch initial data
        // this.fetch(this._initCurrentPage, this.state.perPage, null, ...this.props.query);
    }

    fetch = (page, size, sort, query) => {
        query = query ? query : {};

        requester.get(this._url, { page, size, sort, ...query })
            .then((data) => {
                if (data && data._embedded && data._embedded.slice) {
                    this.setState({ data: data._embedded.slice() });
                }

                if (data && data.page) {
                    this.setState({ allItemsCount: data.page.totalElements });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        let {perPage, sorting} = this.state;

        if (!_.isEqual(nextProps.query, this.props.query)) {
            this.debouncedFetch(this._initCurrentPage, perPage, sorting, nextProps.query);
        }

        this.setState({ currentPage: 0 });
    }

    onPaginationChange = (currentPage) => {
        let {sorting, perPage} = this.state;

        this.fetch(currentPage, perPage, sorting, this.props.query);
        this.setState({ currentPage });
    }

    onPagePerChange = (perPage) => {
        this.setState({ perPage }, () => {
            this.fetch(this._initCurrentPage, this.state.perPage, this.state.sorting, this.props.query);
        });
    }

    onSortChange = (columnKey, sortDir) => {
        this.setState({ sorting: columnKey + "," + sortDir.toLowerCase() }, () => {
            this.fetch(this._initCurrentPage, this.state.perPage, this.state.sorting, this.props.query);
        });
    }

    render() {
        let {data, perPage, allItemsCount, currentPage} = this.state;
        let {tableTitle, columns, children, emptyTitle} = this.props;

        return (
            <div>
                <MainGrid {...{ children, tableTitle, columns, emptyTitle, data }}
                    onSortChange={this.onSortChange} />
                <TablePagination dataLength={allItemsCount}
                    perPage={perPage}
                    currPage={currentPage}
                    onPaginationChange={this.onPaginationChange}
                    onPagePerChange={this.onPagePerChange} />
            </div>
        )
    }
}

export default BEGrid;