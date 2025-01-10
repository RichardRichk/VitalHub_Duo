import { Button, View } from "react-native"

export const NavigationFunc = ({navigation}) => {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Button 
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button 
                title="Forgot Password"
                onPress={() => navigation.navigate("Forgot_Password")}
            />
            <Button 
                title="Email Verify"
                onPress={() => navigation.navigate("Email_Verify")}
            />
            <Button 
                title="Change Password"
                onPress={() => navigation.navigate("Change_Password")}
            />
            <Button 
                title="Create Account"
                onPress={() => navigation.navigate("Create_Account")}
            />
            <Button 
                title="Profile"
                onPress={() => navigation.navigate("Profile")}
            />
            <Button 
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />
            <Button 
                title="Form Require"
                onPress={() => navigation.navigate("FormRequire")}
            />

            <Button 
                title="Clinic Select"
                onPress={() => navigation.navigate("ClinicSelect")}
            />
            <Button 
                title="Doctor Select"
                onPress={() => navigation.navigate("DoctorSelect")}
            />
            <Button 
                title="Calendar Screen"
                onPress={() => navigation.navigate("CalendarScreen")}
            />
            <Button 
                title="Clinic Adress"
                onPress={() => navigation.navigate("ClinicAdress")}
            />
        </View>
    )
}