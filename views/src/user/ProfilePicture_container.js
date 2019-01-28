import { connect } from 'react-redux'
import ProfilePicture from './ProfilePicture'

const mapStateToProps = (state, ownProps) => ({
  imagem: {
    path: require(`../images/user_images/${state.loggedin.imagem}`),
    type: ownProps.type
  }
})

const ProfilePictureContainer = connect(mapStateToProps)(ProfilePicture)

export default ProfilePictureContainer
