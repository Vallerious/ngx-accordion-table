import React, { Component } from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class AttackStatusBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                width: '84px',
                height: '23px',
                lineHeight: '20px',
                borderRadius: '100px',
                margin: '0 auto',
                color: '#fff',
                textTransform: 'capitalize'
            }
        };
    }

    componentWillMount() {
        let background = this.props.data.status === 'ongoing' ? '#f46f6d' : '#8dc63f';
        this.setState({ badgeColor: background });
    }

    render() {
        let {data, field} = this.props;

        return (<div style={Object.assign({ background: this.state.badgeColor }, this.state.style)}>
            {data[field]}
        </div>)
    }
}

class SimpleTextCell extends Component {
    render() {
        let {data, field, fieldDef, row, col} = this.props;
        const over = fieldDef.showTooltip && (data[field] + '').length > 30 ? (<Tooltip id={`ssTableTooltip-row${row}-col${col}`}>{data[field]}</Tooltip>) : null;
        let tpl = <div className={this.props.data.status === 'ongoing' ? 'text-bolded' : ''} style={{'whiteSpace': 'nowrap', overflow: 'hidden', 'textOverflow': 'ellipsis'}}>
                        {data[field]}
                    </div>
        if (over) {
            tpl = <OverlayTrigger overlay={over} placement="bottom">
                    {tpl}
                  </OverlayTrigger>
        }
        return tpl;
    }
}

class LinkCell extends Component {

    render() {
        let {data, field, linkUrl} = this.props;

        return (
            <div className="cell-link" style={{'whiteSpace': 'nowrap', overflow: 'hidden', 'textOverflow': 'ellipsis'}}>
                <a href={linkUrl}>{data[field]}</a>
            </div>
        )
    }
}

class AdminActionsCell extends Component {
    render() {
        return (
            <div className="container-admin-action-cell">
                <span className="glyphicon glyphicon-pencil"></span>
                <span className="glyphicon glyphicon-trash"></span>
            </div>
        )
    }
}

export {
    AttackStatusBadge,
    SimpleTextCell,
    AdminActionsCell,
    LinkCell
}