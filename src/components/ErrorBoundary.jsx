import  { Component } from 'react';
import PropTypes from 'prop-types'; 

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // También puedes registrar el error en un servicio de reporte de errores
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI alternativa
        return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
    }
}

ErrorBoundary.propTypes = {
        children: PropTypes.node.isRequired,
    };

export default ErrorBoundary;