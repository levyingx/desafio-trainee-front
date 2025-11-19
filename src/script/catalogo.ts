import type Catalogo from "./types/Catalogo";
import { api, getCatalogo } from "./api"

let paginaAtual = 1
let data: Catalogo | null = await getCatalogo(api.url, api.livrosEndpoint)
let next: Catalogo | null = await getCatalogo(api.url, api.livrosEndpoint, data?.next)
let livroArray = data?.results ? [...data.results] : []

if (next?.results) {
    livroArray.push(...next.results)
}

function displayBooks(page: number) {
    const isTablet = window.innerWidth <= 768
    const livrosPerPage = isTablet ? 8 : 15
    const inicio = (page - 1) * livrosPerPage
    const fim = inicio + livrosPerPage
    const livros = livroArray.slice(inicio, fim)

    for (let i = 1; i <= 15; i++) {
        const livroElement = document.getElementById(`book-${i}`)
        if (livroElement) {
            livroElement.innerHTML = ''
            if (isTablet && i > 8) {
                livroElement.style.display = 'none'
            } else {
                livroElement.style.display = ''
            }
        }
    }

    livros.forEach((e, i) => {
        const element = document.getElementById(`book-${i + 1}`)
        if (element) {
            if (e.capa) {
                let capa = document.createElement('img')
                capa.src = e.capa
                element.appendChild(capa)
                element.style.backgroundColor = 'transparent'
                
                let infoOverlay = document.createElement('div')
                infoOverlay.className = 'livro-info-overlay'
                
                let titulo = document.createElement('span')
                titulo.className = 'livro-titulo'
                titulo.textContent = e.titulo
                
                let desc = document.createElement('span')
                desc.className = 'desc'
                desc.textContent = e.autor + ', ' + e.ano_publicacao.toString()
                

                let viewButton = document.createElement('button')
                viewButton.className = 'view-btn'
                
                let icon = document.createElement('img')
                icon.src = '../assets/icons/white_eye.svg'
                icon.alt = 'View'

                viewButton.appendChild(icon)
                viewButton.addEventListener('click', () => showPopup(e))

                infoOverlay.appendChild(titulo)
                infoOverlay.appendChild(desc)
                infoOverlay.appendChild(viewButton)
                element.appendChild(infoOverlay)
            } else {
                element.style.backgroundColor = '#5A5A5A'
            }
        }
    })
}

function setPagina(pagina: number) {
    document.querySelectorAll('.page-number-btn, .middle-page-number-btn').forEach(btn => {
        btn.classList.remove('middle-page-number-btn')
        btn.classList.add('page-number-btn')
    })

    const pageBtn = document.getElementById(`${['first', 'second', 'third'][pagina - 1]}-page`)
    if (pageBtn) {
        pageBtn.classList.remove('page-number-btn')
        pageBtn.classList.add('middle-page-number-btn')
    }
}

displayBooks(paginaAtual)
setPagina(paginaAtual)

document.getElementById('first-page')?.addEventListener('click', () => {
    paginaAtual = 1
    displayBooks(paginaAtual)
    setPagina(paginaAtual)
})

document.getElementById('second-page')?.addEventListener('click', () => {
    paginaAtual = 2
    displayBooks(paginaAtual)
    setPagina(paginaAtual)
})

document.getElementById('third-page')?.addEventListener('click', () => {
    paginaAtual = 3
    displayBooks(paginaAtual)
    setPagina(paginaAtual)
})

window.addEventListener('resize', () => {
    displayBooks(paginaAtual)
})

function showPopup(livro: any) {
    const popup = document.getElementById('livro-popup')
    if (!popup) return

    const popupCapa = document.getElementById('popup-capa') as HTMLImageElement
    const popupTitulo = document.getElementById('popup-titulo')
    const popupPaginas = document.getElementById('popup-paginas')
    const popupEditora = document.getElementById('popup-editora')
    const popupResumo = document.getElementById('popup-resumo')

    const popupAutorAno = document.getElementById('popup-autor-ano')
    
    if (popupCapa) popupCapa.src = livro.capa
    if (popupTitulo) popupTitulo.textContent = livro.titulo
    if (popupAutorAno) popupAutorAno.textContent = `${livro.autor}, ${livro.ano_publicacao}`
    if (popupResumo) popupResumo.textContent = livro.resumo
    if (popupPaginas) popupPaginas.textContent = `páginas: ${livro.numero_paginas}`
    if (popupEditora) popupEditora.textContent = livro.editora

    popup.style.display = 'flex'
}

function closePopup() {
    const popup = document.getElementById('livro-popup')
    if (popup) {
        popup.style.display = 'none'
    }
}

document.getElementById('close-popup')?.addEventListener('click', closePopup)
document.getElementById('livro-popup')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closePopup()
    }
})