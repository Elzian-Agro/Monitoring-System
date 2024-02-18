import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../slice/userSlice';
import { useTranslation } from 'react-i18next';
import avatar from 'assets/images/avatar.png';
import coverImage from 'assets/images/cover.jpg';
import Modal from 'components/common/modal';
import useAxios from 'hooks/useAxios';
import UpdateProfileForm from './update-profile-form';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isDisableAlertVisible, setIsDisableAlertVisible] = useState(false);
  const [message, setMessage] = useState('');

  const { send } = useAxios();

  //Capitalize the text
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const email = useSelector((state) => state.user.email);
  const nic = useSelector((state) => state.user.nic);
  const phoneNumber = useSelector((state) => state.user.phoneNum);
  const userType = useSelector((state) => capitalize(state.user.userType));
  const organizationName = useSelector((state) => state.user.orgName);
  const userId = useSelector((state) => state.user._id);
  const userBio = useSelector((state) => state.user.userBio);
  const profileImage = useSelector((state) => state.user.profileImage);
  const address = useSelector((state) => state.user.address);
  const facebookLink = useSelector((state) => state.user.facebook);
  const linkedInLink = useSelector((state) => state.user.linkedIn);
  const youtubeLink = useSelector((state) => state.user.youtube);

  const user = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    bio: userBio,
    address: address,
    email: email,
  };

  const formSubmission = async (message) => {
    setMessage(message);
    setIsAlertVisible(true);
  };

  //Disable
  const confirmDialogCloseDisable = (result) => {
    if (result) {
      handleDisable();
    }
    setIsConfirmVisible(false);
  };

  const handleDisable = async () => {
    const response = await send({
      endpoint: `user/disable/${userId}`,
      method: 'POST',
      body: { isDisabled: true },
    });

    if (response) {
      setMessage(t('Disabled successfully'));
      setIsDisableAlertVisible(true);
      //Removed locally sotored user data
      localStorage.removeItem('jwtAccessToken');
      localStorage.removeItem('jwtRefreshToken');
      dispatch(clearUserData());
    }
  };

  const SocialLink = ({ link, icon }) => {
    return (
      link && (
        <a href={link} target='_blank' rel='noopener noreferrer'>
          {icon}
        </a>
      )
    );
  };

  return (
    <div className='mt-8 mx-4'>
      {isFormVisible ? (
        <UpdateProfileForm
          onClose={() => {
            setIsFormVisible(false);
          }}
          visible={isFormVisible}
          user={user}
          formSubmission={formSubmission}
        />
      ) : (
        <div className='bg-white dark:bg-gray-800 rounded shadow-md'>
          <div className='relative flex justify-center h-36 mb-4'>
            <img src={coverImage} alt='farmLand' className='w-full h-full object-cover rounded-md' />
            <div className='absolute bottom-[-20px]'>
              <img src={profileImage || avatar} alt='Profile' className='w-32 h-32 rounded-full object-cover' />
            </div>
          </div>

          <div className='mx-auto text-center mb-6 mt-6'>
            <div className='socialLinks absolute flex md:right-14 right-4'>
              <SocialLink
                link={facebookLink}
                icon=<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30' viewBox='0 0 48 48'>
                  <path
                    fill='#3F51B5'
                    d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z'></path>
                  <path
                    fill='#FFF'
                    d='M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z'></path>
                </svg>
              />
              <SocialLink
                link={linkedInLink}
                icon=<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30' viewBox='0 0 48 48'>
                  <path
                    fill='#0078d4'
                    d='M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z'></path>
                  <path
                    d='M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z'
                    opacity='.05'></path>
                  <path
                    d='M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z'
                    opacity='.07'></path>
                  <path
                    fill='#fff'
                    d='M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z'></path>
                </svg>
              />
              <SocialLink
                link={youtubeLink}
                icon=<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30' viewBox='0 0 48 48'>
                  <path
                    fill='#FF3D00'
                    d='M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z'></path>
                  <path fill='#FFF' d='M20 31L20 17 32 24z'></path>
                </svg>
              />
            </div>
            <p className='text-gray-800 dark:text-white text-2xl'>
              {firstName} {lastName}
            </p>
            <p className='text-gray-400 dark:text-gray-500'>{userType}</p>

            <p className='text-gray-800 dark:text-white mb-2'>{userBio}</p>
          </div>

          <div className='grid md:grid-cols-2 gap-4 mt-10 p-8'>
            <div className='1st-col ml-20'>
              <div className='grid grid-cols-2 md:grid-cols-3  mb-8'>
                <label className='block text-gray-600 dark:text-blue-400'>{t('Email')}:</label>
                <p className='text-gray-800 dark:text-white'>{email}</p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 mb-8'>
                <label className='block text-gray-600 dark:text-blue-400'>{t('Organization')}:</label>
                <p className='text-gray-800 dark:text-white'>{organizationName}</p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 mb-8'>
                <label className='block text-gray-600 dark:text-blue-400'>{t('NIC')}:</label>
                <p className='text-gray-800 dark:text-white'>{nic}</p>
              </div>
            </div>

            <div className='2nd-col ml-20'>
              <div className='grid grid-cols-2 md:grid-cols-3 mb-8'>
                <label className='block text-gray-600 dark:text-blue-400'>{t('Address')}:</label>
                <p className='text-gray-800 dark:text-white'>{address}</p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 mb-8'>
                <label className='block text-gray-600 dark:text-blue-400'>{t('Phone No')}:</label>
                <p className='text-gray-800 dark:text-white'>{phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-end pb-8 pr-8'>
            <button
              className='bg-green-500 text-black dark:text-white rounded px-4 py-2 mr-2'
              onClick={() => {
                setIsFormVisible(true);
              }}>
              {t('Update')}
            </button>

            <button
              className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'
              onClick={() => {
                setIsConfirmVisible(true);
              }}>
              {t('Disable')}
            </button>
          </div>
        </div>
      )}
      {/* confirm Popups */}
      {/* Disable confirmation */}
      <Modal
        isOpen={isConfirmVisible}
        message={t('Are you sure you want to disable this account?')}
        onClose={(result) => confirmDialogCloseDisable(result)}
        type='confirmation'
      />

      {/* Alert message Popup */}
      <Modal
        isOpen={isAlertVisible}
        message={`${message}!`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />

      {/* Disable Success message Popup */}
      <Modal
        isOpen={isDisableAlertVisible}
        message={`${message}!`}
        onClose={() => {
          setIsDisableAlertVisible(false);
          navigate('/');
        }}
        type='alert'
      />
    </div>
  );
};

export default UserProfilePage;
