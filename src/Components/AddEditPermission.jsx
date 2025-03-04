import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import {adddPermission, updatePermissionById} from "../Service/permission.api";
import showNotification from "../helper/notification";

export const AddEditPermission = (props) => {
    return (
        <Modal size="lg" centered show={props.isOpen} onHide={props.toggleAddRole}>
            <Modal.Header closeButton>
                <Modal.Title>{props.isEditing ? "Edit Permission" : "Add Permission"}</Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={{
                    permissionName: props.isEditing ? props.permissionName || "" : "", // Set blank for add mode
                }}
                enableReinitialize
                onSubmit={async (values) => {
                    const data = {
                        permissionName: values.permissionName,
                    };

                    if (props.isEditing) {
                        data["id"] = props.permissionId;
                    }
                    try {
                        const response = await (props.isEditing ? updatePermissionById : adddPermission)(data);
                        if (response.status === 200) {
                            await showNotification(response.message, 'success');
                            props.toggleAddRole();
                            props.getAllPermission();
                        } else {
                            throw response;
                        }
                    } catch (error) {
                        showNotification(error.message || "Something went wrong", 'error');
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Permission Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="permissionName"
                                    value={values.permissionName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Permission"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.toggleAddRole}>Cancel</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </Modal.Footer>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddEditPermission;
