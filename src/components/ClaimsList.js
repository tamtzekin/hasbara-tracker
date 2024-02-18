import React from 'react';
import { Link } from 'react-router-dom';

const ClaimsList = () => {
    return (
    <>
        <h2>Claims</h2>
        <div className="claim-link"><Link to="/forty-beheaded-babies">Forty beheaded babies</Link></div><br />

        <div className="claim-link"><Link to="/al-ahli-attacked">Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</Link></div><br />

        <div className="claim-link"><Link to="/al-shifa-fuel">Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas</Link></div><br />
        
        <div className="claim-link"><Link to="/makeup-injuries">Makeup used in Gaza to fake injuries</Link></div>

        <div className="claim-coming-soon">Coming soon: Israeli state denies striking Al-Shifa hospital</div>

        <div className="claim-coming-soon">Coming soon: Hamas tunnel found at the Qatari Hospital</div>

        <div className="claim-coming-soon">Coming soon: Israeli state denies ordering World Health Organisation to remove medical supplies from its warehouse </div>

        <div className="claim-coming-soon">Coming soon: Gaza’s electricity not cut off because ‘Palestinians are using phones’</div>

        <div className="claim-coming-soon">Coming soon: Israeli state denies using white phosphorus munitions in Gaza</div>

        <div className="claim-coming-soon">Coming soon: There are no churches in Gaza</div>

        <div className="claim-coming-soon">Coming soon: Hostage gave birth in captivity</div>
        </>
    )
}

export default ClaimsList;
