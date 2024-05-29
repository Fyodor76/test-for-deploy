import './index.scss';
import { FC, useContext, useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { ProductsContext, filterProducts } from '../../context/ProductsContext';

interface CategoriesType {
  id: number;
  title: string;
  subtitles: {
    titleId: number;
    id?: number;
    items: string[];
  }
}

// const categories: CategoriesType[] = [
//   {
//     id: 1,
//     title: "Женщинам",
//     subtitles: {
//       titleId: 1,
//       items: ["Блузки и рубашки","Брюки", "Верхняя одежда"]
//     }
//   },
//   {
//     id: 2,
//     title: "Обувь",
//     subtitles: { 
//     titleId: 2,
//     items: ["Детская","Для новорожденных", "Женская", "Мужская", "Аксессуары для обуви"]
//     }
//   },
//   {
//     id: 3,
//     title: "Детям",
//     subtitles: {
//       titleId: 3,
//       items: ["Для девочек", "Для мальчиков", "Для новорожденных", "Детская электроника",
//       "Конструкторы", "Детский транспорт", "Детское питание", "Религиозная одежда", "Товары для малыша", 
//       "Подгузники", "Подарки детям"]
//     }
//   }
// ]

interface SidebarType {
  isOpen: boolean;
}

export const Sidebar: FC<SidebarType> = ({ isOpen }) => {

  const [categories, setCategories] = useState<any>([])
  const [subitems, setSubitems] = useState<string[]>([]);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0)
  const {dispatch} = useContext(ProductsContext)

  const setCategory = (v: string) => {
    dispatch(filterProducts(v));
  
  }

  useEffect(() => {
    const usedCategories: any = [];

    axios.get("https://datasets-server.huggingface.co/rows?dataset=nyuuzyou%2Fwb-products&config=default&split=train&offset=0&length=100")
    .then((res) => {
        console.log(res.data)
        res.data.rows.forEach((r:any) => {
            const curObj: any = {}
            if (!usedCategories.some((c:any) => c?.title === r?.row?.subj_root_name)) {
                curObj.id = r?.row?.nm_id
                curObj.title = r?.row?.subj_root_name

                curObj.subtitles = {
                 items: [r?.row?.subj_name]
                }
                usedCategories.push(curObj)
            } else {
                const foundObj = usedCategories.find((c: any) => c?.title === r?.row?.subj_root_name)
                if (!foundObj?.subtitles?.items.includes(r?.row?.subj_name)) {
                    foundObj?.subtitles?.items.push(r?.row?.subj_name)
                }
            }
        })
    }).then(() => {
        setCategories(usedCategories)
    })

}, [])

  const handleMouseEnter = (item: CategoriesType) => {
    setSubitems(item.subtitles.items);
    setShowSubtitles(true);
    setActiveItem(item.id)
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
      {categories.map((c: any) => (
        <div
          key={c.id}
          className="category-block"
          onMouseEnter={() => handleMouseEnter(c)}
          onClick={() => setCategory(c.title)}
        >
          <div className={`category-content ${c.id === activeItem ? "active" : ''}`}>
            <div className="title" >
              <span>{c.title}</span>
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
        {subitems.map((subitem, index) => (
          <div className='subtitles__content' onClick={() => setCategory(subitem)}>
            <div key={`${index}-subtitles`}>
            <span>{subitem}</span>
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
