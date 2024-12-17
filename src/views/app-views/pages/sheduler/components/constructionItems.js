import React from 'react';
import styles from '../styles/Sheduler.module.css';
import shedulerData from "../sheduler.data.json";

const ConstructionItems = ({ itemsType, onTemplateItemSelect }) => {
  return (
    <ul className={styles.items}>
      {shedulerData[itemsType].map((item) => 
        <li key={item.id} className={styles.item} onClick={() => onTemplateItemSelect(item)}>
          <div className={styles.itemImgWrapper}>
            <img src={item.img} alt={item.title}/>
          </div>
          <span>{item.title}</span>
        </li>
      )}
    </ul>
  )
};

export default ConstructionItems;
