import React from "react";
import { Button, Modal } from "react-bootstrap";

export function AlertDialog(props) {
    const toggleAlertModal = () => {
        props.toggleAlertModal(props, false);
    };

    const toggleSubmitAlertModal = () => {
        props.toggleAlertModal(props, true);
    };

    return (
        <Modal
            show={props.isAlertModalOpen}
            // onHide={toggleAlertModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.alertMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleAlertModal}>
                    {props.cancelText}
                </Button>
                <Button
                    variant="primary"
                    onClick={toggleSubmitAlertModal}
                    // className={`${clsx({
                    //     "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                    //     props.isLoading
                    // })}`}
                    disabled={props.isLoading}>
                    {props.confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertDialog;
