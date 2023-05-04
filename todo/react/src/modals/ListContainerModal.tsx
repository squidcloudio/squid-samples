import { Modal } from '@mui/material';
import { useQuery } from '@squidcloud/react';
import { useRef } from 'react';
import CloseButton from '../images/CloseButton';

const ListContainerModal = ({ collection, id, open, setOpen, currentItem }: any) => {
  const listName = useRef<HTMLInputElement>(null);

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const editListLabel = () => {
    collection.doc(currentItem?.data.id).update({
      title: listName.current?.value || '',
    });

    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Edit label</p>
        <div className="modal_container-close" onClick={() => setOpen(false)}>
          <CloseButton />
        </div>
        <input type="text" placeholder="Title" ref={listName} defaultValue={currentItem?.data.title} />

        <div>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={editListLabel} style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ListContainerModal;
