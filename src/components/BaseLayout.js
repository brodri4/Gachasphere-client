import React from 'react';
import AppNavBar from './AppNavBar';
import Footer from './Footer';

// for bootstrap css
import 'bootstrap/dist/css/bootstrap.css'


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