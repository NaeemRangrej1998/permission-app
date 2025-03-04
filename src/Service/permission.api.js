import request,{ axiosInstance } from "./AxiosInstanceService";

export function getPermission() {
    return axiosInstance.get("/permission/getAllPermission").then((response)=>response); // Returns a promise
}

export const deletePermission = (permissionId) => {
    return request({
        url: `/permission/deletePermission/${permissionId}`,
        method: 'DELETE',
    });
};
export const adddPermission=(addRole)=>{
    return request({
        url:'/permission/addPermission',
        method:'POST',
        body:addRole
    })
}
export const updatePermissionById=(body)=>{
    let id=body.id
    delete body["id"]
    return request({
        url: `/permission/updatePermission/${id}`,
        method:'put',
        body:body
    })
}
