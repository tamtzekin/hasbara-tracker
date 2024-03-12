import React from 'react';
import { Link } from 'react-router-dom';

const ClaimsList = () => {
    return (
    <>
        <h2 className="subheading mb-1 mobile:mb-4">Claims</h2>
        <Link to="/forty-beheaded-babies"><div className="claim-link">‘Forty beheaded babies’</div></Link>

        <Link to="/al-ahli-attacked"><div className="claim-link">‘Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces’</div></Link>

        <Link to="/al-shifa-fuel"><div className="claim-link">‘Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas’</div></Link>
        
        <Link to="/makeup"><div className="claim-link">‘Makeup used in Gaza to fake injuries’</div></Link>

        <Link to="/hamas-chemical-weapons"><div className="claim-link">‘Hamas were carrying instructions on how to make chemical weapons’</div></Link>

        <Link to="/israel-denies-church-killing"><div className="claim-link">‘Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish’</div></Link>

        <div className="claim-coming-soon">+ more coming soon</div>

        </>
    )
}

export default ClaimsList;
