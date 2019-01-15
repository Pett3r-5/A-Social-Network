import { connect } from 'react-redux'
import Profile from './profile'

const mapStateToProps = (state) => ({
  profile: {
    nome: state.loggedin.nome,
    imagem: require(`../images/user_images/${state.loggedin.imagem}`)
  }
})

const ProfileContainer = connect(mapStateToProps)(Profile)

export default ProfileContainer
