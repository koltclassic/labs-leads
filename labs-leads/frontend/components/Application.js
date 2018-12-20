import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteApplication from '../components/DeleteApplication';

class Application extends Component {
  render() {
    const { application } = this.props;
    return (
      <ItemStyles>
        {application.image && (
          <img src={application.image} alt={application.title} />
        )}
        <Title>
          <Link
            href={{
              pathname: '/application',
              query: { id: application.id },
            }}
          >
            <a>{application.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(application.price)}</PriceTag>
        <p>{application.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: '/update',
              query: { id: application.id },
            }}
          >
            <a>Edit</a>
          </Link>
          <button>Add to Cart</button>
          <DeleteApplication id={application.id}>
            Delete This Item
          </DeleteApplication>
        </div>
      </ItemStyles>
    );
  }
}

Application.propTypes = {
  application: PropTypes.object.isRequired,
};

export default Application;
