import React from 'react'
import Modal from 'react-bootstrap/Modal'

export function Modals({ handleClose, show, title, children }) {
  return (
    // 'backdrop="static"' (opcional) evita que se cierre si clics fuera (útil para formularios)
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
