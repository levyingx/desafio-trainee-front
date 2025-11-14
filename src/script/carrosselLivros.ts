import type Livro from "./types/Livro"

const api = {
    url: 'https://thekaapi.pythonanywhere.com',
    endpoint: `/livros/`
}

async function getLivro(url: string, endpoint: string): Promise<Livro | null> {
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

async function getLivroById(url: string, endpoint: string, id: number): Promise<Livro | null> {
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

const livrosCache: { [key: number]: Livro } = {}

async function adicionarCapa(element: HTMLElement | null, livro: Livro | null) {
    if (element && livro) {
        const capa = document.createElement('img')
        capa.src = livro.capa || ''
        capa.alt = livro.titulo
        element.style.cursor = 'pointer'
        element.appendChild(capa)
    }
}

async function carregarLivros() {
    for (let i = 0; i < livroID.length; i++) {
        const bookId = livroID[i]
        const key = `livro-${bookId}`
        const storedLivro = localStorage.getItem(key)

        if (storedLivro) {
            try {
                // console.log(`puxando livro ${bookId} do localstorage`)
                livrosCache[bookId] = JSON.parse(storedLivro)
            } catch (err) {
                console.error('Erro ao fazer parse do cache:', err)
                localStorage.removeItem(key)
            }
        }

        if (!livrosCache[bookId]) {
            // console.log(`puxando livro ${bookId} da api`)
            const livro = await getLivroById(api.url, api.endpoint, bookId)
            if (livro) {
                livrosCache[bookId] = livro
                localStorage.setItem(key, JSON.stringify(livro))
            }
        }
    }
}

function displayCarrossel() {
    const carrosselElements = ['carrossel-element-1', 'carrossel-element-2', 'carrossel-element-3']
        .map(id => document.getElementById(id))

    carrosselElements.forEach(element => {
        if (element) {
            element.innerHTML = ''
        }
    })

    for (let i = 0; i < livroID.length; i++) {
        const bookId = livroID[i]
        const livro = livrosCache[bookId]
        adicionarCapa(carrosselElements[i], livro)
    }
}

const livroID = [20, 13, 6]

const carrosselContainer = document.getElementById('carrossel-container')
carrosselContainer?.addEventListener('click', () => {
    let first = livroID[0]
    livroID[0] = livroID[1]
    livroID[1] = livroID[2]
    livroID[2] = first
    
    displayCarrossel()
})

carregarLivros().then(() => displayCarrossel())