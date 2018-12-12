import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_APPS_QUERY } from './Applications';

const DELETE_APP_MUTATION = gql`
    mutation DELETE_APPLICATION_MUTATION($id: ID!) {
        deleteApp(id: $id) {
            id
        }
    }
`;

class DeleteApplication extends Component {
    update = (cache, payload) => {
        // manually update the cache on the client so it matches the server
        // 1. read the cache for the apps we want
        const data = cache.readQuery({ query: ALL_APPS_QUERY })
        console.log(data)
        // 2. filter the deleted item out of the page
        data.apps = data.apps.filter(app => app.id !== payload.data.deleteApp.id);
        // 3. put the items back
        cache.writeQuery({ query: ALL_APPS_QUERY, data});
    }

    render() {
        return (
        <Mutation 
            mutation={DELETE_APP_MUTATION} 
            variables={ {id: this.props.id }}
            update={this.update}
        >
            {(deleteApp, { error }) => (
                <button onClick={() => {
                    if(confirm('Are you sure you want to delete this application?')) {
                        deleteApp();
                    }
                }}>{this.props.children}</button>
            )}
        </Mutation>
        );
    }
}

export default DeleteApplication;