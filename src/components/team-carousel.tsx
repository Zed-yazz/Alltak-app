import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

type Employee = {
    name: string;
    role: string;
    image: number;
};

const employees: Employee[] = [
    {
        name: 'Matheus Alves',
        role: 'Envelopador Aprendiz',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.49.07 PM.jpeg'),
    },
    {
        name: 'Pedro Henrique',
        role: 'Envelopador Aprendiz',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.49.07 PM (1).jpeg'),
    },
    {
        name: 'Caio Martins',
        role: 'Envelopador Pleno',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.49.07 PM (2).jpeg'),
    },
    {
        name: 'Beatriz Lima',
        role: 'Administrativo',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.49.07 PM (3).jpeg'),
    },
    {
        name: 'Ana Clara Mendes',
        role: 'Administrativo',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.49.08 PM.jpeg'),
    },
    {
        name: 'Bruno Costa',
        role: 'TI',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.52.46 PM.jpeg'),
    },
    {
        name: 'Rafael Nunes',
        role: 'Envelopador Pleno',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.52.46 PM (1).jpeg'),
    },
    {
        name: 'Daniel Ribeiro',
        role: 'Contador',
        image: require('../../assets/images/WhatsApp Image 2026-10-02 at 6.52.46 PM (2).jpeg'),
    },
];

export function TeamCarousel() {
    const { height, width } = useWindowDimensions();
    const cardWidth = Math.min(width - 40, 460);
    const imageHeight = Math.min(height * 0.46, 420);
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
        setActiveIndex(Math.max(0, Math.min(index, employees.length - 1)));
    };

    const showEmployee = (index: number) => {
        scrollRef.current?.scrollTo({ x: index * cardWidth, animated: true });
        setActiveIndex(index);
    };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>Nossa equipe</Text>
            <Text style={styles.subtitle}>
                Conheça as pessoas que fazem a Alltak acontecer.
            </Text>

            <View style={styles.carouselBleed}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScrollEnd}
                    contentContainerStyle={[
                        styles.carouselContent,
                        { paddingHorizontal: (width - cardWidth) / 2 },
                    ]}>
                    {employees.map((employee, index) => (
                        <View
                            key={employee.name}
                            style={[styles.card, { width: cardWidth }]}
                            accessible
                            accessibilityLabel={`${employee.name}, ${employee.role}`}>
                            <Image
                                source={employee.image}
                                contentFit="contain"
                                accessibilityLabel={`Foto de ${employee.name}`}
                                style={[styles.photo, { height: imageHeight }]}
                            />
                            <Text style={styles.name}>{employee.name}</Text>
                            <Text style={styles.role}>{employee.role}</Text>
                            <Text style={styles.position}>
                                {String(index + 1).padStart(2, '0')} /{' '}
                                {String(employees.length).padStart(2, '0')}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.pagination} accessibilityLabel="Navegação dos funcionários">
                {employees.map((employee, index) => (
                    <Pressable
                        key={employee.name}
                        onPress={() => showEmployee(index)}
                        accessibilityRole="button"
                        accessibilityLabel={`Ver ${employee.name}, ${index + 1} de ${employees.length}`}
                        accessibilityState={{ selected: index === activeIndex }}
                        style={[
                            styles.dot,
                            index === activeIndex && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
            <Text style={styles.hint}>Deslize para ver todos os funcionários</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 14,
    },
    carouselBleed: {
        marginHorizontal: -20,
    },
    carouselContent: {
        alignItems: 'stretch',
    },
    card: {
        backgroundColor: '#F8FAFC',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 12,
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        backgroundColor: '#E9EEF5',
        borderRadius: 12,
        marginBottom: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        textAlign: 'center',
    },
    role: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: '600',
        marginTop: 4,
        textAlign: 'center',
    },
    position: {
        color: '#64748B',
        fontSize: 12,
        marginTop: 8,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        marginTop: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CBD5E1',
    },
    activeDot: {
        width: 22,
        backgroundColor: '#007BFF',
    },
    hint: {
        color: '#64748B',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    },
});
