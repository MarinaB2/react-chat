import React from 'react';

import '../../css/chatCss.scss';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
    </div>
    {
      users
        ? (
          <div>
            <h1>Online people : </h1>
            <div className="activeContainer">
              <h2>
                {users.map(({username}) => (
                  <div key={username} className="activeItem">
                    {username}
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