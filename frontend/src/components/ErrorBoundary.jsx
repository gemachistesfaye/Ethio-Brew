import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Catches any unhandled render errors in its child tree and displays a
 * recovery UI instead of crashing the entire application.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-50">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <AlertTriangle size={40} />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                        <p className="text-gray-500 mb-8 text-sm">
                            An unexpected error occurred. This has been logged for review.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="w-full bg-[#006341] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
