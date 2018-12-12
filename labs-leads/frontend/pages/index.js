import Link from 'next/link'
import Applications from '../components/Applications';

const Home = props => (
    <div>
        <Applications page={parseFloat(props.query.page) || 1}/>
    </div>
);

export default Home;