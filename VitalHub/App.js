import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationFunc } from './src/screens/Navigation/Navigation';
import { LoginFunc } from './src/screens/Login/Login';
import { ForgotPassword } from './src/screens/ForgotPassword/ForgotPassword';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';

//import das fonts
import { useFonts } from 'expo-font';
import {MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates'
import {Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular} from '@expo-google-fonts/quicksand'
import { EmailVerify } from './src/screens/EmailVerify/EmailVerify';
import { ChangePassword } from './src/screens/ChangePassword/ChangePassword';
import { CreateAccountFunc } from './src/screens/CreateAccount/CreateAccount';
import { ProfileFunc } from './src/screens/Profile/Profile';
import { HomeFunc } from './src/screens/Home/Home';
import { FormRequire } from './src/screens/FormRequire/FormRequire';
import { ClinicSelect } from './src/screens/ClinicSelect/ClinicSelect';
import { DoctorSelect } from './src/screens/DoctorSelect/DoctorSelect';
import { CalendarScreen } from './src/screens/CalendarScreen/CalendarScreen';
import { ClinicAdress } from './src/screens/ClinicAdress/ClinicAdress';
import { Main } from './src/screens/Main/Main';


//instancia do StackNavigator
const Stack = createNativeStackNavigator();

export default function App() {

  const[fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
    Quicksand_400Regular
  })

  if(!fontsLoaded && !fontsError){
    return null;
  }
  // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    // Navegacao

    //Container
    //StackNavigation
    //StaclScreen

    // envolve a estrutura da navegacao
    <NavigationContainer>

      {/* componente paranavegacao */}
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >

        <Stack.Screen
          name='Login'
          component={LoginFunc}
          options={{title: 'Login'}}
        />
        
        <Stack.Screen
          name ='Main'
          component={Main}
        />


        <Stack.Screen
          name='Forgot_Password'
          component={ForgotPassword}
          options={{title: 'Forgot_Password'}}
        />

        <Stack.Screen
          name='Email_Verify'
          component={EmailVerify}
          options={{title: 'Email_Verify'}}
        />

        <Stack.Screen
          name='Change_Password'
          component={ChangePassword}
          options={{title: 'Change_Password'}}
        />

        <Stack.Screen
          name='Create_Account'
          component={CreateAccountFunc}
          options={{title: 'Create_Account'}}
        />

        <Stack.Screen
          name='Profile'
          component={ProfileFunc}
          options={{title: 'Profile'}}
        />

        <Stack.Screen
          name='Home'
          component={HomeFunc}
          options={{title: 'Home'}}
        />

        <Stack.Screen
          name='FormRequire'
          component={FormRequire}
          options={{title: 'Form_Require'}}
        />

        <Stack.Screen
          name='ClinicSelect'
          component={ClinicSelect}
          options={{title: 'Clinic_Select'}}
        />
        <Stack.Screen
          name='DoctorSelect'
          component={DoctorSelect}
          options={{title: 'Doctor_Select'}}
        />
        <Stack.Screen
          name='CalendarScreen'
          component={CalendarScreen}
          options={{title: 'Calendar_Screen'}}
        />
        <Stack.Screen
          name='ClinicAdress'
          component={ClinicAdress}
          options={{title: 'Clinic_Adress'}}
        />

      </Stack.Navigator>

      <StatusBar
      style="auto" 
      backgroundColor="#FAFAFA"
      />

      

      
    </NavigationContainer>
  );
}
