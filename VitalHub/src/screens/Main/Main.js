
//Importarno recurso do bottom tabs

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeFunc } from "../Home/Home";
import { ProfileFunc } from "../Profile/Profile";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { ContentIcon, TextIcon } from "./Style";

const BottomTab = createBottomTabNavigator();

export const Main = () => {
    return(
        <BottomTab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
                tabBarActiveBackgroundColor: "transparent",
                tabBarShowLabel: false,
                headerShown: false,


                tabBarIcon: ({focused}) => {
                    if ( route.name === "HomeFunc") {
                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome5 name="calendar-check" size={18} color="#607EC5"/>
                                { focused && <TextIcon>Agenda </TextIcon>}
                            </ContentIcon>
                        )
                    } else {
                        return (
                        <ContentIcon
                                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome5 name="user-circle" size={22} color="#607EC5"/>
                                { focused && <TextIcon>Perfil </TextIcon>}
                            </ContentIcon>
                        )
                    }
                }

            })}
            //Define a rota inicial
            initialRouteName="HomeFunc"
        >
            {/* Criando a rota da home */}
            <BottomTab.Screen
                name="HomeFunc"
                component={HomeFunc}
            />


            {/* Criando a rota do perfil */}
            <BottomTab.Screen
                name="Profile"
                component={ProfileFunc}
            />
        </BottomTab.Navigator>
    )
}