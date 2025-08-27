import * as SQLite from 'expo-sqlite';

const db= SQLite.openDatabaseSync('medico_usuario.db');

export async function initDB() {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        create table if not exists Medico (
            id integer primary key autoincrement,
            nome text not null,
            especialidade text,
            crm text,
            foto text,
            senha text
        );
    `),
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        create table if not exists Usuario (
            id integer primary key autoincrement,
            nome text not null,
            cpf number not null,
            rg number,
            dataNascimento date,
            senha text
        );
    `);
}

export async function addMedico(nome, especialidade, crm, foto, senha) {
  console.log('inserindo médico');
  await db.runAsync('INSERT INTO Medico (nome, especialidade, crm, foto, senha) VALUES (?, ? , ?, ?, ?);', nome, especialidade, crm, foto, senha);
}

export async function getMedico() {
  console.log('Selecionando o médico');
  return await db.getAllAsync('SELECT * FROM Medico');

}

export async function deletarMedico(id) {
  await db.runAsync('DELETE FROM Medico WHERE id = ?;', id);
}

export async function alterarMedico(id, nome, especialidade, crm, foto, senha) {
  await db.runAsync('update Medico set nome=?, especialidade=?, crm=?, foto=?, senha=? WHERE id = ?;', nome, especialidade, crm, foto, senha, id);
}

export async function addUsuario(nome, cpf, rg, dataNascimento, senha) {
  console.log('inserindo usuário');
  await db.runAsync('INSERT INTO Usuario (nome, cpf, rg, dataNascimento, senha) VALUES (?, ? , ?, ?, ?);', nome, cpf, rg, dataNascimento, senha);
}

export async function getUsuarios() {
  console.log('Selecionando o usuário');
  return await db.getAllAsync('SELECT * FROM Usuario');

}

export async function deletarUsuario(id) {
  await db.runAsync('DELETE FROM Usuario WHERE id = ?;', id);
}

export async function alterarUsuario(id, nome, cpf, rg, dataNascimento, senha) {
  await db.runAsync('update Usuario set nome=?, cpf=?, rg=?, dataNascimento=?, senha=? WHERE id = ?;', nome, cpf, rg, dataNascimento, senha, id);
}

