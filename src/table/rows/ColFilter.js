import React, { Component } from 'react';

class ColFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    onFilterChange = (e) => {
        this.setState({ value: e.target.value }, () => this.props.onFilterValueChange(this.props.fieldName, this.state.value));
    }

    render() {
        return (
            <div>
                <input type="text"
                    className="form-control"
                    onClick={(e) => { e.stopPropagation() } }
                    onChange={this.onFilterChange}
                    value={this.state.value}
                    style={{width: '90%', margin: '0 auto'}} />
            </div>
        )
    }
}

export default ColFilter;