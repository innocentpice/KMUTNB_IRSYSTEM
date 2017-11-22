import React, { Component } from 'react';
import _ from 'lodash';

import FeedCard from './FeedCard';

import { Container, Header, Dimmer, Loader } from 'semantic-ui-react'

class DashBoard extends Component {
    render(){
        
        const { feeds, auth, DelFeed } = this.props;
        const FetchFeed = ()=> { 
            if(feeds.empty){
                    return (
                        <Container text>
                            <Header
                                textAlign='center'
                                as='h1'
                                content='ยังไม่มีงาน'
                                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                            />
                        </Container>
                    );
            }else{
                if(!_.keysIn(feeds).length){
                    return (
                        <Dimmer active inverted style={{backgroundColor: '#fafafa',marginTop: '5%'}}>
                            <Loader inverted content='Loading' size='large' />
                        </Dimmer>
                    );
                }else{
                    return _.map(feeds,(feed,key)=>{
                        return <FeedCard key={key} feedkey={feed.key} myEmail={auth.email} DelFeed={DelFeed} uid={auth.uid} />
                    });
                }
            }
        }
        return (
            <FetchFeed />
        );
    }
}
export default DashBoard;
