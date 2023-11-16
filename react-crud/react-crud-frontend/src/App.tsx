import './App.css';
import CreateUser from './components/createUser';
import ReadUsers from './components/readUsers';
import UpdateUser from './components/updateUser.tsx';
import DeleteUser from './components/deleteUser.tsx';
function App() {
  return (
    <>
      <h1>Squid React SDK</h1>
      <CreateUser />
      <ReadUsers />
      <UpdateUser />
      <DeleteUser />
    </>
  );
}
export default App;
