import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: window.location.pathname
        };
    }

    componentDidMount() {
        window.addEventListener('popstate', this.handlePopState);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
    }

    handlePopState = () => {
        this.setState({ currentPath: window.location.pathname });
    };

    render() {
        const { currentPath } = this.state;

        return (
            <div className="wrapper">
                <nav>
                    <ul className="dropdown">
                        <li className={currentPath.includes('/halls') ? 'slide active' : 'slide'}>
                            <a href="http://localhost:3000/halls">HALLS</a>
                        </li>
                        <li className={currentPath.includes('/owners') ? 'slide active' : 'slide'}>
                            <a href="http://localhost:3000/owners">OWNERS</a>
                        </li>
                        <li className={currentPath.includes('/authors') ? 'slide active' : 'slide'}>
                            <a href="http://localhost:3000/authors">AUTHORS</a>
                        </li>
                        <li className={currentPath.includes('/exhibitions') ? 'slide active' : 'slide'}>
                            <a href="http://localhost:3000/exhibitions">EXHIBITIONS</a>
                        </li>
                        <li className={currentPath.includes('/images') ? 'slide active' : 'slide'}>
                            <a href="http://localhost:3000/images">IMAGES</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Menu;