import { summaries } from './data';

const ClaimSummary = ({ id }) => {
    return (
        <>
            {/* Claim summary */}
            <div className="claim-summary container mt-10 mobile:w-[100%] mobile:mt-[5%]">
                <div className="mobile:text-xs laptop:w-7/12 laptop:text-md font-lores font-bold">
                    The claim</div>
                    
                <div className="mobile:mt-0 mobile:text-xs laptop:text-md laptop:w-7/12 mb-2 mt-1">
                    ‘{summaries[id].claimMainTitle}’</div>

                <div className="mobile:text-xs mobile:mb-5 laptop:w-[60%] display:flex text-sm text-grey-faded mt-2 leading-6">
                    {summaries[id].claimSummary}
                </div>
            </div>       
            </>
    );
};

export default ClaimSummary;
