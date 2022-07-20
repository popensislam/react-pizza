import React from 'react'

const Categories = ({ categoryActive, categoryActiveChange, categories }) => {
    
    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => 
                    <li onClick={() => categoryActiveChange(index)} key={index} className={categoryActive == index ? 'active' : ''}>{item}</li>
                )}
            </ul>
        </div>
    );
}
 
export default Categories;