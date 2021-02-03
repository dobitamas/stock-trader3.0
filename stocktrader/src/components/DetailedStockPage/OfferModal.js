import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function OfferModal(props) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    useEffect(() => {
        setShow(props.show);
    }, [props.show])
    

    return (
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Add new offer
            </Button>
             <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
