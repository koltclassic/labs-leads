import SingleApplication from '../components/SingleApplication';
import gql from 'graphql-tag';

const Application = props => (
  <div>
    <SingleApplication id={props.query.id} />
  </div>
);

export default Application;
