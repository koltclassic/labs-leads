import UpdateApplication from '../components/UpdateApplication';

const Add = ({ query }) => (
  <div>
    <UpdateApplication id={query.id} />
  </div>
);

export default Add;
