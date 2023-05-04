import React from 'react';
import { Checkbox, List, ListItem, Typography, Divider, Box } from '@mui/material';

const FinishedList = () => {
  return (
    <div>
      <Typography variant="h4">Completed</Typography>
      <List>
        {[1].map((el) => {
          return (
            <ListItem>
              <Box width={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox />
                <Box width={1} mt={1}>
                  <Typography pb={1}>Some text</Typography>
                  <Divider color="#E1E6EF" />
                  <Box pt={1}>
                    <Typography>Due date</Typography>
                    <Typography>Weekly</Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default FinishedList;
