import React from 'react';
import AppNavBar from './AppNavBar';
import Footer from './Footer';

function BaseLayout(props) {
    return(
        <div>
            <AppNavBar />
                <main>
                    {props.children}
                </main>
            <Footer />
        </div>
    )
}

export default BaseLayout;