import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const defaultItemsPerPage = 5;

class DropdownItemsPerPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            itemsPerPage: props.itemsPerPage || defaultItemsPerPage
        };
    }

    onPagePerChange = (e) => {
        let itemsPerPage = parseInt(e.target.value, 10);

        this.props.onPagePerChange(itemsPerPage);
        this.setState({ itemsPerPage });
    }

    render() {
        return (
            <div className="contaner-pagination-info">
                <FormGroup controlId="formControlsSelect">
                    <select onChange={this.onPagePerChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="80">80</option>
                        <option value="100">100</option>
                    </select>
                </FormGroup>
            </div>
        )
    }
}

export default DropdownItemsPerPage;