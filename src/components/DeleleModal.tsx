import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { deleteUser } from "../services/user.service";

const DeleteAccountModal = (props: any) => {
    const navigate: NavigateFunction = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleDeleteAccount = () => {
        deleteUser(props.id).then(data => alert("account deleted")).catch(err => console.log(err))
        handleClose();
        navigate('/login')
    };

    return (
        <div>
            <button onClick={() => handleShow()} className="btn btn-outline-danger" >
                <span>Delete Your Account</span>
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteAccountModal;
