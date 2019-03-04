import React, { Component } from 'react';
import PropTypes from "prop-types";
import { SimpleTextCell, LinkCell } from './CellTypes';

//import moment from 'moment';
//import core from '../../../core/core';
import _ from 'lodash';

class DataRow extends Component {
    static propTypes = {
        rowData: PropTypes.array,
        widthPerCol: PropTypes.number,
        columnDefs: PropTypes.array
    }

    constructor(props) {
        super(props)

        this.state = {
            currentExpandTemplate: null,
            selectedRow: null,
            actionIdx: null
        };
    }

    componentWillReceiveProps (nextProps) {
        this.closeRows();
    }

    handleRowSelect(rowIdx) {
        if (rowIdx === this.state.selectedRow) {
            this.setState({ selectedRow: null });
        } else {
            this.setState({ selectedRow: rowIdx });
        }
    }

    handleActionClick = (cb = () => { }, i, tmpl, actionIdx, rowData) => {
        this.setState({ currentExpandTemplate: tmpl }, () => {
            this.handleRowSelect(i, actionIdx);
            cb(rowData);
        });
    }

    closeRows = () => {
        this.setState({selectedRow: null});
    }

    render() {
        let {widthPerCol, rowData, columnDefs} = this.props;
        let {selectedRow} = this.state;

        let rows = _.map(rowData, (row, i) => {
            let cells = _.map(columnDefs, (fieldDef, idx) => {
                let cellContent = null;
                let width = fieldDef.width || widthPerCol;

                if (fieldDef.render) {
                    cellContent = fieldDef.render(row);
                } else if (fieldDef.template) {
                    let CellTemplate = fieldDef.template;
                    cellContent = <CellTemplate data={row} field={fieldDef.field} style={{ width: width + '%' }}
                        onRowChecked={fieldDef.isSelectCol ? this.props.handleRowChecked.bind(this, row) : null} />;
                } else if (fieldDef.actions && fieldDef.actions.length) {
                    cellContent = _.map(fieldDef.actions, (item, j) => {
                        let Tmpl = item.actionTmpl;

                        return <span key={j} style={{display: 'inline-block', marginRight: '5px', cursor: 'pointer' }}>
                            <Tmpl onClickHandler={this.handleActionClick.bind(this, item.callback, i, item.expandedRowTmpl, j, row)} isOpened={selectedRow === i} rowData={row} />
                        </span>;
                    });
                } else if (fieldDef.type === "date") {
                    // cellContent = moment(row[fieldDef.field]).format(fieldDef.format || 'MM/DD/YY HH:mm');
                    cellContent = core.date(row[fieldDef.field]);
                } else if (fieldDef.type === "link") {
                    cellContent = <LinkCell data={row} field={fieldDef.field} linkUrl={fieldDef.linkUrl} />
                } else {
                    cellContent = <SimpleTextCell data={row} field={fieldDef.field} fieldDef={fieldDef} row={i} col={idx} />;
                }

                return <div className="text-center" style={{ flex: 1, 'whiteSpace': 'nowrap', overflow: 'hidden', 'textOverflow': 'ellipsis' }} key={idx}>
                    {cellContent}
                </div>;
            });

            let ExpandTmpl = this.props.expandedRowTemplate;

            return <div key={i} style={{display: 'flex'}} onClick={this.handleRowSelect.bind(this, i)}>
                    {cells}
                    <div style={Object.assign({}, { flex: selectedRow === i ? '0 0 100%' : '0' })} id="row-expandable">
                        {ExpandTmpl && selectedRow === i ? <ExpandTmpl rowData={row} close={this.closeRows} /> : <div />}
                    </div>
                </div>;
        });

        return (
            <div>{rows}</div>
        )
    }
};

export default DataRow;