import React, { Component } from 'react';
import _ from 'lodash';

import Modal from './modal/Modal';
import ModalConfirm from './modal/ModalConfirm';
import FEGrid from '../FEGrid';

//import './rx-crud-grid.scss';

class RxCrudGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedItems: [],
            showModal: false,
            editMode: false,
            showDeleteModal: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props.config, nextProps.config) || !_.isEqual(this.state, nextState)) {
            return true;
        }

        return false;
    }

    onSelect = (selectedItems) => {
        this.setState({ selectedItems: selectedItems.length === 1 ? selectedItems[0] : selectedItems });
    }

    closeModal = () => {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    onFieldChange = (data) => {
        this.setState({ selectedItems: data });
    }

    save = (data) => {
        // send request to backend to add/edit data
        console.log("Sending to backend: " + JSON.stringify(data));
    }

    delete = () => {
        console.log("Deleting item!");
    }

    getAddEditModal(isEdit) {
        let {FormTmpl} = this.props;
        let {selectedItems} = this.state;

        return (
            <Modal show={this.state.showModal} onHide={this.closeModal} title="User Edit" data-save={this.save.bind(this, selectedItems)}>
                <FormTmpl onFieldChange={this.onFieldChange} data={selectedItems} isEdit={isEdit} />
            </Modal>
        );
    }

    getDeleteModal() {
        return <ModalConfirm show={this.state.showDeleteModal}
            onHide={this.closeModal}
            title="Are you sure you want to delete this entry?"
            onConfirm={this.delete} />
    }

    openDeleteModal = () => {
        this.setState({ showDeleteModal: true });
    }

    openModal(isEdit) {
        this.setState({ editMode: isEdit, showModal: true });
    }

    render() {
        let {config: {columns, data, isSelectable = true, tableTitle, columnFilter}, children } = this.props;
        let {selectedItems, editMode} = this.state;

        return (
            <div className="container-rx-crud-grid">
                {this.getAddEditModal(editMode)}
                {this.getDeleteModal()}
                <div className="container-crud-actions pull-right">
                    <button className="btn btn-primary" onClick={() => this.openModal(false)}>Add</button>
                    <button className="btn btn-primary" onClick={() => this.openModal(true)} disabled={_.isArray(selectedItems) && selectedItems.length !== 1}>Edit</button>
                    <button className="btn btn-primary" onClick={this.openDeleteModal} disabled={_.isArray(selectedItems) && !selectedItems.length}>Delete</button>
                </div>
                <div className="clearfix"></div>
                <FEGrid {...{ columns, data, isSelectable, tableTitle, children, columnFilter }} onSelect={this.onSelect} />
            </div>
        )
    }
}

export default RxCrudGrid;