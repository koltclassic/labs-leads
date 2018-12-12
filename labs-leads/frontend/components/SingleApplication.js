import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../components/ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
 
const SingleApplicationStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
      width: 100%;
      height: 100%;
      object-fit: contain;
  }
  .details {
      margin: 3rem;
      font-size: 2rem;
  }
`;

const SINGLE_APPLICATION_QUERY = gql`
    query SINGLE_APPLICATION_QUERY($id: ID!) {
        app(where: { id: $id}) {
            id
            title
            description
            image
            appStoreRating
            playStoreRating
        }
    }
`;

class SingleApplication extends Component {
    render() {
        return (
            <Query query={SINGLE_APPLICATION_QUERY} variables={{
                id: this.props.id
            }}>
            {({error, loading, data}) => {
                if(error) return <Error error={error} />;
                if(!data.app) return <p> No App Found for {this.props.id}</p>
                if(loading) return <p>Loading...</p>
                const app = data.app;

                return <SingleApplicationStyles> 
                    <Head>
                        <title>Labs Leads | {app.title}</title>
                    </Head>
                    <img src={app.image} alt={app.title} />
                    <div className="details">
                      <h2>Viewing {app.title}</h2>
                      <p>{app.description}</p>
                      <p>App Store Rating: {app.appStoreRating}</p>
                      <p>Play Store Rating: {app.playStoreRating}</p>
                    </div>
                </SingleApplicationStyles>
            }}
            </Query>
        );
    }
}

export default SingleApplication;