import axios from "axios";

class ApiController {

    constructor(userid) {

        this.api = axios.create({
            baseURL: "http://191.252.195.63:3001/", headers: {
                Authorization: "Bearer chave777",
                userid
            }
        })
    }


    async getTasksApi() {
        try {
            const response = await this.api.get("tasks")

            return response?.data?.data

        } catch (err) {
            console.log(err)
            return false
        }

    }

    async addNewTaskApi(text) {

        if (!text || typeof text != 'string') {
            console.log("Variavel 'text' não enviada na função addNewTaskApi")
            return false
        }

        try {
            const response = await this.api.post("task", { newtask: text })

            if (response?.status == 200) return true;

            return false

        } catch (err) {
            console.log(err)
            return false
        }

    }

    async deleteTaskApi(target) {

        const typeOfRequest = typeof target

        if (typeOfRequest != 'string' && typeOfRequest != "boolean") {
            return false
        }

        try {

            let response;
            const done = target ? "done" : "todo"

            if (typeOfRequest == 'string' && target?.length) response = await this.api.delete("task/" + target);
            if (typeOfRequest === 'boolean') response = await this.api.delete("task/" + done);

            if (response?.status == 200) return true;

            return false

        } catch (err) {
            console.log(err)
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

            if (response?.status == 200) return true;

            return false

        } catch (err) {
            console.log(err)
            return false
        }

    }

}

class Authorize {

    //http://191.252.195.63:3001/

    constructor() {
        this.api = axios.create({
            baseURL: "http://191.252.195.63:3001/",headers:{
                Authorization: "Bearer chave777"
            }
        })
    }

    async login(user, password) {

        if (!user || typeof user != 'string') return false
        if (!password || typeof password != 'string') return false

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

        if (!user || typeof user != 'string') return false
        if (!email || typeof email != 'string') return false
        if (!password || typeof password != 'string') return false

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