
//user that is currently logged in(browsing the page):
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
//o getUser, pegar os dados do user logado, tem que ser feito no init, nao?
//daí se algum dado for atualizado, ele tem que ser pegado de novo

const loggedInReducer = (state=init, action) => {
  if(action.type === 'NEW_POST') {
    return {
            ...state, //isso aqui eh o resto do state: username, image, friends.
            user_logged:
              {
                ...state,
                posts: [...state, action.content] //apenas posts eh alterado
              }
           }
  }
  if(action.type === 'GET_LOGGED_USER') {
    return state.user_logged
  }

  if(action.type === 'GET_LOGGED_USERNAME') {
    return state.user_logged.username
  }

  if(action.type === 'GET_LOGGED_USERFRIENDS') {
    return state.user_logged.friends
  }

  if(action.type === 'GET_LOGGED_USERPOSTS') {
    return state.user_logged.posts
  }
  return state
}

export default loggedInReducer
