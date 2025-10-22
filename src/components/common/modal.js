import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./style.module.css"

function CommonModal({ show, setShow, title, primaryFunction, bodyContent,bgGrey }) {
  console.log(show, "showModal");
  return (
    <>
      <Modal
        show={show ? true : false}
        onHide={() => setShow(false)}
        size="md"
      centered
      >
        {(title || title == "")  && (
          <Modal.Header className={styles.headerBtn}  closeButton>
            <Modal.Title  style={{fontWeight:900,flex:1}} >
              {title}
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body  style={{backgroundColor:bgGrey && "#F8F8F8"}} >{bodyContent}</Modal.Body>
        {primaryFunction && (
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#8348F2" }}
              className="ml-2"
              onClick={primaryFunction}
            >
              Yes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default CommonModal;
