'use client';
import NavbarCore from "./NavbarCore";
import NavLogo from "./navLogo";
import NavUserMenu from "./navUserMenu";

const settings = ['registrar', 'login'];
const routes = ['/signin', '/signup'];

export default function UnauthenticatedNavBar() {
    return(
        <NavbarCore>
            <NavLogo/>
            <div style={{ marginLeft: 'auto' }}>
            <NavUserMenu settings={settings} routes={routes}/>
            </div>
        </NavbarCore>
    );

}