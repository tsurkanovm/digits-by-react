import {Outlet} from "react-router-dom";
import {Menu} from "./Menu.tsx";

export function RootLayout() {
    return (
        <>
            <Menu />
            <main>
                <Outlet />
            </main>
        </>
    );
}