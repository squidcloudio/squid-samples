import { Modal } from '@mui/material';
import { useQuery } from '@squidcloud/react';
import { useRef } from 'react';
import CloseButton from '../images/CloseButton';

const EditModal = ({ collection, id, open, setOpen, isCompleted, completedTasksInCurrentList }: any) => {
  const activeLabelRef = useRef<HTMLInputElement>(null);
  const completeLabelRef = useRef<HTMLInputElement>(null);

  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const editListLabel = () => {
    collection.doc(id).update({
      activeLabel: activeLabelRef.current?.value || 'In progress',
      completeLabel: completeLabelRef.current?.value || 'Complete',
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
        <input type="text" placeholder="Title" ref={activeLabelRef} defaultValue={todos?.data.activeLabel} />

        {completedTasksInCurrentList.length > 0 && (
          <input type="text" placeholder="Title" ref={completeLabelRef} defaultValue={todos?.data.completeLabel} />
        )}

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
