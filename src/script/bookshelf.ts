import type Livro from "./types/Livro"
import { api, getNovidades } from "./api"

async function carregarNovidades() {
    const novidades = await getNovidades(api.url, api.novidadesEndpoint)
    
    if (novidades) {
        displayEstante(novidades)
    }
}

function displayEstante(livros: Livro[]) {
    const titleElement = document.getElementById('title-element')
    const authorElement = document.getElementById('author-element')
    const titleElementMobile = document.getElementById('title-element-mobile')
    const authorElementMobile = document.getElementById('author-element-mobile')

    const bookElements = [
        'carousel-livro-1',
        'carousel-livro-2',
        'carousel-livro-3',
        'carousel-livro-4',
        'carousel-livro-5'
    ].map(id => document.getElementById(id))

    const bookElementsMobile = [
        'carousel-livro-mobile-1',
        'carousel-livro-mobile-2',
        'carousel-livro-mobile-3',
        'carousel-livro-mobile-4',
        'carousel-livro-mobile-5'
    ].map(id => document.getElementById(id))

    livros.forEach((livro, index) => {
        // Desktop books
        const bookDiv = bookElements[index]
        if (bookDiv && livro) {
            bookDiv.innerHTML = ''
            const img = document.createElement('img')
            img.src = livro.capa || ''
            img.alt = livro.titulo
            bookDiv.appendChild(img)

            const arrowIcon = document.createElement('img')
            arrowIcon.className = 'book-arrow-icon'
            arrowIcon.alt = 'View book'
            arrowIcon.src = '../assets/icons/arrow_right.svg'
            bookDiv.appendChild(arrowIcon)

            if (index === 0) {
                bookDiv.classList.add('active')
                if (titleElement) titleElement.textContent = livro.titulo
                if (authorElement) authorElement.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            } else {
                arrowIcon.classList.add('rotate-up')
            }

            bookDiv.addEventListener('click', () => {
                bookElements.forEach((el) => {
                    el?.classList.remove('active')
                    const arrow = el?.querySelector('.book-arrow-icon') as HTMLImageElement
                    if (arrow) arrow.classList.add('rotate-up')
                })
                bookDiv.classList.add('active')
                arrowIcon.classList.remove('rotate-up')
                if (titleElement) titleElement.textContent = livro.titulo
                if (authorElement) authorElement.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            })
        }

        // Mobile books
        const bookDivMobile = bookElementsMobile[index]
        if (bookDivMobile && livro) {
            bookDivMobile.innerHTML = ''
            const imgMobile = document.createElement('img')
            imgMobile.src = livro.capa || ''
            imgMobile.alt = livro.titulo
            bookDivMobile.appendChild(imgMobile)

            const arrowIconMobile = document.createElement('img')
            arrowIconMobile.className = 'book-arrow-icon'
            arrowIconMobile.alt = 'View book'
            arrowIconMobile.src = '../assets/icons/arrow_right.svg'
            bookDivMobile.appendChild(arrowIconMobile)

            if (index === 0) {
                bookDivMobile.classList.add('active')
                if (titleElementMobile) titleElementMobile.textContent = livro.titulo
                if (authorElementMobile) authorElementMobile.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            } else {
                arrowIconMobile.classList.add('rotate-up')
            }

            bookDivMobile.addEventListener('click', () => {
                bookElementsMobile.forEach((el) => {
                    el?.classList.remove('active')
                    const arrow = el?.querySelector('.book-arrow-icon') as HTMLImageElement
                    if (arrow) arrow.classList.add('rotate-up')
                })
                bookDivMobile.classList.add('active')
                arrowIconMobile.classList.remove('rotate-up')
                if (titleElementMobile) titleElementMobile.textContent = livro.titulo
                if (authorElementMobile) authorElementMobile.textContent = `${livro.autor} - ${livro.ano_publicacao}`
            })
        }
    })
}

carregarNovidades()

// Filter popup functionality
const filterBtn = document.getElementById('filter-btn')
const filterPopup = document.getElementById('filter-popup')

filterBtn?.addEventListener('click', () => {
    if (filterPopup) {
        filterPopup.style.display = 'flex'
    }
})

filterPopup?.addEventListener('click', (e) => {
    if (e.target === filterPopup) {
        filterPopup.style.display = 'none'
    }
})

const filtrarBtn = document.getElementById('filtrar-btn')
filtrarBtn?.addEventListener('click', () => {
    if (filterPopup) {
        filterPopup.style.display = 'none'
    }
})
