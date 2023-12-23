import React from 'react';

const GoogleForm = () => {
  const embedUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfjFPfW_ZE5QqgH93RVSMdHKURrt2NTsgMxHxmErCVlCCIi1w/viewform?embedded=true";

  return (
    <div className="google-form-container">
      <iframe
        title="Google Form"
        src={embedUrl}
        width="108%"
        height="1000px"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{
            border: 'none',
        }}
      >
        Loading...
      </iframe>
    </div>
  );
};

export default GoogleForm;
