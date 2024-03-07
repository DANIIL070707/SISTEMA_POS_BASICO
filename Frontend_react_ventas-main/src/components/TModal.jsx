import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function TModal({show, handleClose, counter, Reiniciar}) {

  return (
    <Modal show={show} onHide={Reiniciar}>
    <Modal.Header closeButton>
      <Modal.Title>Sesion a expirar</Modal.Title>
    </Modal.Header>
    <Modal.Body>{`Su sesion cierra en ${counter} segundos `  }</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Si confirmar el cierre de sesion
      </Button>
      <Button variant="primary" onClick={Reiniciar}>
        Continuar Sesion
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default TModal
