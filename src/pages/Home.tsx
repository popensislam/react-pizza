import React, { useCallback } from 'react';
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { changeActiveCategories, changeActiveSort, changeCurrentPage, selectFilter, setFilter } from '../store/slices/filterSlice';
import { fetchPizza, selectItems } from '../store/slices/itemsSlice';
import { addItemToCard } from '../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';


const Home = () => {
    const { search } = React.useContext(SearchContext)
    const { sortBy, sortActive, categories, categoryActive, currentPage } = useAppSelector(selectFilter)
    const { items, status } = useAppSelector(selectItems)
    const dispatch = useAppDispatch()


    React.useEffect(() => {
        const param = { sortBy: sortBy[sortActive].nameEn, order: 'desc', categoryActive, currentPage }
        dispatch(
            fetchPizza(param)
        )
    }, [sortActive, categoryActive, currentPage])


    const categoryActiveChange = useCallback((i: number) => {
        dispatch(changeActiveCategories(i))
    }, [])

    const sortActiveChange = useCallback((i: number) => {
        dispatch(changeActiveSort(i))
    }, [])

    const searchItems = items.filter((item: any) => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) return true
        return false
    }).map((obj: any) => <PizzaBlock key={obj.id} {...obj} addItem={(item: any) => dispatch(addItemToCard(item))} />)

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryActive={categoryActive} categoryActiveChange={categoryActiveChange} categories={categories} />
                <Sort sortBy={sortBy} sortActiveChange={sortActiveChange} sortActive={sortActive} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status == 'error'
                    ?
                    <div className="cart cart--empty">
                        <h2>Неполадки с интернетом 😕</h2>
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
                status != 'error' && <Pagination changePage={(i: number) => dispatch(changeCurrentPage(i))} />
            }
        </div>
    );
}

export default Home;