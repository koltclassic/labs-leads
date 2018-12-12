import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const SINGLE_APPLICATION_QUERY = gql`
  query SINGLE_APPLICATION_QUERY($id: ID!) {
      app(where: { id: $id }) {
          id
          title
          description
          price
      }
  }
`;
const UPDATE_APPLICATION_MUTATION = gql`
  mutation UPDATE_APPLICATION_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateApp(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

class UpdateApplication extends Component {
    state = { };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    }

    updateApp = async (e, updateAppMutation) => {
        e.preventDefault();
        console.log('Updating App!');
        console.log(this.state)
        const res = await updateAppMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });

        console.log('updated')
    }

    render() {
        return (
            <Query query={SINGLE_APPLICATION_QUERY} variables= {{ 
                id: this.props.id
            }}>
            {({data, loading}) => {
                if (loading) return <p>Loading...</p>;
                if (!data.app) return <p>No App Found for ID {this.props.id}</p>;
                return (
                <Mutation mutation={UPDATE_APPLICATION_MUTATION} variables={this.state}>
                    {(updateApp, { loading, error}) => (
                        <Form onSubmit={e => this.updateApp(e, updateApp)}>
                            <Error error={error} />
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="title">
                                    Title
                                    <input type="text" id="title" name="title" placeholder="Title" required defaultValue={data.app.title} onChange={this.handleChange}/>
                                </label>

                                <label htmlFor="price">
                                    Price
                                    <input type="number" id="price" name="price" placeholder="Price" required defaultValue={data.app.price} onChange={this.handleChange}/>
                                </label>

                                <label htmlFor="description">
                                    Description
                                    <textarea type="text" id="description" name="description" placeholder="Enter A Description" required defaultValue={data.app.description} onChange={this.handleChange}/>
                                </label>

                                <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                            </fieldset>
                        </Form>
                    )}
            </Mutation>
            );
        }}
        </Query>
        );
    }
}


export default UpdateApplication;
export { UPDATE_APPLICATION_MUTATION };