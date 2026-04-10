import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export function useEntrance() {
  const opacity1   = useRef(new Animated.Value(0)).current;
  const translate1 = useRef(new Animated.Value(-24)).current;
  const opacity2   = useRef(new Animated.Value(0)).current;
  const translate2 = useRef(new Animated.Value(24)).current;
  const opacity3   = useRef(new Animated.Value(0)).current;
  const translate3 = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    const make = (op: Animated.Value, tr: Animated.Value, dur: number) =>
      Animated.parallel([
        Animated.timing(op, { toValue: 1, duration: dur, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(tr, { toValue: 0, duration: dur, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]);

    Animated.stagger(120, [
      make(opacity1, translate1, 500),
      make(opacity2, translate2, 450),
      make(opacity3, translate3, 400),
    ]).start();
  }, []);

  return { opacity1, translate1, opacity2, translate2, opacity3, translate3 };
}