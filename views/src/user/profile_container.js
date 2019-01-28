import { connect } from 'react-redux'
import Profile from './profile'

const mapStateToProps = (state) => ({
  profile: {
    nome: state.loggedin.nome
  }
})

const ProfileContainer = connect(mapStateToProps)(Profile)

export default ProfileContainer
