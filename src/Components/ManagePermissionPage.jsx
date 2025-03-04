import {Button, Card, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deletePermission, getPermission} from "../Service/permission.api";
import './ManagePermission.css'
import AddEditPermission from "./AddEditPermission";
import showNotification from "../helper/notification";
import AlertDialog from "../Dailoag/AlertDialog";
export const ManagePermissionPage = () => {
    const [permission, setPermission] = useState([]);
    const [statusText,setStatusText] =useState('')
    const [deletePermissionId, setDeletePermissionId] = useState("")
    const [isDeletingPermission, setIsDeletingPermission] = useState(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [permissionName, setPermissionName] = useState('')
    const [permissionId, setPermissionId] = useState('')
    const [activatePermission, setActivatePermission] = useState([])

    useEffect(() => {
        getAllPermission();
    }, []);
    const getAllPermission = () => {
        try {
            getPermission().then((response)=>{
                if (response.status && response.status===200){
                    const {data: responseData = []} = response;
                    // const formattedPermissions = responseData.map(item => ({
                    //     label: item.permissionName,
                    //     value: item.id
                    // }));
                    console.log({responseData})
                    setPermission(responseData);
                }
                else throw response
            }).catch((error)=>{
                console.log({error})
            })
        } catch (error) {

        }
    }

    const toggleAddRole =() =>{
        setIsOpen(!isOpen)
        setIsEditing(false)
    }
    const handleDeleteDataSource = (permission) => {
        setStatusText(`You want to Delete ${permission["permissionName"]} permission ?`)
        setDeletePermissionId(permission["id"])
        setIsDeletingPermission(true)
        onToggleDeleteStatusModal()
    };
    const onToggleDeleteStatusModal = (props, confirm) => {
        if (!props || (props && !confirm)) {
            // if props is undefined then alert modal will be shown or
            // if props is available & confirm is not available then user hasn't hit the confirm button
            setIsStatusModalOpen(!isStatusModalOpen)
        } else if (props && confirm) {
            // if props & confirm is available then user has hit the confirm button.
            if (deletePermissionId) {
                deleteDataSourceById(deletePermissionId);
            }
        }
    };
    const deleteDataSourceById = (deleteRoleId) => {
        deletePermission(deleteRoleId)
            .then((response) => {
                if (response.status && response.status === 200) {
                    setIsStatusModalOpen(!isStatusModalOpen)
                    showNotification(response.message,'success');
                    getAllPermission()
                } else {
                    throw response;
                }
            })
            .catch((error) => {
                setIsStatusModalOpen(!isStatusModalOpen)
                showNotification(error.message,'error');
            });
    };

    const editPermissiom =(roles) =>{
        setIsOpen(true)
        setIsEditing(true)
        setPermissionName(roles['permissionName'])
        setPermissionId(roles['id'])
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <div className="table-title">
                                    <h5>Manage Permission</h5>
                                    <Button
                                        className={"ml-auto"}
                                        variant="primary"
                                        onClick={toggleAddRole}>
                                        Add Role
                                    </Button>
                                </div>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                <tr style={{textAlign: 'center'}}>
                                    <th>Id</th>
                                    <th>Permission Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {permission.map((permissions, id) => {
                                    return (
                                        <tr className="text-center" key={id}>
                                            <td>{permissions.id}</td>
                                            <td>{permissions.permissionName}</td>
                                            <td style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-evenly"
                                            }}>
                                                <i className="fa fa-eye" aria-hidden="true"
                                                   onClick={() => editPermissiom(permissions)}></i>
                                                <i className="fa fa-trash" aria-hidden="true"
                                                   onClick={() => handleDeleteDataSource(permissions)}></i>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <hr/>
                    </Card>
                </div>
            </div>
            <AddEditPermission
                isOpen={isOpen}
                toggleAddRole={toggleAddRole}
                getAllPermission={getAllPermission}
                isEditing={isEditing}
                permissionName={permissionName}
                permissionId={permissionId}
                activatePermission={activatePermission}
            />
            <AlertDialog
                confirmText={"Yes"}
                cancelText={"No"}
                alertMessage={statusText}
                toggleAlertModal={onToggleDeleteStatusModal}
                isAlertModalOpen={isStatusModalOpen}
                title={"Are you sure?"}
                // isLoading={isAPIStatusLoading}
                // statusData={statusDatasourceData}
            />
        </>
    )
}

export default ManagePermissionPage;