import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'; // Pressable- Evento tipo boton
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    // Iniciamos el loadin en true
    this.setState({loading: true});
    // Utilizando la instancia Http
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    // Seteamos al estado la respuesta
    this.setState({coins: response.data, loading: false});
  };

  handlePress = () => {
    console.log('go to detail', this.props);

    // Navegando a una nueva pantalla con navigation
    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color="#49b03d"
            size="large"
          />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
