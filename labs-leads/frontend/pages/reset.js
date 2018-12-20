import CreateApplication from '../components/CreateApplication';
import Reset from '../components/Reset';

const ResetPage = props => (
  <div>
    <p>reset your password</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;
