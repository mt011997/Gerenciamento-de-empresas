import { Requests } from "./model/api.js"

class Register{

    static async reg(){

        const nome      = document.getElementById("username")
        const email     = document.getElementById("email")
        const senha     = document.getElementById("password")
        const trabalho  = document.getElementById("trabalhoNivel")
        const button    = document.getElementById("btnRegistrar")

        button.addEventListener("click", async (event) =>{

            event.preventDefault()

            const data = {

                password: senha.value,
                email: email.value,
                professional_level: trabalho.value,
                username: nome.value
            }

            await Requests.registrar(data)

        })
    }
}

Register.reg()