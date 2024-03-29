import {useState} from 'react';
import {ItemList} from 'components/ItemList';
import {SearchBox} from 'components/SearchBox';
import {ButtonBack} from 'components/Buttons/BackBtn';
import styles from 'pages/Favorite/Favorite.module.scss'

const PageFavorites=({itemsUser, onPlus, onRemove, onAddFavorites, favorites})=>{

    // const [favoritesList, setFavorites]=useState(()=>{
    //     return JSON.parse(localStorage.getItem('favoritesList')) ?? []
    // })

    const [searchFavorites,setSearchFavorites]=useState('')

    const onSearchFavorites=(event)=>{
        setSearchFavorites(event.target.value)}
    

    return(favorites.length>0 ? <div className="p-40"><div className="d-flex justify-between align-center mb-40">
        <h1>{searchFavorites ? `Идет поиск по запросу: "${searchFavorites}"` : "Мои закладки"}</h1>
        <SearchBox
        searchValue={searchFavorites}
        onSearchValue={onSearchFavorites}/>
        </div>
        <ItemList
        items={favorites}
        favorites={favorites}
          itemsUser={itemsUser}
          searchValue={searchFavorites}
          onPlus={onPlus}
          onRemove={onRemove}
          onAddFavorites={onAddFavorites}/></div> : <div className={styles.container__emptyFavorites}>
        <img className={styles.imgSmile} src='img/NoFavorites.jpg' alt='No Items' width={70} height={70}/>
        <h1>Закладок нет :(</h1>
        <p>Вы ничего не добавляли в закладки</p>
            <ButtonBack/>
          </div> )
}

export default PageFavorites; 