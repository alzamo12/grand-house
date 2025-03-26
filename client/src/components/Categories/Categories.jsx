import React from 'react';
import Container from '../shared/Container/Container';
import { categories } from './CategoriesData';
import CategoryBox from './CategoryBox';

const Categories = ({setCategory}) => {

    return (
        <Container>
            <div className='pt-4 flex items-center justify-between overflow-x-auto'>
                {
                    categories.map(item => <CategoryBox key={item.label} setCategory={setCategory} label={item.label} icon={item.icon}>
                    </CategoryBox>)
                }
            </div>
        </Container>
    );
};

export default Categories;