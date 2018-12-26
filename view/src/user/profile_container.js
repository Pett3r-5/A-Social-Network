import { connect } from 'react-redux'
import Profile from './profile'
import add_post from '../store/actions/post_add'

const mapStateToProps = (state) => ({
  profile: {
    username: state.loggedin.user_logged.username,
    image: state.loggedin.user_logged.image
  }
})

const mapDispatchToProps = (dispatch) => ({
  add_post: (post) => {  dispatch(add_post(post)) }
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer
