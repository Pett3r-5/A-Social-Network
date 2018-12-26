
//user that is being viewed(whose page is being visisted by the user who is logged in):
const init = {
  user_logged:
  {
    username: 'Petter',
    image: './images/user_images/ddddd.jpe',
    friends: [],
    posts: []
  },
  other_users:
  {
    username: 'Outro',
    image: './images/user_images/ddddd.jpe',
    friends: [],
    posts: []
  }
}
//O objeto tem que ser buscado(e susbstituir o anterior) com fetch toda vez que o usuario entrar na página alheia.

const usersReducer = (state=init, action) => {
  if(action.type === 'NEW_POST') {
    return {
            ...state, //isso aqui eh o resto do state: username, image, friends.
            other_users: {
              ...state,
              posts: [...state, action.content] //apenas posts eh alterado
            }

           }
  }
  if(action.type === 'GET_OTHER_USER') {
    return state.other_users
  }

  if(action.type === 'GET_OTHER_USERNAME') {
    return state.other_users.username
  }

  if(action.type === 'GET_OTHER_USERFRIENDS') {
    return state.other_users.friends
  }

  if(action.type === 'GET_OTHER_USERPOSTS') {
    return state.other_users.posts
  }
  return state
}

export default usersReducer
