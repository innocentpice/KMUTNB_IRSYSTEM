import React from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';

const NavTop = ({ activeItem, handleMenu }) => {
  return (
    <Menu borderless compact fluid fixed='top' color='blue'>
        <Container text>
          <Menu.Item header active={activeItem === 'DashBoard'} onClick={()=>handleMenu('DashBoard')}><Icon name='newspaper'/></Menu.Item>
          <Menu.Item header active={activeItem === 'ChatRoom'} onClick={()=>handleMenu('ChatRoom')}><Icon name='comments'/></Menu.Item>
          <Menu.Item header active={activeItem === 'AddFeed'} onClick={()=>handleMenu('AddFeed')}><Icon name='add square'/></Menu.Item>
          <Menu.Item header active={activeItem === 'CourseTable'} onClick={()=>handleMenu('CourseTable')}><Icon name='book'/></Menu.Item>
          <Menu.Menu position='right'>
            {
            // <Menu.Item active={activeItem === 'Notification'} onClick={()=>handleMenu('Notification')}>
            //   <Label circular color='teal' style={{margin: 0}}><Icon name='alarm'/>2</Label>
            // </Menu.Item>
            }
            <Menu.Item active={activeItem === 'UserMenu'} onClick={()=>handleMenu('UserMenu')}><Icon name='content'/></Menu.Item>
          </Menu.Menu>
        </Container>
    </Menu>
  );
}

export default NavTop;
