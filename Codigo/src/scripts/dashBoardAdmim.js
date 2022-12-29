import { Requests } from "./model/api.js"

class Admin{

    static logOut(){
        const token = localStorage.getItem("@Empresa:token")
        const btnSair = document.querySelector(".logout")
        if(token == undefined){
            window.location.assign("../../index.html")
        }

        btnSair.addEventListener("click", () =>{
            localStorage.removeItem("@Empresa:token")
            localStorage.removeItem("@Empresa:User_id")
            window.location.assign("../../index.html")
        })
    }

    static async renderEmpresas(){
        const div1 = document.querySelector(".container--empresas")
        const h2   = this.criaH2Titulo("Empresas")
        const ul   = this.criaUl("empresas")

        const empresas = await Requests.listarEmpresas()

        empresas.forEach( async (elem) =>{
            
            const li = this.criaLi("liGeral")
            const h3 = this.criaH3(elem.name)         
            const p1  = this.criaP("Descrição: ")
            const cite = document.createElement("cite")
            const p2 = this.criaP("Setor: ")
            const cite2 = document.createElement("cite")
            const p3 = this.criaP("Departamentos:")
            const span = this.criaSpan1("Não Possui")

            cite.innerText = elem.description
            cite2.innerText = elem.sectors.description
            const idEmpresa = elem.uuid
            const dadosEmpresa = await Requests.listarDepsEmpresa(idEmpresa)

            div1.append(h2,ul)
            ul.append(li)
            li.append(h3,p1,p2,p3,span)
            p1.append(cite)
            p2.append(cite2)
            
            dadosEmpresa.forEach((elem2) => {             
               
                const idEmpresa2 = elem2.companies.uuid
                
                if(idEmpresa == idEmpresa2){
                    span.remove()
                    const span1 = this.criaSpan1(elem2.name)
                    li.append(span1)
                }

            })
        })

    }

    static async renderSetores(){

        const btnShow = document.getElementById("setores")
        const divMain = document.querySelector(".main__container--mostrarOpcoes")
        const div1    = this.criaDiv("container--setores", "hidden")
        const h2      = this.criaH2Titulo("Setores")
        const ul      = this.criaUl("setores")
       
        const setores = await Requests.listaSetores()

        setores.forEach((elem) => {
            
            const li = this.criaLi("liGeral")
            const h3 = this.criaH3(elem.description)
            const btnCadastrar = this.criaBtn("Cadastrar Empresa", "botao--geral")
            btnCadastrar.id = elem.uuid

            divMain.append(div1)
            div1.append(h2,ul)
            ul.append(li)
            li.append(h3,btnCadastrar)

            btnCadastrar.addEventListener("click", () =>{

                const idSetor = btnCadastrar.id

                const section = document.querySelector(".modal")
                section.innerHTML = ""
                section.classList.toggle("hidden")

                const div1   = this.criaDiv("modal--container")
                const input1 = this.criaInput("input--geral", "text", "nomeEmpresa", "Nome da Empresa")
                const input2 = this.criaInput("input--geral", "text", "horario", "Horariro de Abertura")
                const input3 = this.criaInput("input--geral", "text", "descricao", "Descrição da Empresa")
                const div2   = this.criaDiv("botoesModal")
                const btn1   = this.criaBtn("Criar", "botao--geral")  
                const btn2   = this.criaBtn("Cancelar", "botao--geral")     
                
                divMain.append(section)
                section.append(div1)
                div1.append(input1,input2,input3,div2)
                div2.append(btn1,btn2)

                btn2.addEventListener("click", () =>{
                    section.classList.toggle("hidden")
                })

                btn1.addEventListener("click", () => {

                    const data = {
                        name: input1.value,
                        opening_hours: input2.value,
                        description: input3.value,
                        sector_uuid: idSetor
                    }

                    Requests.criarEmpresa(data)
                })
            }) 
        })

        btnShow.addEventListener("click", () =>{
                div1.classList.toggle("hidden")
        })      
    }

