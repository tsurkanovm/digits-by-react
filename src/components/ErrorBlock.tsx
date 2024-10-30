import React from "react";
import {useRouteError} from "react-router-dom";

const ErrorBlock: React.FC = () => {
    const error: any = useRouteError();

    return (
        <div className="error">
            <h2>Something wrong</h2>
            <p>{error.message}</p>
        </div>
    );
}

export default ErrorBlock;