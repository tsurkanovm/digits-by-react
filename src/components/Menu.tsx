import classes from './Menu.module.css';
import {NavLink} from "react-router-dom";
export function Menu() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="digits"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Digits
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="strupp"
                            className={({isActive}) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Strupp`s Test
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}