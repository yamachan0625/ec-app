import { useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { useDispatch } from 'react-redux';
import { signOut } from '../reducks/users/operations';

const Home = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID{uid}</p>
      <p>ユーザー名前{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};
export default Home;
