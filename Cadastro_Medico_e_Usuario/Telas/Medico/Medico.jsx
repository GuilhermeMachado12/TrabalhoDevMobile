import { useEffect, useState } from "react";
import { initDB, getUsuarios, addUsuario } from "../../db/db";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Estilos from '../../Componentes/Estilos';
import TextoInput from "../../Componentes/TextoInput";
import md5 from 'md5';

export default function Medico(props) {
}