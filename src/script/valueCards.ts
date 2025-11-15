const valueCards = document.querySelectorAll('.value-card') as NodeListOf<HTMLElement>

valueCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active')
    })
})

const personCards = document.querySelectorAll('.person-card') as NodeListOf<HTMLElement>

personCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active')
    })
})
