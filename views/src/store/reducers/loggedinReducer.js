
//user that is currently logged in(browsing the page):
const init = {
    username: 'Petter',
    image: './images/user_images/ddddd.jpe',
    friends: [],
    posts: []
}
//o getUser, pegar os dados do user logado, tem que ser feito no init, nao?
//daí se algum dado for atualizado, ele tem que ser pegado de novo

const loggedInReducer = (state=init, action) => {
  console.log('loggedInReducer')
  console.log(state)
  console.log(action)
  if(action.type === 'POPULATE_LOGGED_USER'){
      return action.content //ta inserindo todo o usuario que acabou de logar, por isso o estado todo é apenas o conteúdo dessa action
  }

  if(action.type === 'NEW_POST') {
    return {
            ...state, //isso aqui eh o resto do state: username, image, friends.
            posts: [ action.content, ...state.posts ] //apenas posts eh alterado
           }
  }

  if(action.type === 'DEFINE_AUTH') {
    return {
      ...state,
      auth: action.content
    }
  }

  if(action.type === 'GET_LOGGED_USER') {
    return state
  }

  if(action.type === 'GET_LOGGED_USERNAME') {
    return state.username
  }

  if(action.type === 'GET_LOGGED_USERFRIENDS') {
    return state.friends
  }

  if(action.type === 'GET_LOGGED_USERPOSTS') {
    return state.posts
  }
  return state
}

export default loggedInReducer
