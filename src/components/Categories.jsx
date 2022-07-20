import React from 'react'

const Categories = ({ value, onClickCategory, categories }) => {
    
    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => 
                    <li onClick={() => onClickCategory(index)} key={index} className={value == index ? 'active' : ''}>{item}</li>
                )}
            </ul>
        </div>
    );
}
 
export default Categories;