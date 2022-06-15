import { View, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import React from 'react';
import Text from '../components/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlanetHeader from '../components/planet-header';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import {
  EarthSvg,
  JupiterSvg,
  MarsSvg,
  MercurySvg,
  NeptuneSvg,
  SaturnSvg,
  UranusSvg,
  VenusSvg,
} from '../svg';

const PlanetSection = ({ title, value }) => {
  return (
    <View style={styles.planetSection}>
      <Text preset="small" style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
      <Text preset="h2">{value}</Text>
    </View>
  );
};

export default function Details({ route }) {
  const planet = route.params.planet;
  const {
    name,
    description,
    wikiLink,
    rotationTime,
    revolutionTime,
    radius,
    avgTemp,
  } = planet;
  console.log('pNet', planet);

  const renderImage = () => {
    switch (name) {
      case 'mercury':
        return <MercurySvg />;
      case 'earth':
        return <EarthSvg />;
      case 'jupiter':
        return <JupiterSvg />;
      case 'mars':
        return <MarsSvg />;
      case 'neptune':
        return <NeptuneSvg />;
      case 'saturn':
        return <SaturnSvg />;
      case 'uranus':
        return <UranusSvg />;
      case 'venus':
        return <VenusSvg />;
    }
  };

  const onPressLink = () => {
    Linking.openURL(wikiLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PlanetHeader backBtn={true} />
      <ScrollView>
        <View style={styles.imageView}>{renderImage()}</View>
        <View style={styles.detailsView}>
          <Text preset="h1" style={styles.name}>
            {name}
          </Text>
          <Text style={styles.desc}>{description}</Text>
          <Pressable onPress={onPressLink} style={styles.source}>
            <Text>Source:</Text>
            <Text preset="h4" style={styles.wiki}>
              Wikipedia
            </Text>
          </Pressable>
        </View>
        <View style={{ height: 40 }} />
        <PlanetSection title="ROTATION TIME" value={rotationTime} />
        <PlanetSection title="REVOLUTION TIME" value={revolutionTime} />
        <PlanetSection title="RADIUS" value={radius} />
        <PlanetSection title="AVERAGE TEMP." value={avgTemp} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageView: {
    marginTop: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsView: {
    marginTop: spacing[10],
    marginHorizontal: spacing[4],
    alignItems: 'center',
  },
  name: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    marginTop: spacing[4],
    lineHeight: 21,
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: spacing[4],
  },
  wiki: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    lineHeight: 21,
  },
  planetSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    borderWidth: 1,
    borderColor: colors.gray,
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
});
