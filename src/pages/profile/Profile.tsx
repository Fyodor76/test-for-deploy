import React, { useContext, useState, ChangeEvent, FormEvent, useEffect, FC } from 'react';
import { AuthContext, updateUser } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AuthService } from '../../api/AuthService';
import { Button } from '../../ui/Button/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '../../ui/Input/Input';
import profilePhoto from '../../assets/profile-photo.png'
import { baseURL } from '../../const/baseUrl';
import { LazyImage } from '../../components/lazyImage/LazyImage';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { ProductsContext } from '../../context/ProductContext';
import { useModal } from '../../hooks/Modal/useModal';
import { Modal } from '../../components/Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import { CategoryType, GroupProductType } from '../../types/ProductTypes';
import axiosInstance from '../../axios.config';
import { showToast } from '../../const/toastConfig';
import { RecommendationsService } from '../../api/Recommendations';
import { motion } from 'framer-motion';
import { height, minHeight } from '@mui/system';

interface UserProfile {
  firstName: string;
  lastName: string;
  address: string;
  username: string;
  email: string;
  profilePicture?: string | File;
}

interface PreviewType {
    preview: string;
    closeIcon: boolean;
}

export const Profile: React.FC = () => {
    const { state: authState, dispatch } = useContext(AuthContext);
    const [profile, setProfile] = useState<UserProfile>({
      firstName: authState.user?.firstName || '',
      lastName: authState.user?.lastName || '',
      address: authState.user?.address || '',
      username: authState.user?.username || '',
      email: authState.user?.email || '',
      profilePicture: authState.user?.profilePicture || "",
    });
    const [preview, setPreview] = useState<PreviewType>({ preview: "", closeIcon: false });
    const {openModal, closeModal, modalState} = useModal()

    useEffect(() => {
      if (profile.profilePicture && typeof profile.profilePicture === 'string') {
        setPreview({ preview: `${baseURL}${profile.profilePicture}`, closeIcon: false });
      }
    }, [profile.profilePicture]);


    const clearProfilePicture = () => {
      setProfile((prev) => ({ ...prev, profilePicture: "" }));
      setPreview({ preview: "", closeIcon: false });
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const previewUrl = URL.createObjectURL(file);
          setProfile((prevProfile) => ({
            ...prevProfile,
            profilePicture: file,
          }));
          setPreview({ preview: previewUrl, closeIcon: true }); 
        }
      };
      
    const handleSave = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile.lastName);
        formData.append('address', profile.address);
        formData.append('username', profile.username);
        formData.append('email', profile.email);
        if (profile.profilePicture instanceof File) {
          formData.append('profilePicture', profile.profilePicture);
        }
  
        const updatedUser = await AuthService.updateUserProfile(formData);
        dispatch(updateUser(updatedUser));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error('Failed to update profile');
      }
    };
  
    return (
      <div className="profile-container">
        <h2>Профиль пользователя</h2>
        <div className="profile-content">
          <form onSubmit={handleSave} className="profile-form">
            <Input name="firstName" placeholder="Имя" value={profile.firstName} onChange={handleChange} />
            <Input name="lastName" placeholder="Фамилия" value={profile.lastName} onChange={handleChange} />
            <Input name="address" placeholder="Адрес" value={profile.address} onChange={handleChange} />
            <Input name="username" placeholder="Логин" value={profile.username} onChange={handleChange} />
            <Input name="email" placeholder="Емэйл" value={profile.email} onChange={handleChange} />
            <div className="block-input-image">
              <div>
                <input type="file" onChange={handleFileChange} />
              </div>
              {preview.closeIcon && (
                <div onClick={clearProfilePicture}>
                  <CloseIcon />
                </div>
              )}
            </div>
            <Button 
              size="large"
              background="base" 
              color="basic">
              Сохранить изменения
            </Button>
          </form>
          <div className="profile-picture">
            <LazyImage src={preview.preview || profilePhoto} alt="Profile" />
          </div>
        </div>
        <div className="block-recommendation">
          <h2>Также вы можете выбрать категории и группы товаров, которые хотели бы видеть в рекомендациях</h2>
          <div className='block-button'>
            <Button 
             size="large"
             background="base" 
             color="basic"
             onClick={() => openModal(<Recommendations closeModal={closeModal}/>)}>
                Выбрать категории
            </Button>
          </div>
        </div>
       <AnimatePresence initial={false}>
        {modalState.isOpen && <Modal closeModal={closeModal} template={modalState.template} show={modalState.isOpen}/>}
       </AnimatePresence>
      </div>
    );
  };

  interface RecommendationsType {
    closeModal: () => void;
  }

  interface SelectedGroupsType {
    categoryId: string;
    groupIds: string[]
  }

  const Recommendations: FC<RecommendationsType> = ({ closeModal }) => {
    const { state } = useContext(ProductsContext);
    const { categories, groupProducts } = state;
    const [selectedGroups, setSelectedGroups] = useState<SelectedGroupsType[]>([]);


  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await RecommendationsService.fetchRecommendations();
        setSelectedGroups(response);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);
    
    const handleSelectedGroups = (categoryId: string, groupId: string) => {
      setSelectedGroups((prevSelectedGroups) => {
        const categoryIndex = prevSelectedGroups.findIndex((sGr) => sGr.categoryId === categoryId);
        if (categoryIndex === -1) {
          return [...prevSelectedGroups, { categoryId, groupIds: [groupId] }];
        }
        const category = prevSelectedGroups[categoryIndex];
        const isGroupSelected = category.groupIds.includes(groupId);
        const updatedGroupIds = isGroupSelected
          ? category.groupIds.filter((id) => id !== groupId)
          : [...category.groupIds, groupId];
        const updatedCategories = [...prevSelectedGroups];
        updatedCategories[categoryIndex] = { ...category, groupIds: updatedGroupIds };
        return updatedCategories;
      });
    };
  
    const handleSelectAllGroups = (categoryId: string) => {
      setSelectedGroups((prevSelectedGroups) => {
        const categoryGroups = groupProducts.filter((group) => group.categoryId === categoryId).map((group) => group.id);
        const categoryIndex = prevSelectedGroups.findIndex((sGr) => sGr.categoryId === categoryId);
        if (categoryIndex === -1) {
          return [...prevSelectedGroups, { categoryId, groupIds: categoryGroups }];
        }
        const category = prevSelectedGroups[categoryIndex];
        const isAllSelected = category.groupIds.length === categoryGroups.length;
        const updatedGroupIds = isAllSelected ? [] : categoryGroups;
        const updatedCategories = [...prevSelectedGroups];
        updatedCategories[categoryIndex] = { ...category, groupIds: updatedGroupIds };
        return updatedCategories;
      });
    };

    const handleSaveRecommendations = async () => {
      try {
        await Promise.all(
          selectedGroups.flatMap((category) =>
            category.groupIds.map((groupProductId) =>
              axiosInstance.post('/api/recommendation', {
                categoryId: category.categoryId,
                groupProductId,
              })
            )
          )
        );
        showToast('success', 'Recommendations saved successfully');
        closeModal();
      } catch (error) {
        console.error('Error saving recommendations:', error);
        showToast('error', 'Recommendations saved successfully');
      }
    };
  
    return (
      <div className="recommendations-selector">
        {categories.length > 0 &&
          categories.map((category) => (
            <RecommendationSelector
              key={category.id}
              category={category}
              groups={groupProducts.filter((group) => group.categoryId === category.id)}
              selectedGroups={selectedGroups}
              handleSelectedGroups={handleSelectedGroups}
              handleSelectAllGroups={handleSelectAllGroups}
            />
          ))}
        <div className='save-button-block'>
          <Button size="large" background="base" color="basic" onClick={handleSaveRecommendations}>
            Сохранить выбранные категории
          </Button>
        </div>
      </div>
    );
  };
  
  interface RecommendationSelectorType {
    category: CategoryType;
    groups: GroupProductType[];
    selectedGroups: SelectedGroupsType[];
    handleSelectedGroups: (categoryId: string, groupId: string) => void;
    handleSelectAllGroups: (categoryId: string) => void;
  }

  const animationStyles = {
    open: {
      opacity: 1,
      height: "auto"
  },
  close: {
      opacity: 0,
      height: 0
  },
  };
  
  const transition = {
    type: 'tween',
    ease: [0.45, 0, 0.55, 1],
    duration: 0.25,
  };
  
  
  const RecommendationSelector: FC<RecommendationSelectorType> = ({
    category,
    groups,
    selectedGroups,
    handleSelectedGroups,
    handleSelectAllGroups,
  }) => {
    const [isGroupsOpened, setIsGroupsOpened] = useState<boolean>(false);
  
    const selectedCategory = selectedGroups.some((sGr) => sGr.categoryId === category.id);
    const hasSelectedGroup = (groupId: string): boolean =>
      selectedGroups.find((sGr) => sGr.categoryId === category.id)?.groupIds.includes(groupId) || false;

    const handleGroupsOpened = () => {
      if (!groups.length) return;

      setIsGroupsOpened((prev) => !prev)
    }

    const effect = {
      initial: isGroupsOpened ? 'close' : 'open',
      animate: 'open',
      exit: 'close',
      variants: animationStyles,
      transition: transition,
    };
  
    return (
      <div className='recommendation-selector'>
        <div className='recommendation-selector-title' onClick={handleGroupsOpened}>
          <span style={{ fontSize: '25px' }}>{category.name}</span>
        </div>
           <AnimatePresence initial={false}>
            {isGroupsOpened && <motion.div {...effect} className='recommendation-groups'>
          <div>
            {groups.length > 0 && (
              <div>
                <Checkbox
                  size="small"
                  color="base"
                  checked={selectedCategory && groups.every((group) => hasSelectedGroup(group.id))}
                  onChange={() => handleSelectAllGroups(category.id)}
                  label="Выбрать все группы"
                />
              </div>
            )}
           <div>
           {groups.map((group) => (
              <div key={group.id}>
                <span>{group.name}</span>
                <Checkbox
                  size="small"
                  color="base"
                  checked={hasSelectedGroup(group.id)}
                  onChange={() => handleSelectedGroups(category.id, group.id)}
                />
              </div>
            ))}
           </div>
          </div>
          </motion.div>}
          </AnimatePresence>
      </div>
    );
  };