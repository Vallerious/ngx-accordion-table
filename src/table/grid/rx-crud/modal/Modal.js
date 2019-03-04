import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalConfirm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        };
    }

    componentWillMount() {
        this.setState({ show: this.props.showModal });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ show: nextProps.showModal });
    }

    render() {
        let {title} = this.props;

        return (
            <div>
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.props.onHide()}>Close</Button>
                        <Button bsStyle="primary" onClick={this.props['data-save'].bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalConfirm;
