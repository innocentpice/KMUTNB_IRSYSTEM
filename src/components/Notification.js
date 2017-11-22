import React, { Component } from 'react'

import { Header, Divider, Feed, Icon } from 'semantic-ui-react'

const NotiItem = () =>
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>;

class Notification extends Component {
    render() {
        return (
            <div>
                <Header>
                    Notification
                </Header>
                <Divider />
                <Feed>
                    <NotiItem/>
                    <NotiItem/>
                    <NotiItem/>
                    <NotiItem/>
                </Feed>
            </div>
        );
    }
}

export default Notification;
