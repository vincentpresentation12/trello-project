import React from "react";
import { Button, FormControl, Input, Modal } from "native-base";

const ModalEditColonne = ({ isOpenEdit, item, setIsOpenEdit, EditColone }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = React.useState("");

  return (
    <>
      <Modal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Titre</FormControl.Label>
              <Input placeholder={item.name} onChangeText={setName} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setIsOpenEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  EditColone(item.id, name), setIsOpenEdit(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalEditColonne;
