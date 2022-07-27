import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react'

interface CategoriesProps {
    categoryActive: number,
    categoryActiveChange: (i: number) => void,
    categories: string[]
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryActive, categoryActiveChange, categories }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((item: string, index: number) =>
                    <li onClick={() => categoryActiveChange(index)} key={index} className={categoryActive == index ? 'active' : ''}>{item}</li>
                )}
            </ul>
        </div>
    );
})

export default Categories;