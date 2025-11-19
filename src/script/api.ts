import type Livro from './types/Livro'
import type Catalogo from './types/Catalogo'
import type { Novidades } from './types/Novidades'

export const api = {
    url: 'https://thekaapi.pythonanywhere.com',
    livrosEndpoint: `/livros/`,
    novidadesEndpoint: `/livros/novidades`,
    authEndpoint: `/auth/token/`
}

export async function getCatalogo(url: string, endpoint: string, page?: string): Promise<Catalogo | null> {
    try {
        const fetchUrl = page || (url + endpoint)
        const response = await fetch(fetchUrl)
        if (!response.ok) {
            throw new Error(`Erro no response: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error('Erro:', err)
        return null
    }
}

export async function getLivroById(url: string, endpoint: string, id: number): Promise<Livro | null> {
    try {
        const response = await fetch(url + endpoint + id)
        if (!response.ok) {
            throw new Error(`Erro no response: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error('Erro:', err)
        return null
    }
}

export async function getNovidades(url: string, endpoint: string): Promise<Novidades | null> {
    try {
        const response = await fetch(url + endpoint)
        if (!response.ok) {
            throw new Error(`Erro no response: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error('Erro:', err)
        return null
    }
}
