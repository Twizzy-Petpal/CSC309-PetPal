import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DetailsAbout = () => {
    const [showAboutModal, setShowModal] = useState(false);

    const handleModalShow = async () => {
        //   try {
        //     const response = await fetch(`http://localhost:8000/notifications/${notification.id}/`,
        //     {
        //         headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNjc2NTAzLCJpYXQiOjE3MDE0NjY5MDMsImp0aSI6ImEyMDA4OWY2NzY3ZTRjYmNiYjdhYzRhNTU1NWViMzdiIiwidXNlcl9pZCI6MX0.Em63InqkhayO9AFzGVAy1Y7B-FvPysNxG7--1yWFPJ4",}
        //     });  //TODO: Make authorization better later
        //   } catch (error) {
        //     console.error('Error fetching detailed notification:', error);
        //   }
        setShowModal(true);
    };

    const handleModalHide = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="w-100 text-start">
                <div className="d-flex flex-row align-items-center modal-div">
                    <h1 className="fs-0">
                        Description
                        {/* Button trigger modal */}
                        <a
                            type="button"
                            className="btn border border-0 h-25 m-0 ps-0 translate-middle-y"
                            onClick={handleModalShow}
                        >
                            <img src="imgs/edit.png" height="20" width="20" alt="Edit" />
                        </a>
                    </h1>
                </div>

                {/* Modal */}
                <Modal show={showAboutModal} onHide={handleModalHide} data-bs-theme="petpal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-4 text-primary-brown">Description</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Control as="textarea" placeholder="Add a description here" className="font-plain" rows={9} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary-orange" onClick={handleModalHide}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal */}
            </div>
        </>
    );
}

export default DetailsAbout;