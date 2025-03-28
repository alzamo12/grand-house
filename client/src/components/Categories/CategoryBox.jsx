import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate } from 'react-router';

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 1. create queryString
    let currentQuery = { category: label };
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    });
    // url ---> /?category=label

    // 2. set queryString in URL
    navigate(url)
  }

  return (
    <div
      className={`flex 
                flex-col 
                items-center 
                justify-center 
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
