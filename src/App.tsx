import {BestResults} from "./components/BestResults";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Digits} from "./components/Digits.tsx";
import {Strupp} from "./components/Strupp.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import ErrorBlock from "./components/ErrorBlock.tsx";


const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorBlock  />,
            children: [
                {
                    index: true,
                    element: <BestResults />,
                   // loader: bestResultLoader
                },
                { path: 'digits', element: <Digits /> },
                { path: 'strupp', element: <Strupp /> }
            ],
        }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
