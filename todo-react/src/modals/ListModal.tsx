import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { useState, useRef } from 'react';
import uuid from 'react-uuid';
import colors from '../constants/colors';

const ListModal = ({ collection, id, todos, open, setOpen }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>('');

  const createNewList = () => {
    const currentId = uuid();

    if (titleRef.current?.value && color) {
      collection.doc(currentId).insert({
        id: currentId,
        title: titleRef.current?.value || '',
        color: color,
        userId: id,
      });
    }

    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Create New List</p>
        <input type="text" placeholder="Title" ref={titleRef} />
        <Select
          className="modal_container-select"
          defaultValue={colors[0].color}
          onChange={(e: SelectChangeEvent) => setColor(e.target.value)}
        >
          {colors.map((item) => {
            return (
              <MenuItem className="modal_container-menu" value={item.color} key={item.title}>
                <span className="modal_container-item" style={{ backgroundColor: `${item.color}` }}></span>
                <span className="modal_container-color">{item.title}</span>
              </MenuItem>
            );
          })}
        </Select>
        <div>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={createNewList} style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }}>
            Create List
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ListModal;
