import type Livro from "./types/Livro"
import { api, getNovidades } from "./api"

async function carregarNovidades() {
    const novidades = await getNovidades(api.url, api.novidadesEndpoint)
    
    if (novidades) {
        displayEstante(novidades)
    }
}

function displayEstante(livros: Livro[]) {
    const estanteContainer = document.getElementById('estante-container')
    if (!estanteContainer) return

    const titleElement = document.getElementById('title-element')
    const authorElement = document.getElementById('author-element')

    estanteContainer.innerHTML = ''

    livros.forEach((livro, index) => {
        const bookDiv = document.createElement('div')
        bookDiv.className = 'estante-book'
        bookDiv.id = `carousel-livro-${index + 1}`

        const img = document.createElement('img')
        img.src = livro.capa || ''
        img.alt = livro.titulo
        bookDiv.appendChild(img)

        if (index === 0) {
            bookDiv.classList.add('active')
            if (titleElement) {
                titleElement.textContent = livro.titulo
            }
            if (authorElement) {
                authorElement.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            }
        }

        bookDiv.addEventListener('click', () => {
            const allBooks = estanteContainer.querySelectorAll('.estante-book')
            allBooks.forEach(book => book.classList.remove('active'))
            
            bookDiv.classList.add('active')
            
            if (titleElement) {
                titleElement.textContent = livro.titulo
            }
            if (authorElement) {
                authorElement.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            }
        })

        estanteContainer.appendChild(bookDiv)
    })
}

carregarNovidades()
