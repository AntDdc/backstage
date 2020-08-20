import request from '../utils/intercept'

// 登录
export function login(params) {
    return request.post('/login',params)
}
// 用户管理
export function getUsers(params) {
    return request.get('/users',{params})
}
// 添加用户
export function  addUsers(params) {
    return request.post('/users',params)
}
// 删除用户
export function deleteUsers(params) {
    return request.delete(`/users/${params}`)
}
// 编辑用户
export function editUserStatus(params,data) {
    return request.put(`/users/${params}`,data)
}
// 修改用户状态
export function reviseStatus(params,data) {
    return request.put(`users/${params}/state/${data}`)
}
// 获取roleId
export function getRoleId(params) {
    return request.get(`users/${params}`)
}
// 更改权限
export function revisePower() {
    return request.get('/roles')
}
// 分配用户角色
export function distributeRole(params,data) {
    return request.put(`/users/${params}`,data)
}
// 获取权限列表
export function getPowerList(params) {
    return request.get(`/rights/${params}`)
}
//删除角色指定权限
export function deletePower(par1,par2) {
    return request.delete(`roles/${par1}/rights/${par2}`)
}
// 角色授权
export function getAuthorize(par1,par2) {
    return request.post(`roles/${par1}/rights`,par2)
}