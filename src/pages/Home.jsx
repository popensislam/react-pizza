import React from 'react';
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { fetchGet } from '../http/pizzaAPI';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import { changeActiveCategories, changeActiveSort } from '../store/slices/filterSlice';
import { getItems } from '../store/slices/itemsSlice';
import qs from 'qs'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const { search } = React.useContext(SearchContext)
    const { sortBy, sortActive, categories, categoryActive } = useSelector(state => state.filter)
    const { items } = useSelector(state => state.items)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const isMounted = React.useRef(false)

    const order = 'desc'
    React.useEffect(() => {
        setIsLoading(true)
        fetchGet(sortBy[sortActive].nameEn, order, categoryActive, currentPage)
            .then(data => dispatch(getItems(data.data)))
            .then(() => setIsLoading(false))
        window.scrollTo(0, 0)
    }, [sortActive, categoryActive, currentPage])

    React.useEffect(() => {

        const params = qs.parse()
    }, [])

    React.useEffect(() => {
        if ( isMounted.current ) {
            const queryString = qs.stringify({
                sortBy: sortBy[sortActive].nameEn,
                categoryActive,
                currentPage,
                sortActive
            })
            navigate(`?${queryString}`)
            console.log(isMounted.current)
        }
        isMounted.current = true
    }, [sortActive, categoryActive, currentPage])

    const searchItems = items.filter(item => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) return true
        return false
    }).map(obj => <PizzaBlock key={obj.id} {...obj} />)

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryActive={categoryActive} categoryActiveChange={i => dispatch(changeActiveCategories(i))} categories={categories} />
                <Sort sortBy={sortBy} sortActiveChange={i => dispatch(changeActiveSort(i))} sortActive={sortActive} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeleton
                        : searchItems
                }
            </div>
            <Pagination changePage={(i) => setCurrentPage(i)} />
        </div>
    );
}

export default Home;