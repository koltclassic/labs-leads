import CreateApplication from '../components/CreateApplication';
import PleaseSignIn from '../components/PleaseSignIn';

const Add = props => (
  <div>
    <PleaseSignIn>
      <CreateApplication />
    </PleaseSignIn>
  </div>
);

export default Add;
