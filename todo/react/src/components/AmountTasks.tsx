import moment from 'moment';

const AmountTasks = ({ date, tasks, someday }: any) => {
  const today = moment().format('M/D/YYYY');
  const tomorrow = moment().add(1, 'day').startOf('day').format('M/D/YYYY');

  return (
    <div>
      {
        tasks
          .filter((el: any) => el.data.completed === false)
          .filter((task: any) => {
            if (someday) {
              return task.data.dueDate !== today && task.data.dueDate !== tomorrow;
            } else {
              return task.data.dueDate === date;
            }
          }).length
      }
    </div>
  );
};

export default AmountTasks;
