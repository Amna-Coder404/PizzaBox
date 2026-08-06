import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from "../../../components/AppButton";
import useAuthStore from '../../../store/authStore';
const Profile = () => {
    const { logout } = useAuthStore();


    return (
        <SafeAreaView>
            <AppButton title={"Logout"} icon="logout" onPress={logout} />
        </SafeAreaView>
    )
}

export default Profile