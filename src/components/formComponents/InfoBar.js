import React from 'react';
import '../../css/chatCss.scss';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
    </div>
  </div>
);

export default InfoBar;