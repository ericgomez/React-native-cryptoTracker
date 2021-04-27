import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'; // Pressable- Evento tipo boton
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from './../../res/colors';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = () => {
    // realizamos la llamada inicial
    this.getCoins();
  };

  getCoins = async () => {
    // Iniciamos el loadin en true
    this.setState({loading: true});
    // Utilizando la instancia Http
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    // Seteamos al estado la respuesta
    this.setState({
      coins: response.data,
      allCoins: response.data,
      loading: false,
    });
  };

  handlePress = coin => {
    // Navegando a una nueva pantalla con navigation
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  //Metodo para realizar una busqueda
  handleSearch = query => {
    const {allCoins} = this.state;

    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({coins: coinsFiltered});
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />

        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color="#49b03d"
            size="large"
          />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
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
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
