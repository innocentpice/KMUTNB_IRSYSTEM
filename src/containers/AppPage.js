import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { authCheck, authLogout, feedGetAll, feedDelete , getUsers } from '../actions';

import NavTop from '../components/NavTop';
import UserMenu from '../components/UserMenu';
import DashBoard from '../components/DashBoard';
import AddFeed from '../components/AddFeed';
import ChatRoom from '../components/ChatRoom';
import CourseTable from '../components/CourseTable';
import Notification from '../components/Notification';

class AppPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'DashBoard'
        };
        this.props.authCheck((isLogin) => {
            !isLogin && this.props.history.push('/login');
            this.props.feedGetAll(this.props.auth.uid);
            this.props.getUsers(this.props.auth.uid);
        });
    }

    // AuthHandle
    handleLogout = () => {
        this.props.authLogout();
    }

    handleMenu = (activeItem) => {
        this.setState({ activeItem });
    }

    render() {
        if (!this.props.auth) {
            return (<div>ERROR</div>);
        }
        return (
            <div>
                <NavTop activeItem={this.state.activeItem} handleMenu={this.handleMenu}/>
                <Grid textAlign = 'center' style ={{height: '100%', margin: 'auto 2%'}} verticalAlign = 'middle'>
                    <Grid.Column style={{ maxWidth: 800, marginTop: '3em'}} textAlign = 'left'>
                    <Switch location={{pathname: this.state.activeItem}}>
                        <Route exact path='DashBoard'>
                            <DashBoard feeds={this.props.feeds} auth={this.props.auth} DelFeed={this.props.feedDelete} users={this.props.users} />
                        </Route>
                        <Route exact path='AddFeed'>
                            <AddFeed auth={this.props.auth} users={this.props.users} goDashBoard={()=>{this.setState({activeItem: 'DashBoard'})}} />
                        </Route>
                        <Route exact path='ChatRoom'>
                            <ChatRoom auth={this.props.auth} users={this.props.users} />
                        </Route>
                        <Route exact path='CourseTable'>
                            <CourseTable auth={this.props.auth} />
                        </Route>
                        <Route exact path='Notification'>
                            <Notification />
                        </Route>
                        <Route path='UserMenu'>
                            <UserMenu
                                user={this.props.auth}
                                handleLogout={this.handleLogout}
                            />
                        </Route>
                    </Switch>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

AppPage.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    feeds: PropTypes.object.isRequired,
    authCheck: PropTypes.func.isRequired,
    authLogout: PropTypes.func.isRequired,
    feedGetAll: PropTypes.func.isRequired,
    feedDelete: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
}

function mapStateToProps({ auth, feeds, users }) {
    return { auth, feeds, users }
}

export default connect(mapStateToProps, { 
    authCheck, 
    authLogout, 
    feedGetAll, 
    feedDelete,
    getUsers
})(AppPage);
