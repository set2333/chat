import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { txtHelloTitle, txtName } from '../../consts/dictionary';
import styles from './styles.scss';

const Topper = ({ name, setNameServer }) => {
  const ref = useRef(null);
  const [userName, setUserName] = useState(name);
  const [editUserName, setEditUserName] = useState(false);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  useEffect(() => {
    if (editUserName) {
      ref.current.focus();
    }
  });

  const handleSaveName = (newName) => {
    setEditUserName(false);
    setNameServer(newName);
  };

  return (
    <div>
      <h1>{txtHelloTitle}</h1>
      <p>
        {txtName}
        <input
          ref={ref}
          className={editUserName ? '' : `${styles.hide}`}
          type="text"
          value={userName}
          onChange={({ target: { value } }) => setUserName(value)}
          onBlur={({ target: { value } }) => handleSaveName(value)}
        />
        <span
          className={editUserName ? `${styles.hide}` : ''}
          onClick={() => setEditUserName(true)}
        >
          {userName}
        </span>
      </p>
    </div>
);
};

Topper.propTypes = {
  name: PropTypes.string.isRequired,
  setNameServer: PropTypes.func.isRequired,
};

export default Topper;
