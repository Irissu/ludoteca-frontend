import { Loan } from "./Loan";
import { LoanPage } from "./LoanPage";

export const LOAN_DATA_PAGE: LoanPage = {
    content: [
    { 
        id: 1, 
        game: { 
            id: 1, 
            title: 'La fallera calavera', 
            age: 6, 
            category: { id: 1, name: 'CAT1' }, 
            author: { id: 1, name: 'Autor 1', nationality: 'Spain' } 
        }, 
        client: { id: 1, name: 'Cliente 1' }, 
        loanDate: new Date('2024-12-01'), 
        returnDate: new Date('2024-12-10') 
    },
    { 
        id: 2, 
        game: { 
            id: 2, 
            title: 'Vampire: The masquerade', 
            age: 18, 
            category: { id: 4, name: 'Rol' }, 
            author: { id: 2, name: 'Autor 2', nationality: 'USA' } 
        }, 
        client: { id: 2, name: 'Cliente 2' }, 
        loanDate: new Date('2024-12-02'), 
        returnDate: new Date('2024-12-11') 
    },
    { 
        id: 3, 
        game: { 
            id: 3, 
            title: 'Arkham Horror', 
            age: 10, 
            category: { id: 3, name: 'CAT3' }, 
            author: { id: 4, name: 'Autor 4', nationality: 'Canada' } 
        }, 
        client: { id: 1, name: 'Cliente 1' }, 
        loanDate: new Date('2024-12-03'), 
        returnDate: new Date('2024-12-12') 
    },
    { 
        id: 4, 
        game: { 
            id: 4, 
            title: 'Magic The Gathering', 
            age: 12, 
            category: { id: 1, name: 'CAT1' }, 
            author: { id: 6, name: 'Autor 6', nationality: 'USA' } 
        }, 
        client: { id: 2, name: 'Cliente 2' }, 
        loanDate: new Date('2024-12-04'), 
        returnDate: new Date('2024-12-13') 
    },
    { 
        id: 5, 
        game: { 
            id: 5, 
            title: 'Dragon Age', 
            age: 16, 
            category: { id: 2, name: 'CAT2' }, 
            author: { id: 5, name: 'Autor 5', nationality: 'Japan' } 
        }, 
        client: { id: 1, name: 'Cliente 1' }, 
        loanDate: new Date('2024-12-05'), 
        returnDate: new Date('2024-12-14') 
    },
    { 
        id: 6, 
        game: { 
            id: 6, 
            title: 'Disco Elysium', 
            age: 18, 
            category: { id: 4, name: 'Rol' }, 
            author: { id: 3, name: 'Autor 3', nationality: 'Estonia' } 
        }, 
        client: { id: 2, name: 'Cliente 2' }, 
        loanDate: new Date('2024-12-06'), 
        returnDate: new Date('2024-12-15') 
    }
],
pageable: {
    pageSize: 5,
    pageNumber: 0,
    sort: [{ property: 'id', direction: 'ASC' }],
},
totalElements: 6,
};