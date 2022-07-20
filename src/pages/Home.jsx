import React from 'react';
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { fetchGet } from '../http/pizzaAPI';



const Home = ({ search }) => {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState(0)

    const order = 'desc'
    const sortBy = ['rating', 'price', 'title']
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    React.useEffect(() => {
        setIsLoading(true)
        fetchGet(sortBy[sortType], order, categoryId)
            .then(data => setItems(data.data))
            .then(() => setIsLoading(false))
        window.scrollTo(0, 0)
    }, [sortType, categoryId])

    const searchItems = items.filter(item => {
        if (item.title.toLowerCase().includes(search.toLowerCase())) return true
        return false
    })
        .map(obj => <PizzaBlock key={obj.id} {...obj} />)
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={setCategoryId} categories={categories} />
                <Sort value={sortType} onClickSort={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeleton
                        : searchItems
                }
            </div>
        </div>
    );
}

export default Home;