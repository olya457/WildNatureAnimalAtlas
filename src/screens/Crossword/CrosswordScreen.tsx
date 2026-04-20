import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import Background from '../../components/Background/Background';
import CustomKeyboard from '../../components/CustomKeyboard/CustomKeyboard';
import { CROSSWORD_WORDS, CrosswordWord } from '../../data/crossword';
import { COLORS } from '../../utils/theme';
import { useApp } from '../../context/AppContext';
import { useSafeSpacing } from '../../hooks/useSafeSpacing';

const buildFullAnswer = (word: CrosswordWord, input: string): string => {
  let result = '';
  let inputIdx = 0;
  for (let i = 0; i < word.length; i++) {
    if (word.revealedIndices.includes(i)) {
      result += word.answer[i];
    } else {
      if (inputIdx < input.length) {
        result += input[inputIdx];
        inputIdx++;
      } else {
        result += '_';
      }
    }
  }
  return result;
};

const getInputIndex = (position: number, revealedIndices: number[]): number => {
  let idx = 0;
  for (let i = 0; i < position; i++) {
    if (!revealedIndices.includes(i)) idx++;
  }
  return idx;
};

const CrosswordScreen = () => {
  const { top, bottom, isSmallScreen, isVerySmallScreen } = useSafeSpacing();
  const {
    crosswordProgress,
    setCrosswordProgress,
    crosswordIndex,
    setCrosswordIndex,
    crosswordStarted,
    setCrosswordStarted,
  } = useApp();

  const [currentInput, setCurrentInput] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  const solved = CROSSWORD_WORDS.filter(
    w => crosswordProgress[w.id] === w.answer,
  ).length;
  const total = CROSSWORD_WORDS.length;
  const allSolved = solved === total;
  const currentWord = CROSSWORD_WORDS[crosswordIndex];

  useEffect(() => {
    setCurrentInput('');
  }, [crosswordIndex]);

  const handleKeyPress = (key: string) => {
    if (!currentWord) return;
    const emptySlots = currentWord.length - currentWord.revealedIndices.length;
    if (currentInput.length >= emptySlots) return;
    setCurrentInput(prev => prev + key);
  };

  const handleBackspace = () => {
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (!currentWord) return;
    const fullAnswer = buildFullAnswer(
      currentWord,
      currentInput.trim().toUpperCase(),
    );
    if (fullAnswer === currentWord.answer) {
      const newProgress = {
        ...crosswordProgress,
        [currentWord.id]: currentWord.answer,
      };
      setCrosswordProgress(newProgress);
      setCurrentInput('');

      const nextIndex = findNextUnsolvedIndex(crosswordIndex, newProgress);
      if (nextIndex !== -1) {
        setTimeout(() => {
          setCrosswordIndex(nextIndex);
        }, 400);
      }
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const findNextUnsolvedIndex = (
    from: number,
    progress: { [key: number]: string },
  ): number => {
    for (let i = from + 1; i < CROSSWORD_WORDS.length; i++) {
      if (progress[CROSSWORD_WORDS[i].id] !== CROSSWORD_WORDS[i].answer) return i;
    }
    for (let i = 0; i < from; i++) {
      if (progress[CROSSWORD_WORDS[i].id] !== CROSSWORD_WORDS[i].answer) return i;
    }
    return -1;
  };

  const handlePrevious = () => {
    if (crosswordIndex > 0) {
      setCrosswordIndex(crosswordIndex - 1);
    }
  };

  const handleNext = () => {
    if (crosswordIndex < CROSSWORD_WORDS.length - 1) {
      setCrosswordIndex(crosswordIndex + 1);
    }
  };

  const handleStart = () => {
    setCrosswordStarted(true);
  };

  const handleBackToWelcome = () => {
    setCrosswordStarted(false);
    setCurrentInput('');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎉 I just completed the entire Wildlife Crossword puzzle!`,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not share');
    }
  };

  const handleReset = () => {
    Alert.alert('Reset', 'Reset all progress?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        onPress: () => {
          setCrosswordProgress({});
          setCrosswordIndex(0);
          setCrosswordStarted(false);
          setCurrentInput('');
        },
      },
    ]);
  };

  if (!crosswordStarted) {
    return (
      <Background>
        <View style={[styles.container, { paddingTop: top }]}>
          <Text
            style={[
              styles.title,
              isSmallScreen && styles.titleSmall,
              isVerySmallScreen && styles.titleVerySmall,
            ]}>
            Wildlife Crossword
          </Text>

          <ScrollView
            contentContainerStyle={styles.welcomeScroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeWrapper}>
              <Text
                style={[
                  styles.welcomeEmoji,
                  isSmallScreen && styles.welcomeEmojiSmall,
                  isVerySmallScreen && styles.welcomeEmojiVerySmall,
                ]}>
                🧩
              </Text>
              <Text
                style={[
                  styles.welcomeTitle,
                  isSmallScreen && styles.welcomeTitleSmall,
                  isVerySmallScreen && styles.welcomeTitleVerySmall,
                ]}>
                Test Your Wildlife Knowledge!
              </Text>
              <Text
                style={[
                  styles.welcomeText,
                  isSmallScreen && styles.welcomeTextSmall,
                  isVerySmallScreen && styles.welcomeTextVerySmall,
                ]}>
                Explore the animal kingdom through {total} exciting puzzles.{'\n\n'}
                Read the hints, guess the animal, and type your answer letter by letter.{'\n\n'}
                Some letters are already revealed to help you start!
              </Text>

              <View
                style={[
                  styles.featuresRow,
                  isSmallScreen && styles.featuresRowSmall,
                ]}>
                <View style={styles.featureItem}>
                  <Text
                    style={[
                      styles.featureEmoji,
                      isSmallScreen && styles.featureEmojiSmall,
                    ]}>
                    🦁
                  </Text>
                  <Text
                    style={[
                      styles.featureLabel,
                      isSmallScreen && styles.featureLabelSmall,
                    ]}>
                    Animals
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text
                    style={[
                      styles.featureEmoji,
                      isSmallScreen && styles.featureEmojiSmall,
                    ]}>
                    💡
                  </Text>
                  <Text
                    style={[
                      styles.featureLabel,
                      isSmallScreen && styles.featureLabelSmall,
                    ]}>
                    Hints
                  </Text>
                </View>
                <View style={styles.featureItem}>
                  <Text
                    style={[
                      styles.featureEmoji,
                      isSmallScreen && styles.featureEmojiSmall,
                    ]}>
                    🏆
                  </Text>
                  <Text
                    style={[
                      styles.featureLabel,
                      isSmallScreen && styles.featureLabelSmall,
                    ]}>
                    Rewards
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.startButton,
                  isSmallScreen && styles.startButtonSmall,
                ]}
                onPress={handleStart}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.startButtonText,
                    isSmallScreen && styles.startButtonTextSmall,
                  ]}>
                  {solved > 0 ? 'Continue ›' : 'Start ›'}
                </Text>
              </TouchableOpacity>

              {solved > 0 && (
                <Text style={styles.progressInfo}>
                  Your progress: {solved} / {total}
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </Background>
    );
  }

  if (allSolved) {
    return (
      <Background>
        <View style={[styles.container, { paddingTop: top }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToWelcome}
              activeOpacity={0.7}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.titleWithBack,
                isSmallScreen && styles.titleWithBackSmall,
                isVerySmallScreen && styles.titleWithBackVerySmall,
              ]}>
              Wildlife Crossword
            </Text>
          </View>

          <View style={styles.completedWrapper}>
            <View
              style={[
                styles.checkCircle,
                isSmallScreen && styles.checkCircleSmall,
              ]}>
              <Text
                style={[
                  styles.checkIconBig,
                  isSmallScreen && styles.checkIconBigSmall,
                ]}>
                ✓
              </Text>
            </View>
            <Text
              style={[
                styles.completedText,
                isSmallScreen && styles.completedTextSmall,
                isVerySmallScreen && styles.completedTextVerySmall,
              ]}>
              The entire crossword puzzle has been completed!
            </Text>

            <TouchableOpacity
              style={[
                styles.shareButton,
                isSmallScreen && styles.shareButtonSmall,
              ]}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Text
                style={[
                  styles.shareButtonText,
                  isSmallScreen && styles.shareButtonTextSmall,
                ]}>
                ↗ Share result
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.7}>
              <Text style={styles.resetText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    );
  }

  const isSolved = crosswordProgress[currentWord.id] === currentWord.answer;
  const solvedLetters = isSolved ? currentWord.answer.split('') : null;
  const progress = (solved / total) * 100;

  return (
    <Background>
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToWelcome}
            activeOpacity={0.7}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.titleWithBack,
              isSmallScreen && styles.titleWithBackSmall,
              isVerySmallScreen && styles.titleWithBackVerySmall,
            ]}>
            Wildlife Crossword
          </Text>
        </View>

        <View
          style={[
            styles.progressCard,
            isSmallScreen && styles.progressCardSmall,
          ]}>
          <View style={styles.progressHeader}>
            <Text
              style={[
                styles.progressLabel,
                isSmallScreen && styles.progressLabelSmall,
              ]}>
              Word {crosswordIndex + 1} of {total}
            </Text>
            <Text
              style={[
                styles.progressCount,
                isSmallScreen && styles.progressLabelSmall,
              ]}>
              {solved} / {total} solved
            </Text>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View
            style={[
              styles.wordCard,
              isSmallScreen && styles.wordCardSmall,
              isSolved && styles.wordCardSolved,
              errorShake && styles.wordCardError,
            ]}>
            <View style={styles.wordHeader}>
              <View
                style={[
                  styles.numberCircle,
                  isSmallScreen && styles.numberCircleSmall,
                ]}>
                <Text
                  style={[
                    styles.numberText,
                    isSmallScreen && styles.numberTextSmall,
                  ]}>
                  {currentWord.id}
                </Text>
              </View>
              <Text
                style={[
                  styles.lettersLabel,
                  isSmallScreen && styles.lettersLabelSmall,
                ]}>
                {currentWord.length} Letters
              </Text>
            </View>

            <View style={styles.lettersRow}>
              {Array.from({ length: currentWord.length }).map((_, i) => {
                const isRevealed = currentWord.revealedIndices.includes(i);
                let letter = '_';
                let isInputted = false;

                if (solvedLetters) {
                  letter = solvedLetters[i];
                } else if (isRevealed) {
                  letter = currentWord.answer[i];
                } else {
                  const inputIdx = getInputIndex(i, currentWord.revealedIndices);
                  if (inputIdx < currentInput.length) {
                    letter = currentInput[inputIdx];
                    isInputted = true;
                  }
                }

                return (
                  <View
                    key={i}
                    style={[
                      styles.letterBox,
                      isSmallScreen && styles.letterBoxSmall,
                      isVerySmallScreen && styles.letterBoxVerySmall,
                      (isRevealed || isSolved) && styles.letterBoxFilled,
                      isInputted && styles.letterBoxInputted,
                    ]}>
                    <Text
                      style={[
                        styles.letterText,
                        isSmallScreen && styles.letterTextSmall,
                        isVerySmallScreen && styles.letterTextVerySmall,
                      ]}>
                      {letter}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Text
              style={[
                styles.hintsLabel,
                isSmallScreen && styles.hintsLabelSmall,
              ]}>
              💡 Hints:
            </Text>
            {currentWord.hints.map((hint, i) => (
              <Text
                key={i}
                style={[
                  styles.hintText,
                  isSmallScreen && styles.hintTextSmall,
                ]}>
                {i + 1}. {hint}
              </Text>
            ))}
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity
              style={[
                styles.navBtn,
                isSmallScreen && styles.navBtnSmall,
                crosswordIndex === 0 && styles.navBtnDisabled,
              ]}
              onPress={handlePrevious}
              disabled={crosswordIndex === 0}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.navBtnText,
                  isSmallScreen && styles.navBtnTextSmall,
                ]}>
                ‹ Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navBtn,
                isSmallScreen && styles.navBtnSmall,
                crosswordIndex === CROSSWORD_WORDS.length - 1 &&
                  styles.navBtnDisabled,
              ]}
              onPress={handleNext}
              disabled={crosswordIndex === CROSSWORD_WORDS.length - 1}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.navBtnText,
                  isSmallScreen && styles.navBtnTextSmall,
                ]}>
                Next ›
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {!isSolved && (
          <View style={[styles.keyboardWrapper, { paddingBottom: bottom + 100 }]}>
            <CustomKeyboard
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onEnter={handleEnter}
            />
          </View>
        )}

        {isSolved && (
          <View style={[styles.solvedBanner, { bottom: bottom + 110 }]}>
            <Text
              style={[
                styles.solvedBannerText,
                isSmallScreen && styles.solvedBannerTextSmall,
              ]}>
              ✓ Solved! Go to next word
            </Text>
          </View>
        )}
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
    marginBottom: 14,
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 24,
    marginBottom: 10,
  },
  titleVerySmall: {
    fontSize: 20,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: '600',
    marginTop: -3,
  },
  titleWithBack: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
  },
  titleWithBackSmall: {
    fontSize: 20,
  },
  titleWithBackVerySmall: {
    fontSize: 18,
  },
  welcomeScroll: {
    flexGrow: 1,
    paddingBottom: 140,
  },
  welcomeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  welcomeEmoji: {
    fontSize: 90,
    marginBottom: 20,
  },
  welcomeEmojiSmall: {
    fontSize: 70,
    marginBottom: 14,
  },
  welcomeEmojiVerySmall: {
    fontSize: 56,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeTitleSmall: {
    fontSize: 20,
    marginBottom: 12,
  },
  welcomeTitleVerySmall: {
    fontSize: 18,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 15,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  welcomeTextSmall: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  welcomeTextVerySmall: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 28,
  },
  featuresRowSmall: {
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  featureEmojiSmall: {
    fontSize: 26,
    marginBottom: 4,
  },
  featureLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  featureLabelSmall: {
    fontSize: 11,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 14,
  },
  startButtonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 48,
  },
  startButtonText: {
    color: '#1A0B2E',
    fontSize: 16,
    fontWeight: '700',
  },
  startButtonTextSmall: {
    fontSize: 14,
  },
  progressInfo: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  progressCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  progressCardSmall: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '600',
  },
  progressLabelSmall: {
    fontSize: 12,
  },
  progressCount: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  progressBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  scroll: {
    paddingBottom: 20,
  },
  wordCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  wordCardSmall: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  wordCardSolved: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  wordCardError: {
    borderColor: COLORS.error,
  },
  wordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(157, 78, 221, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numberCircleSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  numberText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  numberTextSmall: {
    fontSize: 12,
  },
  lettersLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  lettersLabelSmall: {
    fontSize: 12,
  },
  lettersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  letterBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 15, 50, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  letterBoxSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  letterBoxVerySmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  letterBoxFilled: {
    backgroundColor: 'rgba(157, 78, 221, 0.5)',
    borderColor: COLORS.primary,
  },
  letterBoxInputted: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderColor: COLORS.primary,
  },
  letterText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  letterTextSmall: {
    fontSize: 14,
  },
  letterTextVerySmall: {
    fontSize: 12,
  },
  hintsLabel: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  hintsLabelSmall: {
    fontSize: 12,
  },
  hintText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 3,
    lineHeight: 18,
  },
  hintTextSmall: {
    fontSize: 11,
    lineHeight: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 10,
  },
  navBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  navBtnSmall: {
    paddingVertical: 8,
    borderRadius: 10,
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  navBtnTextSmall: {
    fontSize: 12,
  },
  keyboardWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 5, 30, 0.92)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.2)',
  },
  solvedBanner: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  solvedBannerText: {
    color: '#1A0B2E',
    fontSize: 15,
    fontWeight: '700',
  },
  solvedBannerTextSmall: {
    fontSize: 13,
  },
  completedWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircleSmall: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    marginBottom: 18,
  },
  checkIconBig: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: '700',
  },
  checkIconBigSmall: {
    fontSize: 36,
  },
  completedText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  completedTextSmall: {
    fontSize: 17,
    marginBottom: 22,
  },
  completedTextVerySmall: {
    fontSize: 15,
    marginBottom: 18,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 14,
  },
  shareButtonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  shareButtonText: {
    color: '#1A0B2E',
    fontWeight: '700',
    fontSize: 15,
  },
  shareButtonTextSmall: {
    fontSize: 13,
  },
  resetButton: {
    paddingVertical: 10,
  },
  resetText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});

export default CrosswordScreen;