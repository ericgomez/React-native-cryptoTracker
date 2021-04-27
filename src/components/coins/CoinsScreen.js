import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native'; // Pressable- Evento tipo boton
import Http from '../../libs/http';

class CoinsScreen extends Component {
  componentDidMount = async () => {
    // Utilizando la instancia Http
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    // Verificamos que nos muestra informacion
    console.log('Coins', coins);
  };

  handlePress = () => {
    console.log('go to detail', this.props);

    // Navegando a una nueva pantalla con navigation
    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Coins Screen</Text>
        <Pressable style={styles.btn} onPress={this.handlePress}>
          <Text style={styles.btnText}>Ir a detail</Text>
        </Pressable>
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