import React from 'react';
import sadSurf from './images/sad_surf3.jpeg';
import ErrorBoundary from './ErrorBoundary';

const ErrorPage = () => {
    return (
        <ErrorBoundary>
            <div class="card text-center" style={{ border: 'none', flexDirection: 'row', marginTop: '5%' }}>
                <img
                    src={sadSurf}
                    alt=""
                    style={{ border: 'none', width: '50%' }}
                />
                <h2 style={{ alignSelf: 'center', width: '50%' }}>
                    404: Not Found Error
                    <br />
                    Please try again at a later time.
                    <br />
                    <br />
                </h2>
            </div>
        </ErrorBoundary>
    )
}

export default ErrorPage;