import { Requests } from "./model/api.js"

class Login {

    //Login
    static async log(){

        const email = document.getElementById("email")
        const senha = document.getElementById("password")
        const button = document.getElementById("buttonLogin")

        button.addEventListener("click", (event) => {

            event.preventDefault()

            const data = {
                email: email.value,
                password: senha.value
            }
            
            Requests.login(data)
        })
    }

    //Pega array de empresas e envia para renderizar
    static async empresa(){
        const emp = await Requests.listarEmpresas()
        this.renderizarEmpresas(emp)
    }

    //Renderiza empresas
    static async renderizarEmpresas(array){

        const ul = document.querySelector(".cardEmpresa")
        const empresas = await array
        ul.innerHTML = ""

        empresas.forEach((elem) => {
                
            const li = document.createElement("li")
            const h2 = this.criaH2(elem.name)
            const p  = this.criaP(elem.description)
            const span = this.criaSpan(elem.opening_hours)

            ul.append(li)
            li.append(h2,p,span)

            return ul
        });

    }

    //Cria tag H2
    static criaH2(nomeEmpresa){
        const h2 = document.createElement("h2")
        h2.innerText = nomeEmpresa
        return h2
    }

    //Cria tag P
    static criaP(descricao){
        const p = document.createElement("p")
        p.innerText = descricao
        return p
    }

    //Cria tag Span
    static criaSpan(horario){
        const span = document.createElement("span")
        span.innerText = `Abre às: ${horario} hrs.`
        return span
    }

    //Lista todos departamentos
    static async todosDepartamentos(){
        const todos = document.getElementById("companies")

            todos.addEventListener("click", async () => {
                const ul = document.querySelector(".cardEmpresa")
                ul.innerHTML = ""
                this.empresa()
            })
    }

    //Filtra Departamentos
    static async departamentos(){
        
        const empresa = await Requests.listarEmpresas()
        const dep = []

        empresa.forEach((elem) =>{
            dep.push(elem.sectors.description)
        })

        const filtro = new Set(dep)
        
        filtro.forEach((elem)=>{

            const div = document.querySelector(".container--categoria")
            const p = document.createElement("p")
            p.innerText = elem
            p.id = elem

            div.append(p)
            
            p.addEventListener("click", async () =>{

                let id = p.id
                const dep = await Requests.filtroDepartamento(id)
                this.renderizarEmpresas(dep)
               
            })
        
        })
        
    }
       

}

Login.log()
Login.empresa()
Login.departamentos()
Login.todosDepartamentos()
