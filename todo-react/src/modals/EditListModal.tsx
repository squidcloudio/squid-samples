import { Modal } from '@mui/material';
import { useQuery } from '@squidcloud/react';
import { useRef } from 'react';

const EditModal = ({ collection, id, open, setOpen }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const editListLabel = () => {
    if (titleRef.current?.value) {
      collection.doc(id).update({
        title: titleRef.current?.value || '',
      });
    }

    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Edit label</p>
        <input type="text" placeholder="Title" ref={titleRef} defaultValue={todos?.data.title} />

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
