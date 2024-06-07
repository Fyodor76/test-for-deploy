import React, { useContext, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { AuthContext, updateUser } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AuthService } from '../../api/AuthService';
import { Button } from '../../ui/Button/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '../../ui/Input/Input';
import profilePhoto from '../../assets/profile-photo.png'
import { baseURL } from '../../const/baseUrl';
import { LazyImage } from '../../components/lazyImage/LazyImage';
import axiosInstance from '../../axios.config';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { ProductsContext } from '../../context/ProductContext';
import { useModal } from '../../hooks/Modal/useModal';
import { Modal } from '../../components/Modal/Modal';
import { AnimatePresence } from 'framer-motion';

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
          <div>
            <Button 
             size="large"
             background="base" 
             color="basic"
             onClick={() => openModal(<RecommendationsSelector/>)}>
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

  
  const RecommendationsSelector: React.FC = () => {
    const { state } = useContext(ProductsContext);
    const { categories, groupProducts } = state;
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedGroupProducts, setSelectedGroupProducts] = useState<string[]>([]);

    console.log(state, 'state')
  
    const handleCategoryChange = (categoryId: string) => {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.includes(categoryId)
          ? prevSelectedCategories.filter((id) => id !== categoryId)
          : [...prevSelectedCategories, categoryId]
      );
    };
  
    const handleGroupProductChange = (groupProductId: string) => {
      setSelectedGroupProducts((prevSelectedGroupProducts) =>
        prevSelectedGroupProducts.includes(groupProductId)
          ? prevSelectedGroupProducts?.filter((id) => id !== groupProductId)
          : [...prevSelectedGroupProducts, groupProductId]
      );
    };
  
    const handleSaveRecommendations = async () => {
      try {
        await Promise.all(
          selectedGroupProducts?.map((groupProductId) =>
            axiosInstance.post('/api/recommendation', {
              categoryId: groupProducts.find((gp) => gp.id === groupProductId)?.categoryId,
              groupProductId,
            })
          )
        );
        alert('Recommendations saved successfully');
      } catch (error) {
        console.error('Error saving recommendations:', error);
      }
    };
  
    return (
      <div className="recommendations-selector">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="category">
              <div className="category-header">
                <Checkbox
                  label={category.name}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  size="medium"
                  color="primary"
                />
              </div>
              {groupProducts && groupProducts.length > 0 && 
                groupProducts.filter((groupProduct) => groupProduct.categoryId === category.id)
                  .map((groupProduct) => (
                    <div key={groupProduct.id} className="group-product">
                      <Checkbox
                        label={groupProduct.name}
                        checked={selectedGroupProducts.includes(groupProduct.id)}
                        onChange={() => handleGroupProductChange(groupProduct.id)}
                        size="small"
                        color="secondary"
                      />
                    </div>
                  ))
              }
            </div>
          ))
        ) : (
          <div>No categories available.</div>
        )}
        <button onClick={handleSaveRecommendations}>Save Recommendations</button>
      </div>
    );
  };