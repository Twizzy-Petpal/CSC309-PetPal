import React from 'react';
import DetailsTop from './details-top';
import DetailsBody from './details-body';

const DetailsTab = ({listing, formData, setFormData}) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <DetailsTop listing={listing} formData={formData} setFormData={setFormData}></DetailsTop>
            <DetailsBody listing={listing}></DetailsBody>
        </div>
    );
}

export default DetailsTab;