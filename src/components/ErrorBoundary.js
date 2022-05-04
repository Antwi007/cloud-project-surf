import React from 'react';
import sadSurf from './images/sad_surf3.jpeg';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
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
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;