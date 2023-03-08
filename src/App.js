import { useState, useEffect } from 'react'
import axios from 'axios';
import { Drawer } from 'components/Drawer';
import { Header } from 'components/Header';
import {SearchBox} from 'components/SearchBox';
import {ItemList} from 'components/ItemList';

function App() {
  const [items, setItems] = useState([])
  const [itemsUser, setItemsUser] = useState([])
  const [favorites, setFavorites] = useState(()=>{
    return JSON.parse(localStorage.getItem('favoritesList')) ?? []
  })
  const [searchValue,setSearchValue]=useState('')
  const [isOpenDrawer, setIsOpenDrawer]=useState(false)
  
  useEffect(() => {
    // fetch('https://63fd1397677c415873196c8d.mockapi.io/items').then(res => { return res.json() }).then(res => setItems(res))
    axios.get('https://63fd1397677c415873196c8d.mockapi.io/items').then(res => setItems(res.data))
    axios.get('https://63fd1397677c415873196c8d.mockapi.io/cart').then(res=> setItemsUser(res.data))
  },[])

  useEffect(()=>{
    localStorage.setItem("favoritesList",JSON.stringify(favorites))},[favorites])


  const openDrawer = () => {
    setIsOpenDrawer(true)
  }

  const onSearchValue = (event) => {
    setSearchValue(event.target.value)
    console.log(searchValue)
}

  const closeDrawer = () => {
    setIsOpenDrawer(false)
  }

  const onAddCard = (data) => {
    axios.post('https://63fd1397677c415873196c8d.mockapi.io/cart', data)
    setItemsUser(prev=>[...prev,data])
  }
  
  const onDeleteCard = (id) => {
    axios.delete(`https://63fd1397677c415873196c8d.mockapi.io/cart/${id}`)
    setItemsUser(itemsUser.filter(item=> item.id!==id))
    }

  const onAddFavorites=(data)=>{
    setFavorites(prev=>[...prev,data])
  }
  return (
    <div className="wrapper">
      {isOpenDrawer && <Drawer items={itemsUser} onCloseDrawer={closeDrawer} onDeleteCard={onDeleteCard} />}
      <Header
        onOpenDrawer={openDrawer} />
      <div className='content p-40'>
        <div className="d-flex justify-between align-center mb-40">
          <h1>{searchValue ? `Идет поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <SearchBox searchValue={searchValue} onSearchValue={onSearchValue}/>
          </div>
          <ItemList
          items={items}
          itemsUser={itemsUser}
          searchValue={searchValue}
          onPlus={onAddCard}
          onRemove={onDeleteCard}
          onAddFavorites={onAddFavorites}
          />
        
          </div>
    </div>
  );
}

export default App;
