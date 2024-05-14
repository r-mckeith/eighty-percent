import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { RowText, Section, SectionTitle, Row } from '../shared';
import { getColors } from '../../src/colors';

export default function Summary({ lastReview }: any) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Section>
      <SectionTitle title='Last Week' />

      <Row opacity={1} first={true} last={false}>
        <RowText text={'Good:'} />
        <Text style={[styles.reviewSummaryText, colors.text]}>{lastReview.good}</Text>
      </Row>
      <Row opacity={1} first={false} last={false}>
        <RowText text={'Bad:'} />
        <Text style={[styles.reviewSummaryText, colors.text]}>{lastReview.bad}</Text>
      </Row>
      <Row opacity={1} first={false} last={true}>
        <RowText text={'Improve:'} />
        <Text style={[styles.reviewSummaryText, colors.text]}>{lastReview.improve}</Text>
      </Row>
    </Section>
  );
}

const styles = StyleSheet.create({
  summaryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  reviewSummaryText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
    width: '74%',
  },
});
