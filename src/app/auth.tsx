import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';



export default function AuthScreen() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true); // true para Login, false para Cadastro

    // Estados dos campos
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');

    // Função para mascarar o CPF: 000.000.000-00
    const aplicarMascaraCpf = (valor: string) => {
        let apenasNumeros = valor.replace(/\D/g, '');
        if (apenasNumeros.length > 11) apenasNumeros = apenasNumeros.substring(0, 11);
        apenasNumeros = apenasNumeros.replace(/(\d{3})(\d)/, '$1.$2');
        apenasNumeros = apenasNumeros.replace(/(\d{3})(\d)/, '$1.$2');
        apenasNumeros = apenasNumeros.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(apenasNumeros);
    };

    // Função para mascarar o CEP: 00000-000
    const aplicarMascaraCep = (valor: string) => {
        let apenasNumeros = valor.replace(/\D/g, '');
        if (apenasNumeros.length > 8) apenasNumeros = apenasNumeros.substring(0, 8);
        apenasNumeros = apenasNumeros.replace(/(\d{5})(\d)/, '$1-$2');
        setCep(apenasNumeros);
    };

    const lidarComAcao = () => {
        if (isLogin) {
            console.log("Dados de Login:", { email, senha });
        } else {
            console.log("Dados de Registo:", { nome, email, senha, cpf, cep });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView contentContainerStyle={styles.scroll}>
                
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../images.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Seletor de Abas (Entrar / Registar) */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tabButton, isLogin && styles.tabActive]} 
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.tabButton, !isLogin && styles.tabActive]} 
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Criar Conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ marginBottom: 16 }} 
                        onPress={() => router.back()}
                    >
                    <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>← Voltar à Página Principal</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.titulo}>{isLogin ? 'Bem-vindo de volta' : 'Criar Conta'}</Text>
                <Text style={styles.subtitulo}>
                    {isLogin ? 'Faça login para continuar' : 'Preencha os dados para efetuar o registo'}
                </Text>

                {/* Campos exclusivos de Cadastro */}
                {!isLogin && (
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        placeholderTextColor="#999999"
                        value={nome}
                        onChangeText={setNome}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#999999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999999"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                {/* Campos exclusivos de Cadastro */}
                {!isLogin && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="CPF (000.000.000-00)"
                            placeholderTextColor="#999999"
                            keyboardType="numeric"
                            value={cpf}
                            onChangeText={aplicarMascaraCpf}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="CEP (00000-000)"
                            placeholderTextColor="#999999"
                            keyboardType="numeric"
                            value={cep}
                            onChangeText={aplicarMascaraCep}
                        />
                    </>
                )}

                <TouchableOpacity activeOpacity={0.8} onPress={lidarComAcao} style={styles.botaoContainer}>
                    <LinearGradient
                        colors={['#007BFF', '#0056B3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.textoBotao}>{isLogin ? 'Entrar' : 'Registar'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scroll: {
        padding: 24,
        justifyContent: 'center',
        flexGrow: 1
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 210,
        height: 65,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F7FA',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
    },
    tabActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 32,
        fontWeight: '900',
        color: '#007BFF',
        letterSpacing: -1,
        marginBottom: 4,
    },
    subtitulo: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#F5F7FA',
        color: '#333333',
        padding: 18,
        borderRadius: 12,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    botaoContainer: {
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    gradient: {
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotao: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});