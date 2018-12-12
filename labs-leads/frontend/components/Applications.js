import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { render } from 'react-dom';
import Link from 'next/link';

import formatMoney from '../lib/formatMoney';
import Application from './Application';
import Pagination from './Pagination';
import { perPage } from '../config';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const ALL_APPS_QUERY  = gql`
  query ALL_APPS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
      apps(first: $first, skip: $skip, orderBy: createdAt_DESC) {
          id
          title
          price
          description
          image
          appStoreRating
          playStoreRating
      }
  }
`;

const Center = styled.div`
  text-align: center;
`

const AppList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`
export default class Applications extends Component {
    render() {
        return (
            <Center>
                {/* <Pagination page={this.props.page}/> */}
                <Query query={ALL_APPS_QUERY} variables={{
                    skip: this.props.page * perPage - perPage,
                }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error: {error.message} </p>
                        return <ReactTable
                            defaultPageSize={5}
                            data={data.apps.map((app) => {
                                return {
                                    id: app.id,
                                    title: app.title,
                                    price: formatMoney(app.price),
                                    description: app.description,
                                    playStoreRating: app.playStoreRating,
                                    appStoreRating: app.appStoreRating
                                }
                            })}
                            columns={[{
                                Header: 'Title',
                                accessor: 'title',
                                //Cell: row => (<div className="foo">{row.value}</div>)
                              }, {
                                Header: 'Price',
                                accessor: 'price'
                              }, {
                                Header: 'Description',
                                accessor: 'description'
                            }, {
                                Header: 'Play Store Rating',
                                accessor: 'playStoreRating'
                            }, {
                                Header: 'App Store Rating',
                                accessor: 'appStoreRating'
                            },{
                                Header: '',
                                accessor: 'id',
                                Cell: row => (
                                <a href={`/application?id=${row.original.id}`}>Details</a> 
                                )
                                //Cell: row => ( <Link href={{ pathname: '/application', query: { id: row.id} }}> <a>Details</a></Link>)
                            }]}
                            className="-highlight"
                        ></ReactTable>

                        // return <AppList>
                        //     {
                        //         data.apps.map(app => <Application application={app} key={app.id}>{app.title}</Application>)
                        //     }
                        //     </AppList>
                    }}
                </Query>
                {/* <Pagination page={this.props.page}/> */}
            </Center>

        );
    }
}

export { ALL_APPS_QUERY };