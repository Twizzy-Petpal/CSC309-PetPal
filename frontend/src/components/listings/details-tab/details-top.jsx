import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DetailsTop = ({ listing }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        breed: '',
        age: '',
        gender: '',
        size: '',
        traits: '',
    });

    useEffect(() => {
        // Check if modelInstance prop is provided
        if (listing) {
            // If yes, update the formData state with the values from the modelInstance
            setFormData({
                animal: listing.animal,
                age: listing.age,
                sex: listing.sex,
                size: listing.size,
                breed: listing.breed,
            });
        }
    }, [listing]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you can submit the form data to your Django backend
        if (props.onSubmit) {
            props.onSubmit(formData);
        }
    };


    const handleModalShow = async () => {
        setShowModal(true);
    };

    const handleModalHide = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="d-flex w-90 py-3 justify-content-between align-items-end small-title-input">
                <input className="form-control form-control-lg border border-0 title-separate" type="text" placeholder="Pet Name" aria-label="Pet Name Input" />
                <input className="form-control form-control-lg border border-0 text-end title-separate" type="text" placeholder="Location" aria-label="Location Input" />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center bg-primary-cream rounded p-3">
                <img src="./imgs/gallery.svg" width="70%" alt="Gallery" />
                <Form className="d-flex flex-column justify-content-center align-items-center" encType="multipart/form-data">
                    {/* TODO: Figure out how to upload images */}
                    <Form.Label htmlFor="formFile" className="form-label">Upload images</Form.Label>
                    <Form.Control type="file" id="formFile" multiple />
                </Form>
            </div>

            <div className="w-100 d-flex flex-row align-items-center justify-content-evenly m-3 mb-5 p-1 bg-brown text-primary-cream rounded-2 position-relative">
                <div className="w-100 d-flex flex-row align-items-center justify-content-evenly m-0 bg-brown text-primary-cream rounded-2 show-md">
                    <h1 className="fs-0">Summary</h1>
                </div>
                <div className="w-100 d-flex flex-row align-items-center justify-content-evenly m-0 bg-brown text-primary-cream rounded-2 hide-lg">
                    {listing ? (
                        <>
                            <p className="summary-text mb-0">{listing.animal}</p>
                            <p className="summary-text mb-0">|</p>
                            <p className="summary-text mb-0"> {listing.age}</p>
                            <p className="summary-text mb-0">|</p>
                            <p className="summary-text mb-0"> {listing.sex}</p>
                            <p className="summary-text mb-0">|</p>
                            <p className="summary-text mb-0"> {listing.size}</p>
                            <p className="summary-text mb-0">|</p>
                            <p className="summary-text mb-0"> {listing.breed}</p>
                        </>
                    ) : (
                        <p className="fs-6 mb-0">Summary</p>
                    )}
                </div>
                <a type="button"
                    className="btn btn-sm border border-0 position-absolute top-0 start-100 bg-none"
                    onClick={handleModalShow}>
                    <img src="imgs/edit.png" height="20" width="20" alt="Edit Summary" />
                </a>
                <Modal data-bs-theme="petpal" show={showModal} onHide={handleModalHide} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-4 text-primary-brown">Summary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                type="text"
                                id="animal"
                                placeholder="Animal"
                                value={formData.animal}
                                onChange={(e) => setFormData({ ...formData, animal: e.target.value })} />
                            <label className="text-primary-brown fs-5" htmlFor="animal">Breed</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control type="text" id="age" placeholder="Age"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            <label className="text-primary-brown fs-5" htmlFor="age">Age</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control type="text" id="sex" placeholder="Sex"
                                value={formData.sex}
                                onChange={(e) => setFormData({ ...formData, sex: e.target.value })} />
                            <label className="text-primary-brown fs-5" htmlFor="sex">Gender</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control type="text" id="size" placeholder="Size"
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })} />
                            <label className="text-primary-brown fs-5" htmlFor="size">Size</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control type="text" id="breed" placeholder="Breed"
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })} />
                            <label className="text-primary-brown fs-5" htmlFor="breed">Traits</label>
                        </Form.Floating>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary-orange" onClick={handleModalHide}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default DetailsTop;