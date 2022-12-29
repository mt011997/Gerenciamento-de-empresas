import { Toast } from "../toastify.js";

export class Requests {

    static baseUrl = "http://localhost:6278/"
    static token   = localStorage.getItem("@Empresa:token")
    static userId  = localStorage.getItem("@Empresa:User_id")
    static headers = {
        "Content-Type": "application/json",
        authorization: `Token ${this.token}`
    }
    static tokenAdm = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTZmOWVhZGItNjNmMC00NjVhLWIwZWMtNmJjMjJmZWNiMWE1IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MjY0ODcxMiwiZXhwIjoxNjYzNTEyNzEyLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.B-rH3GKSOD85RxYxWqRy0HmAk9sers7t8CeDBRNiMlQ"

    //Registrar
    static async registrar(data){
        const regi = await fetch(`${this.baseUrl}auth/register/user`,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })

        .then(res => res.json())
        .then(res => {
            if(res.error == undefined){
                
                Toast.create("Cadastro Realizado com sucesso", "green") 
                setTimeout(() => {
                    window.location.replace("../../index.html")
                }, 900)

            }else{
                
                Toast.create(res.error, "red") 
            }
        })

        .catch(err => {
            console.log(err)
            Toast.create(err.error, "#ff0000")
        })
    }

    //Login
    static async login(data){
        const log = await fetch(`${this.baseUrl}auth/login`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error == undefined && res.is_admin == false){
                
                localStorage.setItem("@Empresa:token", res.token)
                localStorage.setItem("@Empresa:User_id", res.uuid)

                Toast.create("Login realizado com sucesso", "green") 
                setTimeout(() => {
                    window.location.replace("./src/pages/dashBoard.html")
                }, 900)

            }else if(res.error == undefined && res.is_admin == true){

                localStorage.setItem("@Empresa:token", res.token)
                localStorage.setItem("@Empresa:User_id", res.uuid)
                
                Toast.create("Login realizado com sucesso", "green")      
                setTimeout(() => {
                    window.location.replace("./src/pages/dashBoardAdmim.html")
                }, 900)

            }else{
                Toast.create(res.error, "red") 
            }
        })

        .catch((err) => {
            Toast.create(err.error, "#ff0000")
        })

    }

    //Listar Empresas
    static async listarEmpresas(){
        const empresas = await fetch(`${this.baseUrl}companies`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return empresas
    }

    //Filtrar departamentos
    static async filtroDepartamento(id){
        const departamento = await fetch(`${this.baseUrl}companies/${id}`, {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return departamento
    }

    //Listar usuário logado
    static async todosUsuarios(){
        const usuarios = await fetch(`${this.baseUrl}users/profile`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return usuarios
    }

    //Atualiza Dados
    static async atualizarDados(data){
        console.log(data)
        const atualizaUser = await fetch(`${this.baseUrl}users`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res)
        .then(res => {

            if(res.error == undefined){
                Toast.create("Usuário atualizado com sucesso", "green")
                setTimeout(() => {
                   location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
            
        })
        .catch(err => console.log(err))
    }

    //Lista Departamentos do usuario logado
    static async listaDep(){
        const derps = await fetch(`${this.baseUrl}users/departments`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return derps
    }

    static async listarFuncionarios(){
        const funcionarios = await fetch(`${this.baseUrl}users/departments/coworkers`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return funcionarios
    }

    static async listaSetores(){
        const setores = await fetch(`${this.baseUrl}sectors`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return setores
    }

    static async listarDepsEmpresa(id){
        const depsEmpresa = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return depsEmpresa

    }

    static async listarDepartamentos(){
        const departamentos = await fetch(`${this.baseUrl}departments`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return departamentos

    }

    static async listarUsuarios(){
        const usuarios = await fetch(`${this.baseUrl}users`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return usuarios
    }

    static async listarFuncionariosSemDP(){
        const semDP = await fetch(`${this.baseUrl}admin/out_of_work`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        return semDP
    }

    static async criarEmpresa(data){
        const novaEmpresa = await fetch(`${this.baseUrl}companies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error == undefined){
                Toast.create("Empresa criada com sucesso", "green")
                setTimeout(() => {
                   location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return novaEmpresa
    }

    static async editarDepartamento(id,data){
        const depEditado = await fetch(`${this.baseUrl}departments/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error == undefined){
                Toast.create("Departamento Editado com sucesso", "green")
                setTimeout(() => {
                   location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return depEditado
    }

    static async deletarDepartamento(id){
        const deletarDep = await fetch(`${this.baseUrl}departments/${id}`,{
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => {
            if(res.error == undefined){
                Toast.create("Departamento deletado com sucesso", "green")
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return deletarDep
    }

    static async admAtualizaFuncionario(data, id){
        const depEditado = await fetch(`${this.baseUrl}admin/update_user/${id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.error == undefined){
                Toast.create("Funcionário Editado com sucesso", "green")
                setTimeout(() => {
                   location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return depEditado
    }

    static async deletarUsuario(id){
        const deletarUser = await fetch(`${this.baseUrl}admin/delete_user/${id}`,{
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => {
            if(res.error == undefined){
                Toast.create("Usuário deletado com sucesso", "green")
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return deletarUser

    } 

    static async demitirFuncionario(id){
        const demitirUser = await fetch(`${this.baseUrl}departments/dismiss/${id}`,{
            method: "PATCH",
            headers: this.headers,
        })
        .then(res => {
            if(res.error == undefined){
                Toast.create("Funcionário demitido com sucesso", "green")
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return demitirUser
    }

    static async contratarFuncionario(data){
        const contratarUser = await fetch(`${this.baseUrl}departments/hire/`,{
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.error == undefined){
                Toast.create("Funcionário contratado com sucesso", "green")
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return contratarUser
    }

    static async criaDepartamento(data){
        const criaDep = await fetch(`${this.baseUrl}departments`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.error == undefined){
                Toast.create("Departamento criado com sucesso", "green")
                setTimeout(() => {
                    location.reload()
                }, 2000)
            }else{
                Toast.create(res.error, "red") 
            }
        })
        .catch(err => console.log(err))

        return criaDep
    }
}

   

