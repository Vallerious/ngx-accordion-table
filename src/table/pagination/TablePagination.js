import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
//import { Glyphicon } from 'react-bootstrap';
import PropTypes from "prop-types";
import DropdownItemsPerPage from './DropdownItemsPerPage';

//import './pagination.scss';

class TablePagination extends Component {
    static propTypes = {
        dataLength: PropTypes.number
    }

    constructor(props) {
        super(props)
        this.state = {
            pageCount: 0,
            perPage: 0,
            currentPage: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currentPage: nextProps.currPage || 0 });
    }


    onPagePerChange = (perPage) => {
        this.props.onPagePerChange(perPage);
        this.setState({ currentPage: 0 }, () => {
            this.props.onPaginationChange(0);
        });
    }

    handlePageClick(data) {
        let currentPage = parseInt(data.selected, 10);

        this.props.onPaginationChange(currentPage);
        this.setState({ currentPage });
    }

    render() {
        let {dataLength, perPage} = this.props;
        let {currentPage} = this.state;

        let pageCount = Math.ceil(dataLength / perPage);
        let pageLowRange = parseInt(currentPage * perPage + 1, 10);
        let pageHighRange = parseInt(currentPage * perPage + perPage, 10);

        return (
            <div>
                {dataLength > 0 ? <div className="contaner-pagination">
                    <div className="pagination">
                        <ReactPaginate previousLabel={<span glyph="chevron-left"></span>}
                            nextLabel={<span glyph="chevron-right"></span>}
                            breakLabel={<a>...</a>}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            forcePage={currentPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick.bind(this)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                        <div className="info">{pageLowRange}&nbsp;-&nbsp;{pageHighRange > dataLength ? dataLength : pageHighRange}&nbsp;of&nbsp;{dataLength}&nbsp;results</div>
                    </div>
                    <DropdownItemsPerPage itemsPerPage={perPage} onPagePerChange={this.onPagePerChange} />
                    <div className="clearfix"></div>
                </div> : <div />}
            </div>
        )
    }
}

export default TablePagination;