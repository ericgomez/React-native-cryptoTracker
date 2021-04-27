import React, {Component} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native'; // Pressable- Evento tipo boton
import Http from '../../libs/http';

class CoinsScreen extends Component {
  state = {
    coins: [],
  };

  componentDidMount = async () => {
    // Utilizando la instancia Http
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    // Seteamos al estado la respuesta
    this.setState({coins: response.data});
  };

  handlePress = () => {
    console.log('go to detail', this.props);

    // Navegando a una nueva pantalla con navigation
    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    const {coins} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.symbol}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CoinsScreen;
