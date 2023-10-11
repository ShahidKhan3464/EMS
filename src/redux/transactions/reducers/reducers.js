import { TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAIL, TRANSACTIONS_RESET } from "../types";

function createData(id, name, serPro, advance, price, date, time) {
    return { id, name, serPro, advance, price, date, time }
}

const rows = [
    createData(1, 'Harry porter', 'Chris Gayle', '5%', 70, '16 May 2023', '05.39 PM'),
    createData(2, 'Harry porter', 'Chris Gayle', '5%', 70, '16 May 2023', '05.39 PM'),
    createData(3, 'Harry porter', 'Chris Gayle', '5%', 80, '16 May 2023', '05.39 PM'),
    createData(4, 'Harry porter', 'Chris Gayle', '5%', 70, '16 May 2023', '05.39 PM'),
    createData(5, 'Harry porter', 'Chris Gayle', '5%', 70, '16 May 2023', '05.39 PM'),
    createData(6, 'Harry porter', 'Chris Gayle', '5%', 90, '16 May 2023', '05.39 PM'),
    createData(7, 'Harry porter', 'Chris Gayle', '5%', 70, '16 May 2023', '05.39 PM'),
]

//Options
const priceRange = [

]

const advancePayments = [
    { value: '05', text: '%5' },
    { value: '10', text: '%10' },
    { value: '15', text: '%15' },
    { value: '20', text: '%20' },
    { value: '25', text: '%25' },
    { value: '30', text: '%30' },
    { value: '35', text: '%35' },
    { value: '40', text: '%40' },
    { value: '45', text: '%45' },
    { value: '50', text: '%50' },
]

//Initial States
const listState = {
    error: null,
    loading: false,
    data: {
        list: rows,
        priceRange,
        advancePayments,
        // totalRecords: 0,
    }
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case TRANSACTIONS_REQUEST:
            return { ...state, loading: true }
        case TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case TRANSACTIONS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case TRANSACTIONS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}