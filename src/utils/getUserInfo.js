import axios from 'axios';

export const getUserInfo = (token, setUser, history, user) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  console.log(token, setUser, history);
  axios
    .get('https://ecomerce-master.herokuapp.com/api/v1/user/me', config)
    .then(({ userData, status }) => {
      console.log(userData, 'DATA');

      setUser({
        ...user,
        name: userData.user.first_name,
        last_name: userData.user.last_name,
        _id: userData.user._id,
        role: userData.user.role,
      });
      history.push('/');
    })
    .catch((e) => console.log(e));

  //   fetch('https://ecomerce-master.herokuapp.com/api/v1/user/me', {
  //     method: 'GET', // or 'PUT'
  //     headers: {
  //       Authorization: `JWT ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((response) => console.log('Success:', response))

  //     .catch((error) => console.error('Error:', error));
};

export default getUserInfo;
