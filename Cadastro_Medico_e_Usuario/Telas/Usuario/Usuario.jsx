import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { initDB, addUsuario, getUsuarios, deletarUsuario, alterarUsuario } from '../../db/db';
import Estilos from '../../Componentes/Estilos';
import TextoInput from "../../Componentes/TextoInput";
import md5 from 'md5';

export default function Usuario(props) {
}