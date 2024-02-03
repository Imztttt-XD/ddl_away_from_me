// 导入request.js请求工具
import service from '../utils/request1'
export const addTodoSevrvice=(todoData)=>{
    return service.post('/todo/add',{
        id:todoData.id,
        content: todoData.content,
        myStartTime: todoData.time
    });
}
export const editTodoSevrvice=(editData)=>{
    return service.put('/todo/update',{
        id:editData.id,
        content: editData.content,
    });
}
export const deleteTodoSevrvice=(id)=>{
    return service.request({
        method:"delete",
        url:'/todo/delete',
        data:{
            id:id
        }
    })
}
export const compeleteTodoSevrvice=(id,time)=>{
    return service.request({
        method:"put",
        url:'/todo/toggleState',
        data:{
            id:id,
            myEndTime:time
        }
    })
}
export const getTodoListService=()=>{
    return service.request({
        method:"get",
        url:'/todo/showAll'
    })
}