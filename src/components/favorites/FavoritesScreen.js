import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from './../../components/coins/CoinsItem';
import Storage from './../../libs/storage';
import Colors from '../../res/colors';

class FavoritesScreen extends Component {
  //Inicializamos el estado de favorites
  state = {
    favorites: [],
  };

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();

      //Filtramos el array por medio de llaves
      const keys = allKeys.filter(key => key.includes('favorite-'));

      // Obtenemos todos los favoritos
      const favs = await Storage.instance.multiGet(keys);

      //Parseamos de String a un Objeto
      const favorites = favs.map(fav => JSON.parse(fav[1]));

      console.log('favs', favorites);

      //Lo enviamos al Estado
      this.setState({favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  //Evento al precionar en una moneda en favoritos
  handlePress = coin => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  //Ciclo de vida: Cuando se monta el Screen
  componentDidMount() {
    //Escuchamos el evento focus cuando se agrege getFavorites
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  //Ciclo de vida: Cuando se desmonta el Screen
  componentWillUnmount() {
    //Escuchamos el evento focus removemos el listener
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  render() {
    const {favorites} = this.state;

    return (
      <View style={styles.container}>
        {favorites.length === 0 ? <FavoritesEmptyState /> : null}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        ) : null}
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
