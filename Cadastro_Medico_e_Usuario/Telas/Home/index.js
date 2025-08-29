import { Text, View , TouchableOpacity } from "react-native";
import Estilos from '../../Componentes/Estilos';

export default function Home(props) {


    const AbrirCadMedico = () => {
      props.navigation.navigate('Medico');
    }

    const AbrirCadUsuario = () => {
       props.navigation.navigate('Usuario');
    }

      return(
        <View style={Estilos.container}>

             <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={AbrirCadUsuario} >
                <Text style={Estilos.buttonTexto}>Cadastro de Usuário</Text>
             </TouchableOpacity>
             
            <TouchableOpacity style={Estilos.buttonHome} activeOpacity={0.7} onPress={AbrirCadMedico} >
                <Text style={Estilos.buttonTexto}>Cadastro de Médico</Text>
             </TouchableOpacity>

        </View>
    )
}
    