import React from "react";
import { View, Text, Button } from "react-native";
// import { useAuth } from '../components/AuthContext';

const ProfileScreen: React.FC = () => {
  //   const { user, signInWithGoogle } = useAuth();

  //   if (!user) {
  //     return (
  //       <View>
  //         <Button title="Login with Google" onPress={signInWithGoogle} />
  //       </View>
  //     );
  //   }

  //   return (
  //     <View>
  //       <Text>Name: {user.displayName}</Text>
  //       <Text>Email: {user.email}</Text>
  //     </View>
  //   );
  return (
    <View>
      <Text>Hola soy tu perfil</Text>
    </View>
  );
};

export default ProfileScreen;
