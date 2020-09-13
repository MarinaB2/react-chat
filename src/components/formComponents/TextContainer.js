import React from 'react';

// import onlineIcon from '../../icons/onlineIcon.png';
import '../../css/chatCss.scss';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
    </div>
    {
      users
        ? (
          <div>
            <h1>Online</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({username}) => (
                  <div key={username} className="activeItem">
                    {username}
                    {/* <img alt="Online Icon" src={onlineIcon}/> */}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;