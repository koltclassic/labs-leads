import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (
        <User>
            {({ data: { me } }) => (
                <NavStyles>
                    <Link href="/applications">
                        <a>Applications</a>
                    </Link>
                    {me && (
                        <>
                            <Link href="/add">
                                <a>Add</a>
                            </Link>
                            <Link href="/industries">
                                <a>Industries</a>
                            </Link>
                            <Link href="/companies">
                                <a>Companies</a>
                            </Link>
                            <Link href="/me">
                                <a>Account</a>
                            </Link>
                            <Signout />
                        </>
                    )}
                    {!me && (
                        <Link href="/signup">
                            <a>Sign In</a>
                        </Link>
                    )}
                </NavStyles>
            )}
        </User>
)

export default Nav;