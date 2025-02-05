
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function Modals({content, openModal, setOpenModal}) {
  

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div>
            
            {content}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
