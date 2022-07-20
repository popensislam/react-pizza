import { $host } from "."


export const fetchGet = async (sortBy, order, category, currentPage) => {
    const data = $host.get(`items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}&category=${category > 0 ? category : ''}`)
    return data
}