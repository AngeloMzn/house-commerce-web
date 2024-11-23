'use client'
import NavbarCore from "./NavbarCore";
import NavLogo from "./navLogo";
import NavPages from "./navPages";
import NavUserMenu from "./navUserMenu";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function AuthenticatedNavBar() {
    return(<>
        <NavbarCore>
            <NavLogo />
            <NavPages />
            <NavUserMenu settings={settings} />
        </NavbarCore>
    </>)
}