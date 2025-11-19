import { api } from "./api"
import type Token from "./types/Token"

const form = document.getElementById('form-login')
let token: Token;

if (form) {
    form.onsubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(form as HTMLFormElement)
        const email = formData.get('email')
        const senha = formData.get('senha')

        try {
            const response = await fetch(api.url + api.authEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            })

            const data = await response.json()

            if (response.status == 200 && data) {
                token = data
                window.location.href = '../index.html'
            }
        } catch (error) {
            console.log('Erro no login ', error)
        }
    }
}