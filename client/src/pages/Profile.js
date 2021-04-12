import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import StoryList from '../components/StoryList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';
import { ADD_FRIEND } from '../utils/mutations';
import StoryForm from '../components/StoryForm';

const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="body-text m-4 p-4">
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="m-3 p-4 body-text body-card">
      <div className="flex-row mb-4">
        <h2 className="body-title p-3 mb-3 display-inline-block" style={{fontSize: '32px'}}>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile..
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>
      <div className="flex-row justify-space-between mb-3 nav-link">
        <div className="col-12 mb-3 col-lg-8">
          <StoryList stories={user.stories} title={`${user.username}'s stories...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <StoryForm />}</div>

    </div>
  );
};

export default Profile;
