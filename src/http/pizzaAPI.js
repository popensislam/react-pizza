import { $host } from "."


export const fetchGet = async (sortBy, order, category) => {
    const data = $host.get(`items?sortBy=${sortBy}&order=${order}&category=${category > 0 ? category : ''}`)
    return data
}