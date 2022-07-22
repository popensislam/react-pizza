import React from 'react';
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import { changeActiveCategories, changeActiveSort, changeCurrentPage, setFilter } from '../store/slices/filterSlice';
import { fetchPizza } from '../store/slices/itemsSlice';
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { addItemToCard } from '../store/slices/cartSlice';


const Home = () => {
    // const navigate = useNavigate()
    const { search } = React.useContext(SearchContext)
    const { sortBy, sortActive, categories, categoryActive, currentPage } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.items)
    const dispatch = useDispatch()

    // const isMounted = React.useRef(false)
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
    //         dispatch(setFilter({ ...params }))
    //     }
    // }, [])

    React.useEffect(() => {
        const param = { sortBy: sortBy[sortActive].nameEn, order: 'desc', categoryActive, currentPage }
        dispatch(
            fetchPizza(param)
        )
    }, [sortActive, categoryActive, currentPage])

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortBy: sortBy[sortActive].nameEn,
    //             sortActive,
    //             currentPage,
    //             categoryActive,
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [sortActive, categoryActive, currentPage])

    const searchItems = items.filter(item => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) return true
        return false
    }).map(obj => <PizzaBlock key={obj.id} {...obj} addItem={(item) => dispatch(addItemToCard(item))} />)

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryActive={categoryActive} categoryActiveChange={i => dispatch(changeActiveCategories(i))} categories={categories} />
                <Sort sortBy={sortBy} sortActiveChange={i => dispatch(changeActiveSort(i))} sortActive={sortActive} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status == 'error'
                    ?
                    <div class="cart cart--empty">
                        <h2>Неполадки с интернетом <icon>😕</icon></h2>
                        <p>
                            Перезайдите позднее.
                        </p>
                    </div>

                    :
                    <div className="content__items">
                        {
                            status == 'pending' ? skeleton : searchItems
                        }
                    </div>
            }
            {
                status != 'error' && <Pagination changePage={(i) => dispatch(changeCurrentPage(i))} />
            }
        </div>
    );
}

export default Home;