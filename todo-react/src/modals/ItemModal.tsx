import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import React, { useState, useRef } from 'react';
import TagsInput from '../components/TagsInput';

import { StyledDatePicker } from '../styled/StyledDatePicker';
import { CssTextField } from '../styled/CssTextField';
import uuid from 'react-uuid';
import { Modal } from '@mui/material';

const ItemModal = ({ collection, todos, open, setOpen, fromCalendar, currentDate }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

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
      dueDate: new Date(value).toLocaleDateString('en-Us', {
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

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Add new item</p>

        <CssTextField label="Title" inputRef={titleRef} className="modal_container-input" />
        <CssTextField label="Description" inputRef={descriptionRef} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <StyledDatePicker
              className="datepicker"
              value={fromCalendar ? currentDate : value}
              defaultValue={fromCalendar ? dayjs(currentDate) : dayjs(value)}
              onChange={(newValue: any) => setValue(newValue)}
              ref={datePickerRef}
              disabled={fromCalendar}
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
