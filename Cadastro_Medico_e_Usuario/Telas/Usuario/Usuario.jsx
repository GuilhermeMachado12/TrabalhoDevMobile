import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { initDB, addUsuario, getUsuarios, deletarUsuario, alterarUsuario } from '../../db/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from "../../Componentes/TextoInput";
import md5 from 'md5';

export default function Usuario(props) {

const [usuarios, setUsuarios] = useState([]);
    const [dadosnome, setdadosnome] = useState('');
    const [dadoscpf, setdadoscpf] = useState('');
    const [dadosrg, setdadosrg] = useState('');
    const [dadosdataNascimento, setdadosdataNascimento] = useState('');
    const [dadossenha, setdadossenha] = useState('');
    const [editingId, setEditingId] = useState(null);


useEffect(() => {
        (async () => {
            await initDB();
            carregarUsuarios();
        })();
    }, []);

    const carregarUsuarios = async () => {
        const results = await getUsuarios();
        setUsuarios(results);
    };

    const salvar = async () => {
        if (dadosnome.length <= 0) {
            Alert.alert('Favor digitar um de nome');
        }
        else if (dadoscpf.length <= 0) {
            Alert.alert('Favor digitar o cpf');
        }
        else if (dadosrg.length <= 0) {
            Alert.alert('Favor digitar o rg');
        }
        else if (dadosdataNascimento.length <= 0) {
            Alert.alert('Favor digitar a data nascimento');
        }
        else if (dadossenha.length <= 0) {
            Alert.alert('Favor digitar a senha');
        }
        else {
            if (editingId !== null) {
                alterarUsuario(editingId, dadosnome, dadoscpf, dadosrg, dadosdataNascimento, md5(dadossenha));
                setEditingId(null);
            }
            else 
            {
                addUsuario(dadosnome, dadoscpf, dadosrg, dadosdataNascimento, md5(dadossenha));

            }
            setdadosnome('');
            setdadoscpf('');
            setdadosrg('');
            setdadosdataNascimento('');
            setdadossenha('');
            carregarUsuarios();

        }
    }

    const editar = (item) => {
            setdadosnome(item.nome);
            setdadoscpf(item.cpf);                        
            setdadosrg(item.rg);
            setdadosdataNascimento(item.dataNascimento);
            setdadossenha(item.senha);
            setEditingId(item.id);
    }

    const deletar = async (id) => {
            await deletarUsuario(id);
            carregarUsuarios();
    }

  const renderUsuario = ({ item }) => (
    <View style={styles.containercard}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardcoluna}>
            <View style={styles.cardlinha}>
              <Text style={styles.name}> Nome: {item.nome}</Text>
              <Text style={styles.name}> Cpf: {item.cpf}</Text>
              <Text style={styles.name}> RG: {item.rg}</Text>
              <Text style={styles.name}> DataNascimento: {item.dataNascimento}</Text>
              <View style={styles.botoesacoes}>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => editar(item)}>
                  <Text style={styles.buttontexto}> Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => { deletar(item.id) }}>
                  <Text style={styles.buttontexto}> Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

    return (
        <View style={styles.container}>



            <View style={Estilos.card_dados} >
            
            <Text style={styles.header}> {editingId !== null ? 'Editar Usuário' : "Cadastro de Usuário"}</Text>

            <TextoInput estilo={Estilos.input} 
                            placeholder='Digite seu nome'
                            maxLength={30}
                            value = {dadosnome}
                            setvalue={setdadosnome} 
                            label='Nome'/>

            <TextoInput estilo={Estilos.input} 
                            placeholder='Digite seu cpf'
                            maxLength={11}
                            value = {dadoscpf}
                            setvalue={setdadoscpf} 
                            label='Cpf'/>

            <TextoInput estilo={Estilos.input} 
                            placeholder='Digite seu rg'
                            maxLength={7}
                            value = {dadosrg}
                            setvalue={setdadosrg} 
                            label='Rg'/>  

             <TextoInput estilo={Estilos.input} 
                            placeholder='Digite sua data de nascimento'
                            maxLength={12}
                            value = {dadosdataNascimento}
                            setvalue={setdadosdataNascimento} 
                            label='Data de Nascimento'/>              

            <TextoInput estilo={Estilos.input} 
                            placeholder='Digite sua senha'
                            maxLength={30}
                            value = {dadossenha}
                            setvalue={setdadossenha} 
                            label='Senha'
                            passowrd={true}/>    

             
             <TouchableOpacity style={styles.buttonsalvar} activeOpacity={0.7} onPress={salvar}>
                    <Text style={styles.buttontexto}> Salvar</Text>
             </TouchableOpacity>
            </View>

            <FlatList
                data={usuarios}
                style={styles.contentList}
                keyExtractor={(usuario) => usuario.id.toString()}
                renderItem={renderUsuario}
                ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>Nenhum usuário cadastrado.</Text>
                </View>
                )}
            />

     </View>
    );
}

const styles = StyleSheet.create({
  header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#154360',
  },
  container: {
        flex: 1,
        backgroundColor: '#ebf0f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
  },
  buttonsalvar: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 10,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
  },
  button: {
        backgroundColor: '#154360',
        width: 100,
        height: 30,
        marginTop: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 5
  },
  buttontexto: {
    fontSize: 16,
    color: '#ffffff'
  },
  contentList: {
    flex: 1,
    width: '100%'
  },
  containercard: {
    felx: 1,
    width: '90%'
  },
  cardcoluna: {
    flexDirection: 'row'
  },
  cardlinha: {
    flexDirection: 'column'
  },
  botoesacoes: {
    flexDirection: 'row',
    margin: 10
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
    width: '100%'
  },
  texto: {
    fontSize: 18,
    alignSelf: 'center',
  },
  textobold: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: 'gray',
  }
});