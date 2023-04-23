import { Modal } from '@mui/material';
import { useQuery } from '@squidcloud/react';
import { useRef } from 'react';

const EditModal = ({ collection, id, open, setOpen, isCompleted }: any) => {
  const activeLabelRef = useRef<HTMLInputElement>(null);
  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const editListLabel = () => {
    if (activeLabelRef.current?.value) {
      if (isCompleted) {
        collection.doc(id).update({
          completeLabel: activeLabelRef.current?.value || '',
        });
      } else {
        collection.doc(id).update({
          activeLabel: activeLabelRef.current?.value || '',
        });
      }
    }

    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Edit label</p>
        <input
          type="text"
          placeholder="Title"
          ref={activeLabelRef}
          defaultValue={!isCompleted ? todos?.data.activeLabel : todos?.data.completeLabel}
        />

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

export default EditModal;
