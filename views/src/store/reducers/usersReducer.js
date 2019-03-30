
//user that is being viewed(whose page is being visisted by the user who is logged in):
const init = {
  nome: 'Outro',
  imagem: './images/user_images/ddddd.jpe',
  amigos: [],
  posts: []
}
//O objeto tem que ser buscado(e susbstituir o anterior) com fetch toda vez que o usuario entrar na página alheia.

const usersReducer = (state=init, action) => {
  if(action.type === 'POPULATE_OTHER_USER') {
    return {
      ...state,
      _id: action.content._id,
      nome: action.content.nome,
      imagem:  action.content.imagem,
      email:  action.content.email,
      posts:  action.content.posts,
      amigos:  action.content.amigos,
      amigosPendentes:  action.content.amigosPendentes
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
