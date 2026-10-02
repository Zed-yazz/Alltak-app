import { Link } from 'expo-router';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const contactEmail = process.env.EXPO_PUBLIC_CONTACT_EMAIL?.trim();

export default function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');

        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('Preencha seu nome, e-mail e mensagem.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Informe um e-mail válido para podermos responder.');
            return;
        }

        if (!contactEmail) {
            setError('O e-mail de contato da empresa ainda não foi configurado.');
            return;
        }

        const subject = encodeURIComponent(`Contato pelo aplicativo - ${name.trim()}`);
        const body = encodeURIComponent(
            `Nome: ${name.trim()}\nE-mail para resposta: ${email.trim()}\nTelefone: ${phone.trim() || 'Não informado'}\n\nMensagem:\n${message.trim()}`,
        );

        try {
            await Linking.openURL(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
        } catch {
            setError('Não foi possível abrir o aplicativo de e-mail neste dispositivo.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <Link href="/" asChild>
                            <TouchableOpacity accessibilityRole="link" style={styles.backLink}>
                                <Text style={styles.backText}>← Página inicial</Text>
                            </TouchableOpacity>
                        </Link>

                        <Text style={styles.title}>Fale com a Alltak</Text>
                        <Text style={styles.subtitle}>
                            Deixe seus dados e sua mensagem para que nossa equipe possa entrar em contato.
                        </Text>

                        <View style={styles.form}>
                            <Text style={styles.label}>Nome *</Text>
                            <TextInput
                                accessibilityLabel="Nome"
                                autoCapitalize="words"
                                placeholder="Seu nome completo"
                                placeholderTextColor="#94A3B8"
                                returnKeyType="next"
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />

                            <Text style={styles.label}>E-mail *</Text>
                            <TextInput
                                accessibilityLabel="E-mail"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="voce@exemplo.com"
                                placeholderTextColor="#94A3B8"
                                returnKeyType="next"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.label}>Telefone (opcional)</Text>
                            <TextInput
                                accessibilityLabel="Telefone (opcional)"
                                keyboardType="phone-pad"
                                placeholder="(00) 00000-0000"
                                placeholderTextColor="#94A3B8"
                                returnKeyType="next"
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                            />

                            <Text style={styles.label}>Como podemos ajudar? *</Text>
                            <TextInput
                                accessibilityLabel="Mensagem"
                                multiline
                                placeholder="Escreva sua mensagem..."
                                placeholderTextColor="#94A3B8"
                                style={[styles.input, styles.messageInput]}
                                textAlignVertical="top"
                                value={message}
                                onChangeText={setMessage}
                            />

                            {!contactEmail && (
                                <Text style={styles.configurationNotice}>
                                    O envio depende da configuração do e-mail de contato da empresa.
                                </Text>
                            )}
                            {!!error && (
                                <Text accessibilityRole="alert" style={styles.error}>
                                    {error}
                                </Text>
                            )}

                            <TouchableOpacity
                                accessibilityRole="button"
                                activeOpacity={0.8}
                                onPress={handleSubmit}
                                style={styles.submitButton}>
                                <Text style={styles.submitText}>Enviar mensagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: 560,
    },
    backLink: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        marginBottom: 20,
    },
    backText: {
        color: '#007BFF',
        fontWeight: '600',
        fontSize: 14,
    },
    title: {
        color: '#007BFF',
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 8,
    },
    subtitle: {
        color: '#64748B',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24,
    },
    form: {
        backgroundColor: '#F8FAFC',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
    },
    label: {
        color: '#334155',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 7,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CBD5E1',
        borderRadius: 10,
        borderWidth: 1,
        color: '#1E293B',
        fontSize: 16,
        marginBottom: 16,
        minHeight: 48,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    messageInput: {
        minHeight: 120,
    },
    configurationNotice: {
        color: '#92400E',
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 14,
        padding: 12,
    },
    error: {
        color: '#B91C1C',
        fontSize: 14,
        marginBottom: 14,
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        minHeight: 50,
        paddingHorizontal: 16,
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
