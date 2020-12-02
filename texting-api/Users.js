const Users = [];
const avatars = [
  'https://www.myhealthrecord.gov.au/sites/default/files/styles/large/public/docicon.png?itok=b99yS3DK',
  'https://wordsmith.org/words/images/avatar2_large.png',
  'https://pickaface.net/gallery/avatar/pk_karthik556366573d429.png',
  'https://wishesonlinedatingsecrets.club/wp-content/uploads/dsp_media/user_photos/user_47/47_white%20girl%20with%20black%20hair%20.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:AN9GcQRoRK_rLPimfIFy5oo-3tx0aTuZliReU3_tQdkEbkTIz9rSifCBkaHR2aADMe-xzRZGw5aMgvymZjcj1pXKJzCWxzgEamfxtc&usqp=CAU&ec=45732303',
  'https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png',
  'https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
];
const len = avatars.length;
let index = 0;
const addUsers = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = Users.find(
    (user) => user.room === room && user.name === name
  );
  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };
  const user = {
    id,
    name,
    room,
    avatarUrl: avatars[index],
  };
  Users.push(user);
  console.log(Users);
  index = (index + 1) % len;
  return { user };
};

const removeUser = (id) => {
  const index = Users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return Users.splice(index, 1)[0];
  }
};

const getUsers = (id) => Users.find((user) => user.id === id);

const getUserInRoom = (room) => Users.filter((user) => user.room === room);

module.exports = { addUsers, removeUser, getUsers, getUserInRoom };