    static async renderDepartamentos(){

        const btnShow = document.getElementById("departamentos")
        const divMain = document.querySelector(".main__container--mostrarOpcoes")
        const div1    = this.criaDiv("container--departamentos", "hidden")
        const div3    = this.criaDiv("depCriar")
        const h2      = this.criaH2Titulo("Departamentos")
        const btnCria = this.criaBtn("Criar Departamento", "botao--geral")
        const ul      = this.criaUl("departamentos")

        div3.append(h2,btnCria)

        btnCria.addEventListener("click", async ()=>{
                
            const section = document.querySelector(".modal")
            section.innerHTML = ""
            section.classList.toggle("hidden")
            
            const div1    = this.criaDiv("modal--container")
            const h3      = this.criaH3("Criar Departamento")
            const input1  = this.criaInput("input--geral","text","nomeDep","Nome do Departamento")
            const input2  = this.criaInput("input--geral","text","descricaoDep","Descrição do Departamento")
            const select  = this.criaSelect("Empresas", "input--geral")
            const empresas = await Requests.listarEmpresas()
            empresas.forEach((elem) =>{
                const option = this.criaOption(`Empresa: ${elem.name}`)
                option.value = elem.uuid
                select.append(option)
            })
            const div2 = this.criaDiv("botoesModal")
            const btnCriar = this.criaBtn("Criar","botao--geral")
            const btnCancelar = this.criaBtn("Cancelar", "botao--geral")

            section.append(div1)
            div1.append(h3,input1,input2,select,div2)
            div2.append(btnCriar,btnCancelar)

            btnCancelar.addEventListener("click", ()=>{
                section.classList.toggle("hidden")
            })
            btnCriar.addEventListener("click", () =>{
                const data = {
                    name: input1.value,
                    description: input2.value,
                    company_uuid: select.value
                }
                Requests.criaDepartamento(data)

            })
        })

        const departs = await Requests.listarDepartamentos()
        departs.forEach((elem) => {
            
            const li = this.criaLi("liGeral")
            const h3 = this.criaH3(elem.name)
            const p  = this.criaP(elem.description)
            const div2 = this.criaDiv("departamentos--botao")
            const btn1 = this.criaBtn("Editar", "botao--geral")
            const btn2 = this.criaBtn("Deletar", "botao--geral")

            btn1.id = elem.uuid
            btn2.id = elem.uuid

            divMain.append(div1)
            div1.append(div3, ul)
            ul.append(li)
            li.append(h3,p,div2)
            div2.append(btn1,btn2)

            btn1.addEventListener("click", ()=>{
                const id = btn1.id
                const section = document.querySelector(".modal")
                section.innerHTML = ""
                section.classList.toggle("hidden")

                const div1   = this.criaDiv("modal--container")
                const input  = this.criaInput("input--geral","text", "descricao","Descrição do Departamento")
                const div2   = this.criaDiv("botoesModal")
                const btnConfirma = this.criaBtn("Confirmar","botao--geral")
                const btnCancela  = this.criaBtn("Cancelar", "botao--geral")

                section.append(div1)
                div1.append(input,div2)
                div2.append(btnConfirma,btnCancela)

                btnCancela.addEventListener("click", () =>{
                    section.classList.toggle("hidden")
                })

                btnConfirma.addEventListener("click", ()=>{
                    const data = {
                        description: input.value
                    }
                    Requests.editarDepartamento(id, data)
                })

            })

            btn2.addEventListener("click", () =>{
                const id = btn2.id
                const section = document.querySelector(".modal")
                section.innerHTML = ""
                section.classList.toggle("hidden")

                const div1 = this.criaDiv("modal--container")
                const h3   = this.criaH3("Deseja deletar o departamento?")
                const div2 = this.criaDiv("botoesModal")
                const btnSim = this.criaBtn("Sim", "botao--geral")
                const btnNao = this.criaBtn("Não", "botao--geral")

                section.append(div1)
                div1.append(h3,div2)
                div2.append(btnSim,btnNao)

                btnNao.addEventListener ("click", ()=>{
                    section.classList.toggle("hidden")
                })
                btnSim.addEventListener ("click", ()=>{
                    Requests.deletarDepartamento(id)
                })
            })

        })

        btnShow.addEventListener("click", () =>{
            div1.classList.toggle("hidden")
        })
        
    }

