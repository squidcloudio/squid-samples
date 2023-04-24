import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import React, { useState, useRef } from 'react';
import TagsInput from '../components/TagsInput';

import { StyledDatePicker } from '../styled/StyledDatePicker';
import { CssTextField } from '../styled/CssTextField';
import uuid from 'react-uuid';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { useCollection, useQuery } from '@squidcloud/react';
import { useAuth0 } from '@auth0/auth0-react';
import { List } from '../interfaces';
import { useNavigate, useParams } from 'react-router-dom';

const ItemModal = ({ collection, todos, open, setOpen, fromCalendar, currentDate }: any) => {
  const { id } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const todosCollection = useCollection<List>('lists');
  const todosList = useQuery(todosCollection.query().where('userId', '==', `${user?.sub}`), true);

  const [selectedValue, setSelectedValue] = useState<any>();

  const [value, setValue] = useState<any>(null);
  const [tags, setTags] = useState<any>([]);

  const removeTag = (idx: number) => {
    setTags(tags.filter((_: any, i: any) => i !== idx));
  };

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    let inputValue = (e.currentTarget as HTMLInputElement).value.trim();

    const newId = uuid();
    if (inputValue) {
      const newTag = { id: newId, name: inputValue };
      if (!inputValue.trim()) return;
      setTags([...tags, newTag]);
    }

    (e.currentTarget as HTMLInputElement).value = '';
  };

  const addItem = () => {
    const itemNewId = uuid();
    collection.doc(itemNewId).insert({
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      dueDate: new Date(fromCalendar ? currentDate : value).toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      } as Intl.DateTimeFormatOptions),
      tags,
      listId: todos.data.id,
      userId: todos.data.userId,
      listColor: todos.data.color,
      completed: false,
      id: itemNewId,
    });

    setValue('');
    setTags([]);
    setOpen(false);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const selectedItem = todosList.find((item: any) => item?.data.id === value);
    setSelectedValue(selectedItem?.data.id);

    navigate(`/${value}`);
  };

  let defaultTodoList = todosList.filter((el) => el.data.id === `${id}`);

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Add new item</p>

        {fromCalendar && (
          <Select
            value={selectedValue}
            defaultValue={defaultTodoList[0]?.data.id}
            className="modal_container-select"
            onChange={handleSelectChange}
            sx={{ '& .MuiMenuItem-root': { display: 'flex', alignItems: 'center' } }}
          >
            {todosList.map((item: any) => {
              return (
                <MenuItem className="modal_container-menu" value={item.data.id} key={item.data.title}>
                  <div className="modal_container-in">
                    <div className="modal_container-item" style={{ backgroundColor: `${item.data.color}` }}></div>
                    <div className="modal_container-color">{item.data.title}</div>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        )}

        <CssTextField label="Title" inputRef={titleRef} className="modal_container-input" />
        <CssTextField label="Description" inputRef={descriptionRef} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <StyledDatePicker
              className="datepicker"
              value={fromCalendar ? dayjs(currentDate) : value}
              defaultValue={fromCalendar ? dayjs(currentDate) : dayjs(value)}
              onChange={(newValue: any) => {
                setValue(newValue);
              }}
              ref={datePickerRef}
              disabled={fromCalendar}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TagsInput tags={tags} removeTag={removeTag} handleTags={handleTags} />

        <div>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={addItem} style={{ backgroundColor: todos ? todos?.data.color : '#14BE6E' }}>
            Add Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
