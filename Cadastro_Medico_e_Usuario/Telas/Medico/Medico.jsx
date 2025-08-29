import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { initDB, addMedico, getMedico, deletarMedico, alterarMedico } from '../../db/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from "../../Componentes/TextoInput";
import md5 from 'md5';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Medico(props) {

    const [medicos, setMedicos] = useState([]);
    const [dadosnome, setdadosnome] = useState('');
    const [dadosespecialidade, setdadosespecialidade] = useState('');
    const [dadoscrm, setdadoscrm] = useState('');
    const [dadossenha, setdadossenha] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Clínico Geral', value: 'clinico-geral' },
        { label: 'Cardiologista', value: 'cardiologista' },
        { label: 'Ortopedista', value: 'ortopedista' },
        { label: 'Pediatra', value: 'pediatra' },
        { label: 'Dermatologista', value: 'dermatologista' },
        ]);

        useEffect(() => {
            (async () => {
                await initDB();
                carregarMedicos();
            })();
        }, []);

    const carregarMedicos = async () => {
        const results = await getMedico();
        setMedicos(results);
    };

    const salvar = async () => {
    if (dadosnome.length <= 0) {
        Alert.alert('Favor digitar um nome');
    } else if (!value) {
        Alert.alert('Favor selecionar a especialidade');
    } else if (dadoscrm.length <= 0) {
        Alert.alert('Favor digitar o CRM');
    } else if (dadossenha.length <= 0) {
        Alert.alert('Favor digitar a senha');
    } else {
        if (editingId !== null) {
            await alterarMedico(editingId, dadosnome, value, dadoscrm, md5(dadossenha));
            setEditingId(null);
        } else {
            await addMedico(dadosnome, value, dadoscrm, md5(dadossenha));
        }

        
        setdadosnome('');
        setValue(null); 
        setdadoscrm('');
        setdadossenha('');
        carregarMedicos();
    }

    }

    const editar = (item) => {
        setdadosnome(item.nome);
        setdadosespecialidade(item.especialidade);
        setValue(item.especialidade);
        setdadoscrm(item.crm);
        setdadosfoto(item.datafoto);
        setdadossenha(item.senha);
        setEditingId(item.id);
    }

    const deletar = async (id) => {
        await deletarMedico(id);
        carregarMedicos();
    }

    const renderMedico = ({ item }) => (
        <View style={styles.containercard}>
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.cardcoluna}>
                        <View style={styles.cardlinha}>
                            <Text style={styles.name}> Nome: {item.nome}</Text>
                            <Text style={styles.name}> Especialidade: {item.especialidade}</Text>
                            <Text style={styles.name}> CRM: {item.crm}</Text>
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



            <View style={Estilos.card_dadosMedico} >

                <Text style={styles.header}> {editingId !== null ? 'Editar Médico' : "Cadastro de Médico"}</Text>

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite seu nome'
                    maxLength={30}
                    value={dadosnome}
                    setvalue={setdadosnome}
                    label='Nome' />

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite seu crm'
                    maxLength={30}
                    value={dadoscrm}
                    setvalue={setdadoscrm}
                    label='Crm' />

                <TextoInput estilo={Estilos.input}
                    placeholder='Digite sua senha'
                    maxLength={30}
                    value={dadossenha}
                    setvalue={setdadossenha}
                    label='Senha'
                    passowrd={true} />

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecionar especialidade"
                    style={{marginTop: 10}}
                />

                <TouchableOpacity style={styles.buttonsalvar} activeOpacity={0.7} onPress={salvar}>
                    <Text style={styles.buttontexto}> Salvar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={medicos}
                style={styles.contentList}
                keyExtractor={(medico) => medico.id.toString()}
                renderItem={renderMedico}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListContainer}>
                        <Text style={styles.emptyListText}>Nenhum médico cadastrado.</Text>
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