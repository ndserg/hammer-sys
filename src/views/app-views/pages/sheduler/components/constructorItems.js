import React, { useState } from 'react';
import { Card } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ConstructionItems from './constructionItems';
import styles from '../styles/Sheduler.module.css';
import shedulerData from "../sheduler.data.json";

const { tabTypes, tabsList } = shedulerData;

const ConstructorItems = ({ onTemplateItemSelect }) => {
  const [activeTab, setActiveTab] = useState(tabTypes.furniture);

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const contentList = {
    [tabTypes.furniture]: <ConstructionItems itemsType={tabTypes.furniture} onTemplateItemSelect={onTemplateItemSelect}/>,
    [tabTypes.building]: <ConstructionItems itemsType={tabTypes.building} onTemplateItemSelect={onTemplateItemSelect}/>,
    [tabTypes.decor]: <ConstructionItems itemsType={tabTypes.decor} onTemplateItemSelect={onTemplateItemSelect}/>,
  };

 return(
  <Card
    tabList={tabsList}
    activeTabKey={activeTab}
    onTabChange={onTabChange}
  >
    <Scrollbars
      autoHeight={true}
      autoHeightMax={'auto'}
      renderTrackHorizontal={props => <div {...props} className={styles['track-horizontal']}/>}
      renderThumbHorizontal={props => <div {...props} className={styles['thumb-horizontal']}/>}
    >
      {contentList[activeTab]}
    </Scrollbars>
  </Card>
 )
};

export default ConstructorItems;
