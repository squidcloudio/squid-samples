import { Modal } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

import React, { useState, useRef } from 'react';
import TagsInput from '../components/TagsInput';

import { StyledDatePicker } from '../styled/StyledDatePicker';
import { CssTextField } from '../styled/CssTextField';
import uuid from 'react-uuid';

const ItemModal = ({ collection, todos, open, setOpen, items }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Dayjs | Date | null | string>(null);
  const [tags, setTags] = useState<string[]>([]);

  const tagsList = items.map((item: any) => item.data.tags[0]);

  console.log('collection', collection);

  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    let inputValue = (e.currentTarget as HTMLInputElement).value.trim();

    if (!inputValue.trim()) return;
    setTags([...tags, inputValue]);

    (e.currentTarget as HTMLInputElement).value = '';
  };

  const addItem = () => {
    const itemNewId = uuid();
    collection.doc(itemNewId).insert({
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      dueDate: new Date().toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      tags: tagsList,
      todoId: todos.data.id,
      userId: todos.data.userId,
      completed: false,
      id: itemNewId,
    });

    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Add New Item</p>
        <CssTextField label="Title" inputRef={titleRef} className="modal_container-input" />
        <CssTextField label="Description" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <StyledDatePicker
              className="datepicker"
              value={value}
              defaultValue={dayjs(value)}
              onChange={(newValue: any) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TagsInput tags={tags} removeTag={removeTag} handleTags={handleTags} />

        <div>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={addItem} style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }}>
            Add Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
