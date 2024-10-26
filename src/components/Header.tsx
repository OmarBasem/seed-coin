import {Menu} from "semantic-ui-react";
import Link from 'next/link';


function Header() {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Link href="/" className="item">
                SeedCoin
            </Link>
            <Menu.Menu position="right">
                <Link href="/" className="item">
                    Campaigns
                </Link>
                <Link href="/campaigns/new" className="item">
                    +
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;
