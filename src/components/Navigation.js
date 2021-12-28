import React, {useState} from 'react';
import { Link } from 'react-router-dom';

// const pagesArray = ['Company List', 'Add Company'];

function Navigation() {

    const [selected, setSelected] = useState(1);

    return (
      <div className="navigation-container">
        <ul className="navigation-list">
            <li className={selected === 1?"navigation-item navigation-item-selected":"navigation-item"} onClick={() => setSelected(1)}>
                <Link className='link' to="/">COMPANY LIST</Link>
            </li>
            <li className={selected === 2?"navigation-item navigation-item-selected":"navigation-item"} onClick={() => setSelected(2)}>
                <Link className='link' to="/company/add">ADD COMPANY</Link>
            </li>
        </ul>
      </div>
    );
  }
  
  export default Navigation;