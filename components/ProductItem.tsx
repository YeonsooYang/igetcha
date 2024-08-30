// components/ProductItem.tsx
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const ProductItem = memo(({ item, onPress }) => (
  <Pressable
    style={styles.imageBox}
    onPress={() => onPress(item.id)}
  >
    <Image source={{ uri: item.uri }} style={styles.image} />
    <Text style={styles.productText}>{item.name}</Text>
  </Pressable>
));

const styles = StyleSheet.create({
  imageBox: {
    width: 100,
    height: 100,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
  productText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ProductItem;
