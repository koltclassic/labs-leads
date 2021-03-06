import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav'
import Router from 'next/router';
import NProgress from 'nprogress';
import Search from './Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
}

Router.onRouteChangeComplete = () => {
  NProgress.done();
}

Router.onRouteChangeError = () => {
  NProgress.error();
}

const Logo = styled.div`
 font-size: 1rem;
 margin-left: 2rem;
 position: relative;
 z-index: 2;
 a {
     color: white;
     text-transform: uppercase;
     text-decoration: none;
 }

 img {
     max-height: 100px;
 }
 @media (max-width: 1300px) {
     margin: 0;
     text-align: center;
 }
`;

const StyledHeader = styled.header`
  .bar {
      border-bottom: 10px solid ${props => props.theme.black};
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;
      align-items: stretch;
      @media (max-width: 1300px) {
        grid-template-columns: 1fr;
        justify-content: center;
      }
  }

  .sub-bar {
      display: grid;
      grid-template-columns: 1fr auto;
      border-bottom: 1px solid ${props => props.theme.lightgrey}
  }
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className="bar">
                <Logo>
                    <Link href="/">
                        <a><img src="./static/labsleadslogo.png"/></a>
                    </Link>
                </Logo>
                <Nav />
            </div>
            <div className="sub-bar">
                <Search />
            </div>
        </StyledHeader>
    );
};

export default Header;