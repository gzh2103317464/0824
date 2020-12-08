import axios from 'axios'
import { Form } from 'element-ui';
import qs from 'qs'

const baseUrl ='/api'

// 响应拦截
axios.interceptors.response.use(res => {
    console.log('========请求的路径:' + res.config.url + '===========');
    console.log(res);
    return res
})


// 菜单模块的请求
// 菜单添加
export const reqmenuAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:data
    })
}

// 菜单列表
export const reqmenuList=(data)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:data
    })
}

// 获取一条数据
export const reqmenuListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:data
    })
}

// 菜单列表编辑
export const reqMenuEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'POST',
        data:data
    })
}
// 菜单列表删除
export const reqMenuDel=(data)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:data
    })
}
/////////////////////////////角色管理////////////////////
// 角色添加
export const reqRoleAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:data
    })
}


// 角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}

// 角色获取
export const reqRoleListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:id
    })
}

// 角色修改
export const reqRoleEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:id
    })
}



// 角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:id
    })
}




/////////////////////////////管理员管理////////////////////
// 管理员添加
export const reqUserAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(data)
    })
}


// 管理员列表
export const reqUserList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:params
    })
}

// 管理员获取
export const reqUserListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/userinfo',    
        method:'get',
        params:id
    })
}

// 管理员修改
export const reqUserEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:id
    })
}
// 管理员总数
export const reqUserCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
    })
}



// 管理员删除
export const reqUserDel=(id)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:id
    })
}







/////////////////////////////商品管理////////////////////
// 商品添加
export const reqcateAdd=(data)=>{
    // 由于上传的是文件，所以要用qs转一下
    var Form = new FormData()
    for(var i in data){
        Form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:Form
    })
}


// 商品列表
export const reqcateList=(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:params
    })
}

// 商品获取
export const reqcateListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',    
        method:'get',
        params:id
    })
}

// 商品修改
export const reqcateEdit=(data)=>{
    var Form = new FormData()
    for(var i in data){
        Form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:Form
    })
}
// 商品总数
// export const reqcateCount=()=>{
//     return axios({
//         url:baseUrl+'/api/catecount',
//         method:'get',
//     })
// }



// 商品删除
export const reqcateDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
    })
}





/////////////////////////////商品规格////////////////////
// 商品规格添加
export const reqspecAdd=(data)=>{
    // 由于上传的是文件，所以要用qs转一下
    var Form = new FormData()
    for(var i in data){
        Form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/specadd',
        method:'post',
        data:Form
    })
}


// 商品规格列表
export const reqspecList=(params)=>{
    return axios({
        url:baseUrl+'/api/speclist',
        method:'get',
        params:params
    })
}

// 商品规格获取
export const reqspecListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/specinfo',    
        method:'get',
        params:id
    })
}

// 商品规格修改
export const reqspecEdit=(data)=>{
    var Form = new FormData()
    for(var i in data){
        Form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/specedit',
        method:'post',
        data:Form
    })
}
// 商品规格总数
// export const reqspecCount=()=>{
//     return axios({
//         url:baseUrl+'/api/speccount',
//         method:'get',
//     })
// }



// 商品规格删除
export const reqspecDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specdelete',
        method:'post',
        data:id
    })
}