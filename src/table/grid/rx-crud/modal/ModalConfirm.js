import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalConfirm extends Component {
    ok = () => {
        this.props.onConfirm();
        this.props.onHide();
    }
    
    render() {
        let {title, show, onHide} = this.props;

        return (
            <div>
                <Modal show={show} onHide={onHide} container={this}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button onClick={onHide}>No</Button>
                        <Button bsStyle="primary" onClick={this.ok}>Yes</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

export default ModalConfirm;