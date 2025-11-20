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

const resetForm = document.getElementById('form-recuperar')

if (resetForm) {
    resetForm.onsubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(resetForm as HTMLFormElement)
        const email = formData.get('email')

        try {
            const response = await fetch(api.url + '/auth/password/reset/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email
                })
            })

            const data: {message: string} = await response.json()
            console.log('Response:', data.message)

            if (response.ok) {
                window.alert(data.message)
                window.location.href = 'login.html'
            } else {
                window.alert('Erro ao enviar e-mail de recuperação.')
            }
        } catch (error) {
            console.log('Erro ao recuperar senha: ', error)
            alert('Erro ao enviar e-mail de recuperação.')
        }
    }
}