import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const Skeleton = ({ width, height }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  // Start the shimmer animation
  const startShimmer = () => {
    translateX.setValue(-width);
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1200, // Adjusted for smoother shimmer
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startShimmer();
  }, [width]);

  return (
    <View style={[styles.skeleton, { width, height }]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            width: width * 0.6, // 60% width of shimmer bar
            height: '100%',
            transform: [{ translateX }], // Move shimmer across the width
          },
        ]}
      >
        {/* Use LinearGradient for the shimmer effect */}
        <LinearGradient
          colors={['#e0e0e0', '#d4d4d4', '#e0e0e0']}
          style={styles.gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0', // Slightly darker base color
    borderRadius: 5,
    marginVertical: 5,
    overflow: 'hidden', // Clip the shimmer effect
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 5,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
});

export default Skeleton;
