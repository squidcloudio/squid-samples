import { useAuth0 } from '@auth0/auth0-react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@squidcloud/react';
import { useState, useRef } from 'react';
import uuid from 'react-uuid';
import colors from '../constants/colors';

const ListModal = ({ id, collection, open, setOpen }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>(colors[0].color);
  const [todos] = useQuery(collection.query().where('id', '==', `${id}`), true);

  const { user } = useAuth0();

  const createNewList = () => {
    const currentId = uuid();

    if (titleRef.current?.value && color) {
      collection.doc(currentId).insert({
        id: currentId,
        title: titleRef.current?.value || '',
        color: color,
        userId: user?.sub,
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
          value={color}
          onChange={(e: SelectChangeEvent) => setColor(e.target.value)}
          sx={{ '& .MuiMenuItem-root': { display: 'flex', alignItems: 'center' } }}
        >
          {colors.map((item) => {
            return (
              <MenuItem className="modal_container-menu" value={item.color} key={item.title}>
                <div className="modal_container-in">
                  <div className="modal_container-item" style={{ backgroundColor: `${item.color}` }}></div>
                  <div className="modal_container-color">{item.title}</div>
                </div>
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
