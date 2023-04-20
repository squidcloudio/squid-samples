import { Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useState, useRef, useEffect } from 'react';
import TagsInput from '../components/TagsInput';

import { StyledDatePicker } from '../styled/StyledDatePicker';
import { CssTextField } from '../styled/CssTextField';
import uuid from 'react-uuid';
import { useCollection, useQuery } from '@squidcloud/react';
import { Task } from '../interfaces/index';
import { useParams } from 'react-router-dom';

const EditItem = ({ open, setOpen, index, todos }: any) => {
  const { id } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const todosCollection = useCollection<Task>('tasks');

  const items = useQuery(todosCollection.query().where('todoId', '==', `${id}`), true);

  const currentItem = items[index];

  const [value, setValue] = useState<any>('');
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    if (currentItem) {
      setTags(currentItem?.data.tags);
      setValue(currentItem?.data.dueDate);
    }
  }, [currentItem]);

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

  const updateItem = () => {
    todosCollection.doc(currentItem.data.id).update({
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      dueDate: new Date(value).toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      } as Intl.DateTimeFormatOptions),
      tags,
      id: currentItem.data.id,
    });

    setValue('');
    setTags([]);
    setOpen(false);
  };

  return (
    <Modal className="modal" open={open} onClose={() => setOpen(false)}>
      <div className="modal_container">
        <p>Edit Item</p>
        <CssTextField
          label="Title"
          inputRef={titleRef}
          className="modal_container-input"
          defaultValue={currentItem?.data.title}
        />
        <CssTextField label="Description" inputRef={descriptionRef} defaultValue={currentItem?.data.description} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <StyledDatePicker
              className="datepicker"
              value={dayjs(value)}
              onChange={(newValue: any) => setValue(newValue)}
              ref={datePickerRef}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TagsInput tags={tags} removeTag={removeTag} handleTags={handleTags} />

        <div>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={updateItem} style={{ backgroundColor: todos ? todos.data.color : '#14BE6E' }}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditItem;
