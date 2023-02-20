import React, { memo } from 'react';
import "../../assets/style/header/header.css"
function Header() {
  //variables
  var check = false;
  //functions
  //handle dom add event
  const handleAddEventDom = () =>{
    document.querySelector('.header__btns__addEvent').classList.toggle('header__btns__addEvent__active');
  }
  // handle input search
  const handleInputSearch = () =>{
    const closeIcon = document.querySelector('.iconColoseSearch');
    if(document.querySelector('.header__search__domInput__input').value != "" && check == false ){
      closeIcon.classList.toggle("iconColoseSearch__active");
      check = true;
    }else if (document.querySelector('.header__search__domInput__input').value == "" && check == true) {
      closeIcon.classList.toggle("iconColoseSearch__active");
      check = false;
    }
  }
  //icon search input to clear
  const clearTextInput = () => {
    document.querySelector('.header__search__domInput__input').value ="";
    check = true;
    document.querySelector('.header__search__domInput__input').focus();
  }
  return (
    <div className='header'>
        <div className='header__btns'>
            <button className='header__btns__btn btns capitalize pointer' onClick={handleAddEventDom}>
              добавить
            </button>
            <button className='header__btns__btn btns capitalize pointer'>обновить</button>
            <div className='header__btns__addEvent'>
              <i className="fa fa-times iconCloseAddEvent pointer" aria-hidden="true"  onClick={handleAddEventDom}></i>
               <input type="text" name="addEvent" className='header__btns__addEvent__input' placeholder='5 Марта, 14:00, День рождение' />
               <button className='header__btns__addEvent__btn btns' >Создать</button>
            </div>
        </div>
        <div className='header__search'>   
            <div className='header__search__domInput'>
              <i className='fa fa-search pointer'></i>
              <input type="text" name="search" className="header__search__domInput__input" placeholder='Событие, дата или участник' onChange={handleInputSearch}/>
              <i className="fa fa-times fa-lg pointer iconColoseSearch" aria-hidden="true" onClick={clearTextInput}></i>
            </div>

        </div>
    </div>
  )
}
export default memo(Header);