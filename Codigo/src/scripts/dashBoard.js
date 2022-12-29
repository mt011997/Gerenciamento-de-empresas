import {
    Requests
} from "./model/api.js";

class DashBoard {

    static logOut() {
        const token = localStorage.getItem("@Empresa:token")
        const btnSair = document.querySelector(".logout")
        if (token == undefined) {
            window.location.assign("../../index.html")
        }

        btnSair.addEventListener("click", () => {
            localStorage.removeItem("@Empresa:token")
            localStorage.removeItem("@Empresa:User_id")
            window.location.assign("../../index.html")
        })
    }

    static async usuarioLogado() {

        const user = await Requests.todosUsuarios()
        const div = document.querySelector(".nav__container--usuario")
        const h2 = this.criaH2()
        const cite1 = this.criaCite(user.username)
        const p = this.criaP()
        const cite2 = this.criaCite(user.email)
        const button = this.criaBotao("Editar", "botao--geral")

        div.append(h2, p, button)
        h2.append(cite1)
        p.append(cite2)

        button.addEventListener("click", async (event) => {

            event.preventDefault()
            const section = document.querySelector(".modal--bcg")
            section.innerHTML = ""
            section.classList.toggle("hidden")

            const div1 = this.criaDiv("modal--container")
            const div2 = this.criaDiv("modal__container--dados")
            const div3 = this.criaDiv("container--inputs")
            const input1 = this.criaInput("input--geral", "text", "username", "Novo usuário")
            const input2 = this.criaInput("input--geral", "email", "username", "Novo email")
            const input3 = this.criaInput("input--geral", "senha", "username", "Nova Senha")
            const div4 = this.criaDiv("container--fechar")
            const btnFechar = this.criaBotao("Cancelar", "botao--geral")
            const btnEnviar = this.criaBotao("Enviar", "botao--geral")

            input1.value = user.username
            input2.value = user.email

            section.append(div1)
            div1.append(div2)
            div2.append(div3, div4)
            div3.append(input1, input2, input3)
            div4.append(btnEnviar, btnFechar)

            btnFechar.addEventListener("click", (event) => {
                event.preventDefault()
                section.classList.toggle("hidden")

            })

            btnEnviar.addEventListener("click", async (event) => {
                event.preventDefault()

                const data = {
                    username: input1.value,
                    email: input2.value,
                    password: input3.value
                }

                Requests.atualizarDados(data)
            })
        })
    }

    static criaH2() {
        const h2 = document.createElement("h2")
        h2.innerText = "Usuário: "
        return h2
    }

    static criaCite(dado) {
        const cite = document.createElement("cite")
        cite.innerText = dado
        return cite
    }

    static criaP() {
        const p = document.createElement("p")
        p.innerText = "Email: "
        return p
    }

    static criaBotao(text, classe) {
        const btn = document.createElement("button")
        btn.innerText = text
        btn.classList.add(classe)
        return btn
    }

    static criaDiv(classe) {
        const div = document.createElement("div")
        div.classList.add(classe)
        return div
    }

    static criaInput(classe, tipo, nome, placeholder) {
        const input = document.createElement("input")
        input.classList.add(classe)
        input.type = tipo
        input.name = nome
        input.id = nome
        input.placeholder = placeholder
        return input
    }

    static criaLi(classe) {
        const li = document.createElement("li")
        li.classList.add(classe)
        return li
    }

    static cria

    static async listarDepartamento() {

        const deps = await Requests.listaDep()
        const user = await Requests.todosUsuarios()
        
        if (deps.error) {
            const ul = document.querySelector(".departamentos")
            const li = this.criaLi()
            li.innerText = "No momento você está sem departamento. Espere até que um admin contrate você!"

            ul.append(li)

        } else {

            deps.departments.forEach(async (elem) => {

                if(elem.uuid == user.department_uuid) {
                    const ul = document.querySelector(".departamentos")
                    const li = this.criaLi()
                    li.innerText = elem.name
                    li.id = elem.uuid

                    ul.append(li)

                    const ulfuncionarios = document.querySelector(".listaFuncionarios")
                    ulfuncionarios.innerHTML = ""
                    const id = li.id
                    const func = await Requests.listarFuncionarios()

                    func.forEach((elem) => {

                        if (id == elem.uuid) {
                            elem.users.forEach((funcionarios) => {

                                const li = this.criaLi("funcionarios")
                                const h3 = document.createElement("h3")
                                const p1 = this.criaP2("Atua como: ")
                                const p2 = this.criaP2("Descrição: ")
                                const cite1 = this.criaCite(funcionarios.username)
                                const cite2 = this.criaCite(elem.name)
                                const cite3 = this.criaCite(elem.description)
                                
                                h3.innerText = "Usuário: "

                                ulfuncionarios.append(li)
                                li.append(h3, p1, p2)
                                h3.append(cite1)
                                p1.append(cite2)
                                p2.append(cite3)
                            })
                        }
                    })
                }
            });
        }
    }

    static async listarEmpresa() {

        const deps = await Requests.listaDep()

        if (deps.error) {
            const div1 = document.querySelector(".container--empresa")
            const p = document.createElement("p")
            p.innerText = "No momento você não tem uma Empresa, espere até que um admim contrate você!"

            div1.append(p)

        } else {

            const div1 = document.querySelector(".container--empresa")
            const h2 = document.createElement("h2")
            const cite = this.criaCite(deps.name)
            const p = document.createElement("p")
            const cite1 = this.criaCite(deps.description)
            const span = document.createElement("span")
            const cite2 = this.criaCite(deps.opening_hours)

            h2.innerText = "Empresa: "
            p.innerText = "Descrição: "
            span.innerText = "Horário de abertura: "

            div1.append(h2, p, span)
            h2.append(cite)
            p.append(cite1)
            span.append(cite2)
        }
    }

    static criaP2(descricao) {
        const p = document.createElement("p")
        p.innerText = descricao
        return p
    }

}

DashBoard.logOut()
DashBoard.usuarioLogado()
DashBoard.listarDepartamento()
DashBoard.listarEmpresa()