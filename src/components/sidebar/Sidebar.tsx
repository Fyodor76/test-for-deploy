import './index.scss';
import { FC, useContext, useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProductsContext } from '../../context/ProductContext';
import { GroupProductType } from '../../types/ProductTypes';

interface SidebarType {
  isOpen: boolean;
}

export const Sidebar: FC<SidebarType> = ({ isOpen }) => {

  const [subitems, setSubitems] = useState<GroupProductType[]>([]);
  const { state: {categories, groupProducts} } = useContext(ProductsContext);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("")
 // const {dispatch} = useContext(ProductsContext)

  const setCategory = (v: string) => {
   // dispatch(filterProducts(v));
  }


  const handleMouseEnter = (id: string) => {
    const filteredGroupsByCategoryId = groupProducts?.filter((grP) => grP.categoryId === id)
    setSubitems(filteredGroupsByCategoryId);
    setShowSubtitles(true);
    setActiveItem(id)
  };

  const sidebarStyle = {
    transition: 'left 300ms ease-in-out',
    left: isOpen ? 0 : -250,
  };

  useEffect(() => {
    if (!isOpen) {
      setSubitems([])
      setShowSubtitles(false);
    }
  }, [isOpen])


  return (
    <div className="sidebar" style={{ ...sidebarStyle }}>
  <div className="sidebar__container">
    <div className="categories__container">
      {categories?.map((c) => (
        <div
          key={c.id}
          className="category-block"
          onMouseEnter={() => handleMouseEnter(c.id)}
          onClick={() => setCategory(c.name)}
        >
          <div className={`category-content ${c.id === activeItem ? "active" : ''}`}>
            <div className="title" >
              <span>{c.name}</span>
            </div>
            {c.id === activeItem && <div>
              <ArrowForwardIcon fontSize="small"/>
            </div>}
          </div>
        </div>
      ))}
    </div>
    {showSubtitles && (
      <div className="subtitles__container">
        {subitems?.map((subitem, index) => (
          <div className='subtitles__content'>
            <div key={`${index}-subtitles`}>
            <span>{subitem.name}</span>
          </div>
          <div>
          <ArrowForwardIcon fontSize="small" className="icon-arrow"/>
          </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};
