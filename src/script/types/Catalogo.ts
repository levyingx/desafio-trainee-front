import type Livro from "./Livro"

export default interface Catalogo {
    count: number
    next: string
    previous: any
    results: Livro[]
}
