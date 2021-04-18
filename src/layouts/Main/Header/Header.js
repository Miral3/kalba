/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import './Header.css';

/* Sub Components */
import HeaderNav from './HeaderNav';
import HeaderInsert from './HeaderInsert';

const Header = props => {
  const items = [
    { label: "순위표", href: "/leaderboards/score" },
    { label: "기준표", href: "/standardTable/heroes" }
  ];

  const {
    className,
  } = props;

  return (
    <div className={`header ${className}`}>
      <div className="kalba__logo__insert">
        <a href="/" className="logo">
          <h1>Kalba</h1>
          <p>칼없는 바바리안</p>
        </a>
        <div className="insert">
          {/* <form className="nameInsert">
            <input
              placeholder="이름 검색"
              value={name}
              onChange={onChange}
            />
            <a href={`/profile/${name}`}>
              <button type="submit">
                <MdSearch />
              </button>
            </a>
          </form> */}
          <HeaderInsert />
        </div>
      </div>
      <div className="category">
        {/* <div className="container">
          <ul>
            <li>
              <a href="/leaderboards/score"><span>순위표</span></a>
            </li>
            <li>
              <a href="/standardTable/heroes"><span>기준표</span></a>
            </li>
          </ul>
        </div> */}
        < HeaderNav items={items} />
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
}

export default Header;