    static async renderFuncionarios(){

        const btnShow = document.getElementById("funcionarios")
        const divMain = document.querySelector(".main__container--mostrarOpcoes")
        const div1    = this.criaDiv("container--funcionarios", "hidden")
        const h2      = this.criaH2Titulo("Funcionários")
        const ul      = this.criaUl("funcionarios")

        const deps = await Requests.listarDepartamentos()
        const usuarios = await Requests.listarUsuarios()
        
        usuarios.forEach( async (elem) => {
            const idDep = elem.department_uuid

            if(elem.is_admin == false){
                
                const li = this.criaLi("liGeral")
                const h3 = this.criaH3(elem.username)
                const span1 = this.criaSpan1("Nível: ") 
                const cite1 = this.criaCite(elem.professional_level)
                const span2 = this.criaSpan1("Tipo de trabalho: ")
                const cite2 = this.criaCite(elem.kind_of_work)
                const span3 = this.criaSpan1("Departamento: ")
                const div2  = this.criaDiv("funcionarios--botao")
                const btn1  = this.criaBtn("Editar", "botao--geral")
                const btn2  = this.criaBtn("Deletar", "botao--geral")
                const cite3 = this.criaCite("Não Possui")

                btn1.id = elem.uuid
                btn2.id = elem.uuid

                divMain.append(div1)
                div1.append(h2,ul)
                ul.append(li)
                li.append(h3,span1,span2,span3,div2)
                span1.append(cite1)
                span2.append(cite2)
                span3.append(cite3)
                div2.append(btn1,btn2)

                if(elem.department_uuid !== null){
                    const btn3  = this.criaBtn("Demitir", "botao--geral")
                    btn3.id = elem.uuid
                    div2.append(btn3)

                    btn3.addEventListener("click", ()=>{
                        const id = btn3.id
                        
                        const section = document.querySelector(".modal")
                        section.innerHTML = ""
                        section.classList.toggle("hidden")

                        const div1 = this.criaDiv("modal--container")
                        const h3   = this.criaH3("Demitir Funcionário?")
                        const btnSim = this.criaBtn("Sim", "botao--geral")
                        const btnNao = this.criaBtn("Não", "botao--geral")

                        section.append(div1)
                        div1.append(h3,btnSim,btnNao)

                        btnNao.addEventListener("click", ()=>{
                            section.classList.toggle("hidden")
                        })
                        btnSim.addEventListener("click", () =>{
                            Requests.demitirFuncionario(id)
                        })
                    })
                }

                deps.forEach((elem2) => {
                    const idDep2 = elem2.uuid

                    if(idDep == idDep2){
                        
                        cite3.innerText = elem2.name
                        const span4 = this.criaSpan1("Empresa: ")
                        const cite4 = this.criaCite(elem2.companies.name)
                        
                        span3.append(cite3)
                        li.append(span4)
                        span4.append(cite4)
                    }
                })

                btn1.addEventListener("click", ()=>{
                    const id = btn1.id
                    const section = document.querySelector(".modal")
                    section.innerHTML = ""
                    section.classList.toggle("hidden")

                    const div1 = this.criaDiv("modal--container")
                    const h3   = this.criaH3("Editar Dados")
                    const select = this.criaSelect("TipoTrabalho", "input--geral")
                    const opt1   = this.criaOption("home office")
                    const opt2   = this.criaOption("presencial")
                    const opt3   = this.criaOption("hibrido")
                    const select2 = this.criaSelect("trabalhoNivel","input--geral")
                    const option1 = this.criaOption("estágio")
                    const option2 = this.criaOption("júnior")
                    const option3 = this.criaOption("pleno")
                    const option4 = this.criaOption("sênior")
                    const div2    = this.criaDiv("botoesModal")
                    const btnConfirma = this.criaBtn("Confirmar", "botao--geral")
                    const btnCancela  = this.criaBtn("Cancelar", "botao--geral")

                    section.append(div1)
                    div1.append(h3,select,select2,div2)
                    select.append(opt1,opt2,opt3)
                    select2.append(option1,option2,option3,option4)
                    div2.append(btnConfirma, btnCancela)

                    btnCancela.addEventListener("click", () =>{
                        section.classList.toggle("hidden")
                    })

                    btnConfirma.addEventListener("click", ()=>{
                        const data = {
                            kind_of_work: select.value,
                            professional_level: select2.value
                        }
                        Requests.admAtualizaFuncionario(data, id)
                    })
                })

                btn2.addEventListener("click", ()=>{
                    const id = btn2.id
                    const section = document.querySelector(".modal")
                    section.innerHTML = ""
                    section.classList.toggle("hidden")

                    const div1 = this.criaDiv("modal--container")
                    const h3   = this.criaH3("Deseja deletar o Usuário?")
                    const btnSim = this.criaBtn("Sim", "botao--geral")
                    const btnNao = this.criaBtn("Não", "botao--geral")

                    section.append(div1)
                    div1.append(h3,btnSim,btnNao)
        
                    btnNao.addEventListener("click", () =>{
                        section.classList.toggle("hidden")
                    })
                    btnSim.addEventListener("click", ()=>{
                        Requests.deletarUsuario(id)
                    })
                })
            }
        })

        btnShow.addEventListener("click", () =>{
            div1.classList.toggle("hidden")
        })
    }

