import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
  Image,
} from 'react-native';
import Background from '../../components/Background/Background';
import { QUIZ_QUESTIONS, QUIZ_RESULT_MAP } from '../../data/quiz';
import { getAnimalById } from '../../data/animals';
import { getAnimalImage } from '../../assets/images';
import { COLORS } from '../../utils/theme';
import { useApp } from '../../context/AppContext';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

const QuizScreen = () => {
  const { top, isSmallScreen } = useSafeSpacing();
  const { quizResult, setQuizResult } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(!!quizResult);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (optionType: string) => {
    setSelected(optionType);
    const newAnswers = [...answers, optionType];
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        finishQuiz(newAnswers);
      }
    }, 400);
  };

  const finishQuiz = (allAnswers: string[]) => {
    const counts: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0 };
    allAnswers.forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    });
    let winner = 'A';
    let max = 0;
    Object.entries(counts).forEach(([t, c]) => {
      if (c > max) {
        winner = t;
        max = c;
      }
    });
    const resultAnimalId = QUIZ_RESULT_MAP[winner] || 'lion';
    setQuizResult(resultAnimalId);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setQuizResult(null);
  };

  const handleShare = async () => {
    if (!quizResult) return;
    const animal = getAnimalById(quizResult);
    if (!animal) return;
    try {
      await Share.share({
        message: `🎯 I took the Animal Quiz and my result is... ${animal.name}!`,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not share');
    }
  };

  if (showResult && quizResult) {
    const animal = getAnimalById(quizResult);
    if (!animal) return null;

    return (
      <Background>
        <View style={[styles.container, { paddingTop: top }]}>
          <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Animal Quiz</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultScroll}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={resetQuiz}
              activeOpacity={0.7}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <View style={styles.checkCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>

            <Text style={styles.resultTitle}>You are a {animal.name}!</Text>

            <View style={[styles.resultImage, isSmallScreen && styles.resultImageSmall]}>
              <Image
                source={getAnimalImage(animal.imageKey)}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              style={styles.shareResultButton}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Text style={styles.shareResultText}>↗ Share result</Text>
            </TouchableOpacity>

            <Text style={styles.animalNameBig}>{animal.name}</Text>
            <Text style={styles.typeBig}>{animal.type}</Text>

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>📍</Text>
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Habitat</Text>
                <Text style={styles.infoValue}>{animal.habitat}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>💡</Text>
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Fun Fact</Text>
                <Text style={styles.infoValue}>{animal.funFact}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.retakeButton} onPress={resetQuiz} activeOpacity={0.8}>
              <Text style={styles.retakeText}>Retake Quiz</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top }]}>
        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Animal Quiz</Text>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.questionNumber}>
          Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
        </Text>
        <Text style={[styles.questionText, isSmallScreen && styles.questionTextSmall]}>
          {currentQuestion.question}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsList}>
          {currentQuestion.options.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionButton,
                selected === option.type && styles.optionButtonActive,
              ]}
              onPress={() => handleSelect(option.type)}
              disabled={selected !== null}
              activeOpacity={0.7}>
              <View
                style={[
                  styles.optionKey,
                  selected === option.type && styles.optionKeyActive,
                ]}>
                <Text
                  style={[
                    styles.optionKeyText,
                    selected === option.type && styles.optionKeyTextActive,
                  ]}>
                  {option.key}
                </Text>
              </View>
              <Text
                style={[styles.optionText, isSmallScreen && styles.optionTextSmall]}
                numberOfLines={2}>
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 24,
    marginBottom: 12,
  },
  progressBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  questionNumber: {
    color: COLORS.text,
    fontSize: 13,
    marginBottom: 4,
  },
  questionText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  questionTextSmall: {
    fontSize: 18,
    marginBottom: 12,
  },
  optionsList: {
    paddingBottom: 130,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonActive: {
    borderColor: COLORS.primary,
  },
  optionKey: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(157, 78, 221, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionKeyActive: {
    backgroundColor: COLORS.primary,
  },
  optionKeyText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  optionKeyTextActive: {
    color: '#1A0B2E',
  },
  optionText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
  },
  optionTextSmall: {
    fontSize: 13,
  },
  resultScroll: {
    alignItems: 'center',
    paddingBottom: 140,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 26,
    marginTop: -3,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 14,
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: '700',
  },
  resultTitle: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultImage: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
  },
  resultImageSmall: {
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shareResultButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 14,
    width: '100%',
    alignItems: 'center',
  },
  shareResultText: {
    color: '#1A0B2E',
    fontWeight: '700',
    fontSize: 15,
  },
  animalNameBig: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  typeBig: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 14,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(157, 78, 221, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 14,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 19,
  },
  retakeButton: {
    paddingVertical: 10,
    marginTop: 8,
  },
  retakeText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});

export default QuizScreen;