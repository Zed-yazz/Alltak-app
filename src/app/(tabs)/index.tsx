import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TeamCarousel } from '@/components/team-carousel';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    Platform.OS === 'web' && styles.webScroll,
                ]}>
                
                {/* Cabeçalho com logo e acesso ao contato */}
                <View style={styles.header}>
                    <Image 
                        source={require('../../images.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() => router.push('/contact')}
                        style={styles.botaoUsuario}>
                        <Text style={styles.textoBotaoUsuario}>Contato</Text>
                    </TouchableOpacity>
                </View>

                {/* Hero / Apresentação e Valores */}
                <View style={styles.heroSection}>
                    <Text style={styles.titulo}>Soluções Visuais e Adesivos de Elite</Text>
                    <Text style={styles.subtitulo}>
                        Inovação, paixão e compromisso com a excelência. Na Alltak, transformamos superfícies e criamos tendências no mercado de envelopamento e comunicação visual.
                    </Text>
                </View>

                {/* Secção de Produtos */}
                <Text style={styles.secaoTitulo}>Nossos Produtos e Aplicações</Text>
                <View style={styles.gridProdutos}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitulo}>Innovative Wrap Collab</Text>
                        <Text style={styles.cardDesc}>Projetos exclusivos e parcerias de alto nível com envelopadores.</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitulo}>Automotivo</Text>
                        <Text style={styles.cardDesc}>Linha completa de vinis para personalização e proteção de veículos.</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitulo}>Cristais Decorativos</Text>
                        <Text style={styles.cardDesc}>Sofisticação e privacidade para arquitetura e decoração de interiores.</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitulo}>Comunicação Visual</Text>
                        <Text style={styles.cardDesc}>Materiais de alta durabilidade para sinalização e destaque de marcas.</Text>
                    </View>
                </View>

                <TeamCarousel />

                {/* Botão de Ação Final com Link */}
                <View style={styles.ctaContainer}>
                    <Link href="/auth" asChild>
                        <TouchableOpacity activeOpacity={0.8} style={styles.botaoContainer}>
                            <LinearGradient
                                colors={['#007BFF', '#0056B3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradient}
                            >
                                <Text style={styles.textoBotaoCta}>Aceder à Plataforma</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Link>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scroll: {
        padding: 20,
        flexGrow: 1,
    },
    webScroll: {
        paddingTop: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 10,
    },
    logo: {
        width: 130,
        height: 45,
    },
    botaoUsuario: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#F0F6FF',
    },
    textoBotaoUsuario: {
        color: '#007BFF',
        fontWeight: 'bold',
        fontSize: 13,
    },
    heroSection: {
        marginBottom: 28,
    },
    titulo: {
        fontSize: 26,
        fontWeight: '900',
        color: '#007BFF',
        letterSpacing: -0.5,
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 15,
        color: '#666666',
        lineHeight: 22,
    },
    secaoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 6,
    },
    secaoSub: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 14,
    },
    gridProdutos: {
        gap: 12,
        marginBottom: 28,
    },
    card: {
        backgroundColor: '#F5F7FA',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    cardTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0056B3',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: '#666666',
    },
    gridEquipa: {
        gap: 12,
        marginBottom: 30,
    },
    cardFuncionario: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 14,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    nomeFuncionario: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    cargoFuncionario: {
        fontSize: 13,
        color: '#64748B',
    },
    ctaContainer: {
        marginBottom: 20,
    },
    botaoContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    gradient: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBotaoCta: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});