    static async renderFuncionariosSemDP(){
        const btnShow = document.getElementById("semDep")
        const divMain = document.querySelector(".main__container--mostrarOpcoes")
        const div1 = this.criaDiv("container--funcionarioSemDp", "hidden")
        const h2   = this.criaH2Titulo("Funcionarios sem Departamento")
        const ul   = this.criaUl("semDep")

        const semDP = await Requests.listarFuncionariosSemDP()
        
        semDP.forEach((elem) => {

            if(elem.is_admin == false){

                const li = this.criaLi("liGeral")
                const h3 = this.criaH3(elem.username)
                const span1 = this.criaSpan1("Nível: ")
                const cite1 = this.criaCite(elem.professional_level)
                const span2 = this.criaSpan1("Tipo de Trabalho: ")
                const cite2 = this.criaCite(elem.kind_of_work)
                const span3 = this.criaSpan1("Email: ")
                const cite3 = this.criaCite(elem.email)
                const btn1  = this.criaBtn("Contratar", "botao--geral")
                
                btn1.id = elem.uuid

                divMain.append(div1)
                div1.append(h2,ul)
                ul.append(li)
                li.append(h3,span1,span2,span3,btn1)
                span1.append(cite1)
                span2.append(cite2)
                span3.append(cite3)

                btn1.addEventListener("click", async ()=>{
                    const id = btn1.id
                    const section = document.querySelector(".modal")
                    section.innerHTML = ""
                    section.classList.toggle("hidden")

                    const div1 = this.criaDiv("modal--container")
                    const select = this.criaSelect("departamentos", "input--geral")
                    const departamentos = await Requests.listarDepartamentos()
                    departamentos.forEach((elem) =>{
                    
                        const option = this.criaOption(`Empresa: ${elem.companies.name} // Departamento: ${elem.name}`)
                        option.value = elem.uuid
                        select.append(option)
                    })
                    const div2         = this.criaDiv("botoesModal")
                    const btnContratar = this.criaBtn("Contratar", "botao--geral")
                    const btnCancelar  = this.criaBtn("Cancelar", "botao--geral")

                    section.append(div1)
                    div1.append(select,div2)
                    div2.append(btnContratar,btnCancelar)
                    
                    btnCancelar.addEventListener("click", ()=>{
                        section.classList.toggle("hidden")
                    })
                    btnContratar.addEventListener("click", ()=>{
                        const data = {
                            user_uuid:id,
                            department_uuid: select.value
                        }                      
                        Requests.contratarFuncionario(data)
                    })
                })
            } 

        })

        btnShow.addEventListener("click", () =>{
            div1.classList.toggle("hidden")
        })

    }

    static criaDiv(classe, classe1){
        const div = document.createElement("div")
        div.classList.add(classe)
        div.classList.add(classe1)
        return div
    }

    static criaUl(classe){
        const ul = document.createElement("ul")
        ul.classList.add(classe)
        return ul
    }

    static criaH2Titulo(titulo){
        const h2 = document.createElement("h2")
        h2.innerText = titulo
        return h2
    }

    static criaLi(classe){
        const li = document.createElement("li")
        li.classList.add(classe)
        return li
    }

    static criaH3(titulo){
        const h3 = document.createElement("h3")
        h3.innerText = titulo
        return h3
    }

    static criaBtn(texto, classe){
        const btn = document.createElement("button")
        btn.innerText = texto
        btn.classList.add(classe)
        return btn
    }

    static criaP(texto){
        const p = document.createElement("p")
        p.innerText = texto
        return p
    }

    static criaSpan1(texto){
        const span = document.createElement("span")
        span.innerText = texto
        return span
    }

    static criaCite(texto){
        const cite = document.createElement("cite")
        if(texto == null){
            cite.innerText = "Não possui"
        }else{
            cite.innerText = texto
        }
        return cite
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

    static criaSection(classe){
        const section = document.createElement("section")
        section.classList.add(classe)
        return section
    }

    static criaSelect(id, classe){
        const select = document.createElement("select")
        select.id    = id
        select.classList.add(classe)
        return select
    }

    static criaOption(nome){
        const option = document.createElement("option")
        option.innerText = nome
        return option
    }

}

Admin.logOut()
Admin.renderSetores()
Admin.renderEmpresas()
Admin.renderDepartamentos()
Admin.renderFuncionarios()
Admin.renderFuncionariosSemDP()