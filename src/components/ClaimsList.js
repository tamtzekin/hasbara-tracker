import React from 'react';
import { Link } from 'react-router-dom';

const ClaimsList = () => {
    return (
    <>
        <h2>Claims</h2>
        <div className="claim-coming-soon"><em>Coming soon:</em> Forty beheaded babies</div>

        <div className="claim-coming-soon"><em>Coming soon:</em> Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces</div>

        <div className="claim-coming-soon"><em>Coming soon:</em> Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas</div>

        <div className="claim-coming-soon">+ more</div>

        </>
    )
}

export default ClaimsList;
