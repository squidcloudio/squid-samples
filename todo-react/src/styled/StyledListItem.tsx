import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';

import { Checkbox, Typography, Divider, Box, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import EditItem from '../modals/EditItem';

export const StyledList = styled(ListItem)({
  borderRadius: '12px',
  paddingBottom: '16px',
  '&:hover': {
    backgroundColor: '#F8F9FC',
    cursor: 'pointer',
  },
});

const StyledListItem = ({ todos, item, index, onClick, isChecked }: any) => {
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);

  const dueDate = item.data.dueDate ?? '';
  const formatedDueDate = new Date(dueDate)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .toUpperCase();

  return (
    <StyledList onMouseEnter={() => setHoveredItem(index)} onMouseLeave={() => setHoveredItem(null)}>
      <Box width={1} display="flex" alignItems="flex-start" className={isChecked && 'completed_list'}>
        <Checkbox
          checked={isChecked}
          disabled={isChecked}
          onClick={onClick}
          size="small"
          sx={{
            '&.Mui-checked': {
              color: todos ? todos.data.color : '',
            },
          }}
        />

        {hoveredItem === index && !isChecked && (
          <IconButton onClick={() => setOpen(true)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}

        <Box width={1} mt={1}>
          <Typography pb={1} className={isChecked && 'completed'}>
            {item.data.title}
          </Typography>
          <Typography mb={1}>{item.data.description}</Typography>
          <Divider color="#E1E6EF" />
          <Box pt={1} display="flex" justifyContent="space-between" flexWrap="wrap">
            <Typography>
              DUE DATE: <span>{formatedDueDate}</span>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {item.data.tags?.map((tag: any, i: any) => {
                return (
                  <div className={!isChecked ? 'tag-item' : 'tag-item_completed'} key={i}>
                    <span className="text">{tag?.name}</span>
                  </div>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      <EditItem open={open} setOpen={setOpen} index={index} todos={todos} />
    </StyledList>
  );
};

export default StyledListItem;
