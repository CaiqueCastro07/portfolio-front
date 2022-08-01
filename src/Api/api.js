import axios from "axios";

class ApiController {

    constructor(userid) {

        this.api = axios.create({
            baseURL: "https://portfoliocaique.click/", headers: {
                Authorization: "Bearer chave777",
                userid
            }
        })

        this.goApi = axios.create({
            baseURL: "https://portfoliocaique.click/goapi/", headers: {
                Authorization: "Bearer chave777"
            }
        })
    }

    async getTasksApi() {

        try {
            
            const response = await this.api.get("tasks")

            return response?.data?.data

        } catch (err) {
            console.log("##getTasksApi()",err)
            return false
        }

    }

    async addNewTaskApi(text) {

        if (!text || typeof text != 'string') {
            console.log("##addNewTaskApi() ","text is not a string")
            return false
        }

        try {
            const response = await this.api.post("task", { newtask: text })

            if (response?.status == 200) return true;

            return false

        } catch (err) {
            console.log("##addNewTaskApi()",err)
            return false
        }

    }

    async deleteTaskApi(target) {

        const typeOfRequest = typeof target

        if (typeOfRequest != 'string' && typeOfRequest != "boolean") {
            console.log("##deleteTaskApi() ","target is not a string neither a boolean")
            return false
        }

        try {

            let response;

            const done = target ? "done" : "todo"

            if (typeOfRequest == 'string' && target?.length) response = await this.api.delete("task/" + target);
            if (typeOfRequest === 'boolean') response = await this.api.delete("task/" + done);

            if (response?.status != 200) return false;

            return true

        } catch (err) {
            console.log("##deleteTaskApi()",err)
            return false
        }
    }

    async editTaskApi(target, change) {

        if (!target || typeof target != 'string') {
            return false
        }
        if (typeof change != 'string' && typeof change != 'boolean') {
            return false
        }

        try {

            const response = await this.api.put("task/" + target, { val: change })

            if (response?.status != 200) return false;

            return true

        } catch (err) {
            console.log("##editTaskApi()",err)
            return false
        }

    }

    async sendMessageApi(name, email, message) {

        if(![name,email,message].every((e)=>typeof e == 'string' && e)){
            console.log("##sendMessageApi() - name, email or message is not a string",)
            return
        }

        name = name?.trim()
        email = email?.trim()?.toLowerCase()
        message = message?.trim()

        try {

            const response = await this.goApi.post("message", { name:name || "anonymous", email, message })

            if (response?.status != 200) return false;

            return true

        } catch (err) {
            console.log("##sendMessageApi()",err)
            return false
        }

    }

}

class Authorize {

    //http://191.252.195.63:3001/

    constructor() {
        this.api = axios.create({
            baseURL: "https://portfoliocaique.click/", headers: {
                Authorization: "Bearer chave777"
            }
        })
    }

    async login(user, password) {

        if(![user,password].every((e)=>typeof e == 'string' && e)){
            console.log("##login() - user or password is not a string",)
            return
        }

        user = user?.trim()?.toLowerCase()
        password = password?.trim()

        try {
            const response = await this.api.post("login", { user, password })

            if (response?.status != 200) {
                return response?.data
            }

            return response?.data

        } catch (err) {
            return err?.response?.data || { error: "Erro desconhecido, o servidor pode estar offline..." }
        }

    }

    async registerUser(user, email, password) {

        if(![user,password].every((e)=>typeof e == 'string' && e)){
            console.log("##registeUser() - user, email or password is not a string",)
            return
        }

        user = user?.trim()?.toLowerCase()
        password = password?.trim()
        email = email?.trim()?.toLowerCase()

        try {
            const response = await this.api.post("register", { user, email, password })

            if (response?.status != 200) {
                return response?.data
            }

            return response?.data

        } catch (err) {
            return err?.response?.data || { error: "Erro desconhecido, o servidor pode estar offline..." }
        }
    }

}

export {
    ApiController,
    Authorize
}