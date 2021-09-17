import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

import images from './images.json';

const width = Dimensions.get('window').width;
const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.6;

export function Parallax() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const data = images.map((image, index) => ({
    key: String(index),
    photo: image,
  }));

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        renderItem={({ item, index }) => {
          const translateX = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [-width * 0.7, 0, width * 0.7],
            extrapolate: 'clamp',
          });

          return (
            <View style={styles.external_content}>
              <View style={styles.internal_content}>
                <View style={styles.image_content}>
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={[styles.image, { transform: [{ translateX }] }]}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  external_content: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  internal_content: {
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 18,
    padding: 10,
    backgroundColor: 'white',
  },
  image_content: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 14,
  },
  image: {
    width: IMAGE_WIDTH * 1.2,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
});
