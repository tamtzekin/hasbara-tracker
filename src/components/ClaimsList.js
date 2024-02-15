import React from 'react';
import { Link } from 'react-router-dom';

const ClaimsList = () => {
    return (
    <>
        <h2>Claims</h2>
        <div className="claim-link"><Link to="/forty-beheaded-babies">Forty beheaded babies</Link></div><br />

        <div className="claim-link"><Link to="/al-ahli-attacked">Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</Link></div><br />

        <div className="claim-link"><Link to="/al-shifa-fuel">Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas</Link></div><br />
        </>
    )
}

export default ClaimsList;
