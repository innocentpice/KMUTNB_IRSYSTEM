import React from 'react';
import { Menu } from 'semantic-ui-react';

const UserMenu = ({ user, handleLogout }) => {
    return (
        <Menu vertical fluid>
          <Menu.Item >{user.email}</Menu.Item>
          <Menu.Item onClick={handleLogout}>Sign Out</Menu.Item>
        </Menu>
    );
}

export default UserMenu;
