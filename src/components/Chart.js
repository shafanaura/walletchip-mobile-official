import React from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import {connect} from 'react-redux';

class Chart extends React.Component {
  render() {
    const data1 = this.props.transaction.values;
    const label = this.props.transaction.days;

    const barData = data1.map(item => ({
      value: Math.abs(item),
      svg: {
        fill: item < 0 ? '#9DA6B5' : '#6379F4',
      },
    }));

    const CUT_OFF = 120000;
    const Labels = ({x, y, bandwidth, data}) =>
      label.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={y(-1)}
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value}
        </Text>
      ));

    const Angka = ({x, y, bandwidth, data}) =>
      data1.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={
            Math.abs(value) < CUT_OFF
              ? y(Math.abs(value)) - 10
              : y(Math.abs(value)) + 15
          }
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {Math.abs(value)}
        </Text>
      ));

    return (
      <View style={{flexDirection: 'row', height: 230, paddingVertical: 15}}>
        <BarChart
          style={{flex: 1}}
          data={barData}
          svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
          contentInset={{top: 30, bottom: 10}}
          spacing={0.2}
          gridMin={-5}
          yAccessor={({item}) => item.value}
          {...this.props}>
          <Labels />
          <Angka />
        </BarChart>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps)(Chart);
