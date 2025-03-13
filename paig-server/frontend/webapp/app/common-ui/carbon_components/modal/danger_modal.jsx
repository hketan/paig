import React from "react";

import { Modal } from "@carbon/react";

class DangerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            label: '',
            title: '',
            content: null
        };
    }
    componentDidMount() {
        const {title} = this.props;
        this.setState({
            title: title || ''
        })
    }
    openModal = (opts={}) => {
        this.setState({
            open: true,
            ...opts
        });

        let promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        })
        return promise;
    }
    handleRequestSubmit = () => {
        this._resolve?.(this);
    }
    handleCloseModal = () => {
        this._reject?.(this);
        this.hide();
    }
    hide = () => {
        this.setState({ open: false });
    }

    render() {
        const {title, children, ...props} = this.props;

        return (
            <Modal
                open={this.state.open}
                modalLabel={this.state.label}
                modalHeading={this.state.title}
                danger
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
                onRequestClose={this.hide}
                onSecondarySubmit={this.handleCloseModal}
                onRequestSubmit={this.handleRequestSubmit}
                {...props}
            >
                {children || this.state.content}
            </Modal>
        );
    }
}

export {
    DangerModal
}